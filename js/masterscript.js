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

    const scrollMasterContainer = function(wrapper, offset, previous)
    {
        let valtop = offset + previous;
        wrapper.style["top"] = valtop + "px";
        return valtop;
    }

    const newScore = function(scr)
    {
        return scr+1;
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

    const updateLocalStorage = function(score, bonus, bossup, bossdown)
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

        //Total bonuses taken
        let tbt = parseInt(localStorage.getItem("totalbonusestaken"));
        tbt += bonus;
        localStorage.setItem("totalbonusestaken", tbt);

        //Total Boss Waves Survived
        let tbws = parseInt(localStorage.getItem("totalbonusestaken"));
        tbws += bossup + bossdown;
        localStorage.setItem("totalbonusestaken", tbws);

        //Total Falling Boss Waves Survived
        let tfbws = parseInt(localStorage.getItem("totalbonusestaken"));
        tfbws += bossdown;
        localStorage.setItem("totalbonusestaken", tfbws);

        //Total Rising Boos Waves Survived
        let trbws = parseInt(localStorage.getItem("totalbonusestaken"));
        trbws += bossdown;
        localStorage.setItem("totalbonusestaken", trbws);
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
                    block.textContent = "";
                }

                let block;
                let img;
                for (let i = 0; i < nb; i++) {
                    block = document.createElement("div");
                    block.classList.add("danger");
                    img = document.createElement("img");
                    let randd=Math.round(Math.random() * 1000 * 4)%4;
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

    //boucle de jeu
    const gamefunc = function()
    {
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
                score = newScore(score);
            }
            //Make master_container go down
            styletop = scrollMasterContainer(master_container, offsetDown, styletop);
            //Check if current position crosses a danger block
            isDead = checkDead(master_container);
        } else {
            blackScreen(1000);
            clearInterval(intervalID);
            updateLocalStorage(score, 0, 0, 0);
            //delete all Blocks
            master_container.parentNode.removeChild(master_container);
            document.getElementById("pages").style["display"] = "";
        }
    }
    intervalID = setInterval(gamefunc, 10);
}
