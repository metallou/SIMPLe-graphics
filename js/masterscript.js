"use strict"

const mastergamescript = function()
{
    const extractStyle = function(elem, property) {
        const style = window.getComputedStyle(elem);
        let styletop = style.getPropertyValue(property);
        styletop = styletop.substr(0, styletop.length-2);
        const st = parseInt(styletop);
        return st;
    }
    const checkScore = function(wrapper, scr)
    {
        const updateScoreBlock = function(wrapper, score_blocks)
        {
            let styletop = wrapper.style["top"];
            styletop = styletop.substr(0,styletop.length-2);
            const st = parseInt(styletop);
            const hV = wrapper.firstChild.firstChild.offsetHeight;

            let elems = document.getElementsByClassName("score");
            return st + hV*(elems.length-1);
        }

        const score_blocks = document.getElementsByClassName("score");
        const score_block = updateScoreBlock(wrapper, score_blocks);
        if(mouseY < score_block) {
            score_blocks[score_blocks.length-1].classList.remove("score");
            scr += 1;
        }
        return scr;
    }

    const checkDead = function(wrapper) {
        const updateDangerBlocks = function(wrapper)
        {
            const d_b = [];
            let styletop = wrapper.style["top"];
            styletop = styletop.substr(0,styletop.length-2);
            const st = parseInt(styletop);
            const hV = wrapper.firstChild.offsetHeight;
            const wH = wrapper.firstChild.firstChild.firstChild.offsetWidth;
            const hH = wrapper.firstChild.firstChild.firstChild.offsetHeight;

            let wb;
            let elem;
            for(let i=0; i<wrapper.childNodes.length; i++) {
                elem = wrapper.childNodes[i].firstChild.firstChild;
                wb = elem.firstChild.offsetWidth;
                for(let j=0; j<elem.childNodes.length; j++) {
                    if(elem.childNodes[j].classList.contains("danger")) {
                        d_b.push(
                                {
                                    X1: (j*wb),
                                    X2: (j*wb) + wb,
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
        let tgp;
        let ts;
        let hs;
        let as;

        //Total Games Played
        tgp = parseInt(localStorage.getItem("totalgamesplayed"));
        tgp++;
        localStorage.setItem("totalgamesplayed", tgp);
        //Total Score
        ts = parseInt(localStorage.getItem("totalscore"));
        ts += score;
        localStorage.setItem("totalscore", ts);
        //Highest Score
        hs = parseInt(localStorage.getItem("highestscore"));
        if(hs < score) {
            localStorage.setItem("highestscore", score);
        }
        //Average Score
        as = Math.floor((ts/tgp)*1000)/1000;
        localStorage.setItem("averagescore", as);
        //Last Score
        localStorage.setItem("lastscore", score);
        if(bossup>0 || bossdown>0) {
            //Total Boss Waves
            tgp = parseInt(localStorage.getItem("totalbosswaves"));
            tgp += bossup + bossdown;
            localStorage.setItem("totalbosswaves", tgp);
            //Total Boss Total Score
            ts = parseInt(localStorage.getItem("totalbosstotalscore"));
            ts += score;
            localStorage.setItem("totalbosstotalscore", ts);
            //Total Boss Highest Score
            hs = parseInt(localStorage.getItem("totalbosshighestscore"));
            if(hs < score) {
                localStorage.setItem("totalbosshighestscore", score);
            }
            //Total Boss Average Score
            as = Math.floor((ts/tgp)*1000)/1000;
            localStorage.setItem("totalbossaveragescore", as);
            //Total Boss Last Score
            localStorage.setItem("totalbosslastscore", score);
        }
        if(bossup>0) {
            //Total Rising Boss Waves
            tgp = parseInt(localStorage.getItem("totalrisingbosswaves"));
            tgp += bossup;
            localStorage.setItem("totalrisingbosswaves", tgp);
            //Rising Boss Total Score
            ts = parseInt(localStorage.getItem("risingbosstotalscore"));
            ts += score;
            localStorage.setItem("risingbosstotalscore", ts);
            //Rising Boss Highest Score
            hs = parseInt(localStorage.getItem("risingbosshighestscore"));
            if(hs < score) {
                localStorage.setItem("risingbosshighestscore", score);
            }
            //Rising Boss Average Score
            as = Math.floor((ts/tgp)*1000)/1000;
            localStorage.setItem("risingbossaveragescore", as);
            //Rising Boss Last Score
            localStorage.setItem("risingbosslastscore", score);
        }
        if(bossdown>0) {
            //Total Falling Boos Waves
            tgp = parseInt(localStorage.getItem("totalfallingbosswaves"));
            tgp += bossdown;
            localStorage.setItem("totalfallingbosswaves", tgp);
            //Falling Boss Total Score
            ts = parseInt(localStorage.getItem("fallingbosstotalscore"));
            ts += score;
            localStorage.setItem("fallingbosstotalscore", ts);
            //Falling Boss Highest Score
            hs = parseInt(localStorage.getItem("fallingbosshighestscore"));
            if(hs < score) {
                localStorage.setItem("fallingbosshighestscore", score);
            }
            //Falling Boss Average Score
            as = Math.floor((ts/tgp)*1000)/1000;
            localStorage.setItem("fallingbossaveragescore", as);
            //Falling Boss Last Score
            localStorage.setItem("fallingbosslastscore", score);
        }
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
                    const randd=Math.round(Math.random() * 1000 * 4)%4;
                    const randrot=Math.round(Math.random() * 1000 * 6)%6;
                    switch(randd){
                        case 0:
                            img.src = "img/asteroids/ast_blue.png";
                            break;
                        case 1:
                            img.src = "img/asteroids/ast_grey.png";
                            break;
                        case 2:
                            img.src = "img/asteroids/ast_darkgrey.png";
                            break;
                        case 3:
                            img.src = "img/asteroids/ast_simplon.png";
                            break;
                    }
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
        createLineH(container, nbCases);

        if(wrapper.childNodes.length>0) {
            wrapper.insertBefore(container, wrapper.firstChild);
        } else {
            wrapper.appendChild(container);
        }
        const line = wrapper.firstChild.firstChild.firstChild;
        line.style["height"] = line.firstChild.offsetWidth + "px";
    }

    const checkBossUp = function(b, iD)
    {
        const st = extractStyle(b, "top");
        if(mouseY >= st) {
            return true;
        }
        return false;
    }
    const checkBossDown = function(b, iD)
    {
        const stm = extractStyle(b, "top");
        const h = b.offsetHeight;
        const elem = document.getElementById("flames");
        const stf = extractStyle(elem, "top");
        const w = elem.firstChild.offsetWidth;
        let st;
        for(let i=0; i<elem.childNodes.length; i++) {
            st = extractStyle(elem.childNodes[i], "top");
            if(i*w <= mouseX && mouseX < (i+1)*w) {
                if(mouseY <= stm+stf+st+h) {
                    return true;
                }
            }
        }
        return false;
    }

    const animateBossDown = function(b, scr) {
        const rndevent = Math.random();
        if(rndevent >= 0.90) {
            const elem = document.getElementById("flames");
            const rnd = Math.floor(Math.random()*1000*20)%20;
            if(!elem.childNodes[rnd].classList.contains("falling")) {
                elem.childNodes[rnd].classList.add("falling");
                setTimeout(function()
                        {
                            elem.childNodes[rnd].classList.remove("falling");
                        }, 5000);
                scr = scr+0.2;
            }
        }
        return scr;
    }

    const bossUpFunc = function()
    {
        const b = document.createElement("div");
        b.id = "bossup";
        return b;
    }
    const bossDownFunc = function()
    {
        const b = document.createElement("div");
        b.id = "bossdown";
        let container;
        let elem;
        let elem2;
        container = document.createElement("div");
        container.id = "flames";
        b.appendChild(container);
        for(let i=0; i<20; i++) {
            elem = document.createElement("div");
            elem.style["width"] = (100/20) + "%";
            elem.style["left"] = i*(100/20) + "%";
            elem.classList.add("flame");
            container.appendChild(elem);
        }
        container = document.createElement("div");
        container.id = "reactors";
        b.appendChild(container);
        for(let i=0; i<20; i++) {
            elem = document.createElement("div");
            elem.classList.add("reactor");
            container.appendChild(elem);
        }
        container = document.createElement("div");
        container.id = "flyingsaucer";
        b.appendChild(container);
        return b;
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
                    blockheight = extractStyle(master_container.lastChild, "height");
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
                //Display score
                scoreboard2.textContent = score
            } else {
                blackScreen(1000);
                clearInterval(intervalID);
                updateLocalStorage(score, 0, 0);
                //delete all Blocks
                master_container.parentNode.removeChild(master_container);
                scoreboard.parentNode.removeChild(scoreboard);
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
                        blockheight = extractStyle(master_container.lastChild, "height");
                        styletop -= blockheight;
                    }
                    //remove oldest block-line when out of screen
                    if(master_container.offsetHeight > 2*blockheight + window.innerHeight) {
                        master_container.removeChild(master_container.childNodes[master_container.childNodes.length-2]);
                    }
                    //Make master_container go down
                    styletop = scrollMasterContainer(master_container, offsetDown, styletop);
                    //Check if current position crosses a danger block or the boss
                    isDead = checkDead(master_container) && checkBossUp(boss);
                    //Check for score update
                    score = checkScore(master_container, score);
                    //Display score
                    scoreboard2.textContent = 2*score + scoreBossUp;
                } else {
                    blackScreen(1000);
                    clearInterval(intervalID);
                    updateLocalStorage(2*score + scoreBossUp, 1, 0);
                    //delete all Blocks
                    master_container.parentNode.removeChild(master_container);
                    boss.parentNode.removeChild(boss);
                    scoreboard.parentNode.removeChild(scoreboard);
                    document.getElementById("pages").style["display"] = "";
                }
            } else {
                if(!isDead) {
                    //Update score, launches an attack at random
                    score = animateBossDown(boss, score);
                    //Check if current position crosses the boss
                    isDead = checkBossDown(boss);
                    //Display score
                    scoreboard2.textContent = Math.floor(score + scoreBossDown);
                } else {
                    blackScreen(1000);
                    clearInterval(intervalID);
                    updateLocalStorage(Math.floor(score + scoreBossDown), 0, 1);
                    //delete all Blocks
                    master_container.parentNode.removeChild(master_container);
                    boss.parentNode.removeChild(boss);
                    scoreboard.parentNode.removeChild(scoreboard);
                    document.getElementById("pages").style["display"] = "";
                }
            }
        }
    }

    let danger_blocks;
    let intervalID;
    let blockheight;
    let score = 0;
    let styletop = 0;
    let isDead = false;

    const levelChoice = (Math.floor(Math.random()*1000*100)%100);
    let isBoss = levelChoice >= 80;
    if(localStorage.getItem("bossgameonly") === "true") {
        isBoss = true;
    }
    if(localStorage.getItem("normalgameonly") === "true") {
        isBoss = false;
    }
    let isBossUp = isBoss && (levelChoice%2 == 0);
    if(localStorage.getItem("risingbossonly") === "true") {
        isBossUp = true;
    }
    if(localStorage.getItem("fallingbossonly") === "true") {
        isBossUp = false;
    }
    const scoreBossUp = 20;
    const scoreBossDown = 20;

    const scoreboard = document.createElement("div");
    scoreboard.id = "scoreboard";
    let scoreboard2 = document.createElement("span");
    scoreboard2.textContent = "SCORE";
    scoreboard.appendChild(scoreboard2);
    scoreboard2 = document.createElement("span");
    scoreboard.appendChild(scoreboard2);
    const master_container = document.createElement("div");
    master_container.id = "block-lines";
    master_container.style["top"] = styletop + "px";

    let boss;
    if(isBoss) {
        if(isBossUp) {
            boss = bossUpFunc();
            scoreboard2.textContent = score + scoreBossUp;
        } else {
            boss = bossDownFunc();
            scoreboard2.textContent = score + scoreBossDown
        }
        document.getElementById("wrapper").appendChild(boss);
    } else {
        scoreboard2.textContent = score;
    }
    document.getElementById("wrapper").appendChild(master_container);
    document.getElementById("wrapper").appendChild(scoreboard);

    intervalID = setInterval(gamefunc, 10);
}
