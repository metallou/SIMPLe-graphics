"use strict"

const mastergamescript = function()
{
    let danger_blocks;
    let intervalID;
    let blockheight;
    let score = 0;
    let styletop = 0;
    let isDead = false;
    const master_container = document.createElement("div");
    master_container.id = "block-lines";
    master_container.style["top"] = styletop + "px";
    document.getElementById("wrapper").appendChild(master_container);
    const levelChoice = (Math.floor(Math.random()*1000*100)%100);
    const isBoss = true;//levelChoice >= 80;
    const isBossUp = true;//isBoss && (levelChoice%2 == 0);
    const scoreBossUp = 10;
    const scoreBossDown = 20;

    const checkScore = function(wrapper, scr)
    {
        const updateScoreBlock = function(wrapper, score_blocks)
        {

            const st = parseInt(wrapper.style["top"].substr(0,wrapper.style["top"].length-2));
            const hV = wrapper.firstChild.firstChild.offsetHeight;

            let elems = document.getElementsByClassName("score");
            return st + hV*(elems.length-1);
        }

        const score_blocks = document.getElementsByClassName("score");
        const score_block = updateScoreBlock(wrapper, score_blocks);
        if(mouseY < score_block) {
            score_blocks[score_blocks.length-1].classList.remove("score");
            return scr+1;
        }
        return scr;
    }

    const checkDead = function(wrapper) {
        const updateDangerBlocks = function(wrapper)
        {
            const d_b = [];
            const st = parseInt(wrapper.style["top"].substr(0,wrapper.style["top"].length-2));
            const wV = wrapper.firstChild.firstChild.offsetWidth;
            const hV = wrapper.firstChild.firstChild.offsetHeight;
            const wH = wrapper.firstChild.childNodes[1].firstChild.offsetWidth;
            const hH = wrapper.firstChild.childNodes[1].firstChild.offsetHeight;

            let wb;
            let elem;
            for(let i=0; i<wrapper.childNodes.length; i++) {
                d_b.push(
                        {
                            X1: 0,
                            X2: wV,
                            Y1: st + (i*hV),
                            Y2: st + (i*hV) + hV
                        });
                d_b.push(
                        {
                            X1: wV + wH,
                            X2: wV + wH + wV,
                            Y1: st + (i*hV),
                            Y2: st + (i*hV) + hV
                        });
                elem = wrapper.childNodes[i].childNodes[1].firstChild;
                wb = elem.firstChild.offsetWidth;
                for(let j=0; j<elem.childNodes.length; j++) {
                    if(elem.childNodes[j].classList.contains("danger")) {
                        d_b.push(
                                {
                                    X1: wV + (j*wb),
                                    X2: wV + (j*wb) + wb,
                                    Y1: st + (i*hV),
                                    Y2: st + (i*hV) + wb
                                });
                    }
                }
            }
            return d_b;
        }

        const danger_blocks = updateDangerBlocks(wrapper);
        for(let i=0; i<danger_blocks.length; i++) {
            if(danger_blocks[i].X1 < mouseX && mouseX <= danger_blocks[i].X2) {
                if(danger_blocks[i].Y1 < mouseY && mouseY <= danger_blocks[i].Y2) {
                    return true;
                }
            }
        }
        return false;
    }

    const updateLocalStorage = function(score, bossup, bossdown)
    {
        //Total Games Played
        let tgp = parseInt(localStorage.getItem("totalgamesplayed"));
        tgp++;
        localStorage.setItem("totalgamesplayed", tgp);

        //Total Score
        let ts = parseInt(localStorage.getItem("totalscore"));
        ts += score;
        localStorage.setItem("totalscore", ts);

        //Highest Score
        let hs = parseInt(localStorage.getItem("highestscore"));
        if(hs < score) {
            localStorage.setItem("highestscore", score);
        }

        //Average Score
        let as = Math.floor((ts/tgp)*1000)/1000;
        localStorage.setItem("averagescore", as);

        //Last Score
        localStorage.setItem("lastscore", score);

        //Total Boss Waves
        let tbw = parseInt(localStorage.getItem("totalbosswaves"));
        tbw += bossup + bossdown;
        localStorage.setItem("totalbosswaves", tbw);

        //Total Rising Boss Waves
        let trbw = parseInt(localStorage.getItem("totalrisingbosswaves"));
        trbw += bossup;
        localStorage.setItem("totalrisingbosswaves", trbw);

        //Total Falling Boos Waves
        let tfbw = parseInt(localStorage.getItem("totalfallingbosswaves"));
        tfbw += bossdown;
        localStorage.setItem("totalfallingbosswaves", tfbw);
    }

    const scrollMasterContainer = function(wrapper, offset, previous)
    {
        let valtop = offset + previous;
        wrapper.style["top"] = valtop + "px";
        return valtop;
    }

    const createNewLineBlock = function(wrapper, scr)
    {
        const createContainer = function()
        {
            const contain = document.createElement("div");
            contain.classList.add("block-line");
            return contain;
        }
        const createLineV = function(contain, position)
        {
            const vert = document.createElement("div");
            vert.classList.add(position);
            contain.appendChild(vert);
        }
        const createLineH = function(contain, nb)
        {
            const createCentralContainer = function(conteneur)
            {
                const center = document.createElement("div");
                center.classList.add("centre");
                conteneur.appendChild(center);
                return center;
            }
            const createCentralLine = function(centre)
            {
                const line = document.createElement("div");
                line.classList.add("ligne");
                centre.appendChild(line);
                return line;
            }
            const createDangerBlocks = function(ligne, nb)
            {
                const randompass = function(ligne, nb)
                {
                    const indCase = Math.round(Math.random() * 1000 * nb) % nb;
                    const block = ligne.childNodes[indCase];
                    block.classList.remove("danger");
                    block.classList.add("passage");
                    block.classList.add("score");
                    block.textContent = "";
                }

                let block;
                let img;
                for (let i = 0; i < nb; i++) {
                    block = document.createElement("div");
                    block.classList.add("danger");
                    img = document.createElement("img");
                    let randd=Math.round(Math.random() * 1000 * 4)%4;
                    let randrot=Math.round(Math.random() * 1000 * 6)%6;
                    switch(randd){
                      case 0:
                        img.src = "img/asteroids/ast_blue.png";
                        switch(randrot){
                          case 0:
                            img.classList.add("rotating1");
                            break;
                          case 1:
                            img.classList.add("rotating2");

                            break;
                          case 2:
                            img.classList.add("rotating3");

                            break;
                          case 3:
                            img.classList.add("rotating4");

                            break;
                          case 4:
                            img.classList.add("rotating5");

                            break;
                          case 5:
                            img.classList.add("rotating6");
                            break;
                        }
                        break;

                      case 1:
                          img.src = "img/asteroids/ast_grey.png";
                          switch(randrot){
                            case 0:
                              img.classList.add("rotating1");
                              break;
                            case 1:
                              img.classList.add("rotating2");
                              break;
                            case 2:
                              img.classList.add("rotating3");
                              break;
                            case 3:
                              img.classList.add("rotating4");
                              break;
                            case 4:
                              img.classList.add("rotating6");
                              break;
                            case 5:
                              img.classList.add("rotating7");
                              break;
                            default:
                              break;
                          }
                          break;

                      case 2:
                          img.src = "img/asteroids/ast_darkgrey.png";
                          switch(randrot){
                            case 0:
                              img.classList.add("rotating1");
                              break;
                            case 1:
                              img.classList.add("rotating2");
                              break;
                            case 2:
                              img.classList.add("rotating3");
                              break;
                            case 3:
                              img.classList.add("rotating4");
                              break;
                            case 4:
                              img.classList.add("rotating6");
                              break;
                            case 5:
                              img.classList.add("rotating7");
                              break;
                            default:
                              break;
                          }
                          break;
                      case 3:
                          img.src = "img/asteroids/ast_simplon.png";
                          switch(randrot){
                            case 0:
                              img.classList.add("rotating1");
                              break;
                            case 1:
                              img.classList.add("rotating2");
                              break;
                            case 2:
                              img.classList.add("rotating3");
                              break;
                            case 3:
                              img.classList.add("rotating4");
                              break;
                            case 4:
                              img.classList.add("rotating6");
                              break;
                            case 5:
                              img.classList.add("rotating7");
                              break;
                            default:
                              break;
                          }
                            break;
                          }
                    img.alt = "asteroid";
                    block.appendChild(img);
                    ligne.appendChild(block);
                }
                randompass(ligne, nb);
            }

            const center = createCentralContainer(contain);
            const line = createCentralLine(center);
            createDangerBlocks(line, nb);
        }

        //Increase number of blocks in the line at each step
        let nbCases = 5 + scr;
        //Limitation to 100 cases
        if(nbCases > 100) {
            nbCases = 100;
        }

        //Create all the blocs
        const container = createContainer();
        createLineV(container, "gauche");
        createLineH(container, nbCases);
        createLineV(container, "droite");

        if(wrapper.childNodes.length>0) {
            wrapper.insertBefore(container, wrapper.firstChild);
        } else {
            wrapper.appendChild(container);
        }
        const line = wrapper.firstChild.childNodes[1].firstChild;
        line.style["height"] = line.firstChild.offsetWidth + "px";
    }

    const checkBossUp = function(b, iD)
    {
        if(!iD) {
            const style = window.getComputedStyle(b).getPropertyValue("top");
            if(mouseY >= parseInt(style.substr(0,style.length-2))) {
                return true;
            }
            return false;
        }
        return iD;
    }
    const checkBossDown = function(b, iD)
    {
        if(!iD) {
            const w = b.firstChild.offsetWidth;
            const h = b.firstChild.offsetHeight;
            let style = window.getComputedStyle(b).getPropertyValue("top");
            const stm = parseInt(style.substr(0,style.length-2));
            if(mouseY <=  stm+b.offsetHeight) {
                return true;
            }
            let st;
            for(let i=0; i<b.childNodes.length; i++) {
                style = window.getComputedStyle(b.childNodes[i].firstChild).getPropertyValue("top");
                st = parseInt(style.substr(0,style.length-2));
                console.log(st);
                if((i*w) <= mouseX && mouseX < (i*w)+w) {
                    if(mouseY <= stm+st+h) {
                        console.log("a");
                        return true;
                    }
                }
            }
            return false;
        }
        return iD;
    }

    const animateBossDown = function(b, scr) {
        const rnd = Math.floor(Math.random()*1000*20)%20;
        const rndevent = Math.random();
        if(rndevent >= 0.90) {
            const rnd = Math.floor(Math.random()*1000*20)%20;
            if(!b.childNodes[rnd].firstChild.classList.contains("falling")) {
                b.childNodes[rnd].firstChild.classList.add("falling");
                setTimeout(function()
                        {
                            b.childNodes[rnd].firstChild.classList.remove("falling");
                        }, 5000);
                    scr = scr+0.1;
            }
        }
        return scr;
    }

    const bossUpFunc = function()
    {
        const b = document.createElement("div");
        b.id = "bossup";
        document.getElementById("wrapper").appendChild(b);
        return b;
    }
    const bossDownFunc = function()
    {
        const b = document.createElement("div");
        b.id = "bossdown";
        let elem;
        let elem2;
        for(let i=0; i<20; i++) {
            elem = document.createElement("div");
            elem2 = document.createElement("div");
            elem2.classList.add("falling-block");
            elem.appendChild(elem2);
            b.appendChild(elem);
        }
        document.getElementById("wrapper").appendChild(b);
        return b;
    }

    let boss;
    if(isBoss) {
        if(isBossUp) {
            boss = bossUpFunc();
        } else {
            boss = bossDownFunc();
        }
    }
    //boucle de jeu -----------------------------------------------------------
    const gamefunc = function()
    {
        if(!isBoss) {
            styletop = document.getElementById("block-lines").style["top"];
            styletop = styletop.substr(0,styletop.length-2);
            styletop = parseInt(styletop);
            if(!isDead) {
                //Add a new block-line to master_container (and reset top position) if possible
                if(styletop>=-10) {
                    createNewLineBlock(master_container, score);
                    blockheight = window.getComputedStyle(master_container.lastChild).getPropertyValue("height");
                    blockheight = blockheight.substr(0,blockheight.length-2);
                    blockheight = parseInt(blockheight);
                    styletop -= blockheight;
                }
                //remove oldest block-line when out of screen
                if(master_container.offsetHeight > 2*blockheight + window.innerHeight) {
                    master_container.removeChild(master_container.lastChild);
                }
                //Make master_container go down
                styletop = scrollMasterContainer(master_container, offsetDown, styletop);
                //Check if current position crosses a danger block
                isDead = checkDead(master_container);
                //Check for score update
                score = checkScore(master_container, score);
            } else {
                blackScreen(1000);
                clearInterval(intervalID);
                updateLocalStorage(score, 0, 0);
                //delete all Blocks
                master_container.parentNode.removeChild(master_container);
                document.getElementById("pages").style["display"] = "";
            }
        } else {
            if(isBossUp) {
                styletop = document.getElementById("block-lines").style["top"];
                styletop = styletop.substr(0,styletop.length-2);
                styletop = parseInt(styletop);
                if(!isDead) {
                    //Add a new block-line to master_container (and reset top position) if possible
                    if(styletop>=-10) {
                        createNewLineBlock(master_container, score);
                        blockheight = window.getComputedStyle(master_container.lastChild).getPropertyValue("height");
                        blockheight = blockheight.substr(0,blockheight.length-2);
                        blockheight = parseInt(blockheight);
                        styletop -= blockheight;
                    }
                    //remove oldest block-line when out of screen
                    if(master_container.offsetHeight > 2*blockheight + window.innerHeight) {
                        master_container.removeChild(master_container.childNodes[master_container.childNodes.length-2]);
                    }
                    //Make master_container go down
                    styletop = scrollMasterContainer(master_container, offsetDown, styletop);
                    //Check if current position crosses a danger block
                    isDead = checkDead(master_container);
                    //Check if current position crosses the boss
                    isDead = checkBossUp(boss, isDead);
                    //Check for score update
                    score = checkScore(master_container, score);
                } else {
                    blackScreen(1000);
                    clearInterval(intervalID);
                    updateLocalStorage(score+scoreBossUp, 1, 0);
                    //delete all Blocks
                    master_container.parentNode.removeChild(master_container);
                    boss.parentNode.removeChild(boss);
                    document.getElementById("pages").style["display"] = "";
                }
            } else {
                if(!isDead) {
                    //Update score, launches an attack at random
                    score = animateBossDown(boss, score)
                    //Check if current position crosses the boss
                    isDead = checkBossDown(boss, isDead);
                } else {
                    blackScreen(1000);
                    clearInterval(intervalID);
                    updateLocalStorage(Math.floor(score)+scoreBossDown, 0, 1);
                    //delete all Blocks
                    master_container.parentNode.removeChild(master_container);
                    boss.parentNode.removeChild(boss);
                    document.getElementById("pages").style["display"] = "";
                }
            }
        }
    }
    intervalID = setInterval(gamefunc, 10);
}
