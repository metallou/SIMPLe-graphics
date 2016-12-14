"use strict"

let isDead = false;
const nowDead = function(event)
{
    isDead = true;
    document.getElementById("pages").style["display"] = "";
}

const mastergamescript = function()
{
    let danger_blocks;
    let intervalID;
    let blockheight;
    let score = 0;
    let styletop = 0;
    //Reset variables
    isDead = false;
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

    const updateDangerBlocks = function(wrapper, d_b)
    {
        d_b = [];
        const st = parseInt(wrapper.style["top"].substr(0,wrapper.style["top"].length-2));
        let elem = wrapper.firstChild;
        const wV = elem.firstChild.offsetWidth;
        const hV = elem.firstChild.offsetHeight;
        const wH = elem.childNodes[1].firstChild.offsetWidth;
        const hH = elem.childNodes[1].firstChild.offsetHeight;
        const wb = elem.childNodes[1].firstChild.firstChild.offsetWidth;
        for(let i=0; i<wrapper.childNodes.length; i++) {
            elem = wrapper.childNodes[i].firstChild;
            d_b.push(
                    {
                        X1: 0,
                        X2: wV,
                        Y1: st+ (i*hV),
                        Y2: st + (i*hV) + hV
                    });
            elem = wrapper.childNodes[i].lastChild;
            d_b.push(
                    {
                        X1: wV + wH,
                        X2: wV + wH + wV,
                        Y1: st+ (i*hV),
                        Y2: st + (i*hV) + hV
                    });
            elem = wrapper.childNodes[i].childNodes[1].firstChild;
            for(let j=0; j<elem.childNodes.length; j++) {
                if(!elem.childNodes[i].classList.contains("passage")) {
                    d_b.push(
                            {
                                X1: wV + (j*wb),
                                X2: wV + (j*wb) + wb,
                                Y1: st+ (i*hV),
                                Y2: st + (i*hV) + wb
                            });
                }
            }
        }
        return d_b;
    }
    const checkDead = function(d_b) {
        console.log(d_b.length);
        for(let i=0; i<d_b.length; i++) {
            if(d_b[i].X1 <= mouseX && d_b.X2 >= mouseX) {
                if(d_b[i].Y1 <= mouseY && d_b.Y2 >= mouseY) {
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
                    img.src = "img/tintin_spaceship.gif";
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

        //Add all Event Listeners to children
        container.childNodes[0].addEventListener("mouseover", nowDead);
        container.childNodes[2].addEventListener("mouseover", nowDead);
        let blocks = container.childNodes[1].childNodes[0].childNodes;
        for(let i=0; i<blocks.length; i++) {
            if(!blocks[i].classList.contains("passage")) {
                blocks[i].addEventListener("mouseover", nowDead);
            }
        }
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
            }
            //Make master_container go down
            styletop = scrollMasterContainer(master_container, offsetDown, styletop);
            danger_blocks = updateDangerBlocks(master_container, danger_blocks);
            isDead = checkDead(danger_blocks);
        } else {
            blackScreen(1000);
            clearInterval(intervalID);
            updateLocalStorage(score, 0, 0, 0);
            //delete all Blocks
            master_container.parentNode.removeChild(master_container);
        }
    }
    intervalID = setInterval(gamefunc, 10);
}
