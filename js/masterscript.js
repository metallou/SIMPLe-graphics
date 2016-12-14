let line_blocks = [];
let path_blocks = [];
let master_container;
let score = 0;
let newScore = function()
{
    score++;
}
let isDead = false;
let nowDead = function()
{
    isDead = true;
}

let scrollMasterContainer = function(wrapper, offset)
{
    let valtop = 5 + offset;
    wrapper.style["top"] = valtop + "px";
    return valtop;
}

let createNewLineBlock = function(wrapper, scr)
{
    let lastLineBlocksIndex = line_blocks.length;

    let createContainer = function()
    {
        let contain = document.createElement("div");
        contain.classList.add("block-line");
        return contain;
    }
    let createLineV = function(contain, position)
    {
        let vert = document.createElement("div");
        vert.classList.add(position);
        contain.appendChild(vert);
    }
    let createLineH = function(contain, nb)
    {
        let createCentralContainer = function(conteneur)
        {
            let center = document.createElement("div");
            center.classList.add("centre");
            conteneur.appendChild(center);
            return center;
        }
        let createCentralLine = function(centre)
        {
            let line = document.createElement("div");
            line.classList.add("ligne");
            centre.appendChild(line);
            return line;
        }
        let createDangerBlocks = function(ligne, nb)
        {
            let randompass = function(ligne, nb)
            {
                let indCase = Math.round(Math.random() * 1000 * nb) % nb;
                let block = ligne.childNodes[indCase];
                block.classList.remove("danger");
                block.classList.add("passage");
                path_blocks.push(block);
            }

            let block;
            for (let i = 0; i < nb; i++) {
                block = document.createElement("div");
                block.classList.add("danger");
                ligne.appendChild(block);
            }

            randompass(ligne, nb);
        }

        let center = createCentralContainer(contain);
        let line = createCentralLine(center);
        createDangerBlocks(line, nb);
    }

    //Increase number of blocks in the line at each step
    let nbCases = 5 + scr;
    //Limitation to 100 cases
    if(nbCases > 100) {
        nbCases = 100;
    }

    //Create all the blocs
    let container = createContainer();
    createLineV(container, "gauche");
    createLineH(container, nbCases);
    createLineV(container, "droite");

    if(wrapper.childNodes.length>0) {
        wrapper.insertBefore(container, wrapper.firstChild);
    } else {
        wrapper.appendChild(container);
    }
    let line = wrapper.firstChild.childNodes[1].firstChild;
    line.style["height"] = line.firstChild.offsetWidth + "px";

    //Add all Event Listeners to children
    container.childNodes[0].addEventListener("mouseover", nowDead);
    container.childNodes[2].addEventListener("mouseover", nowDead);
    for(let i=0; i<container.childNodes[1].childNodes[0].childNodes.length; i++) {
        if(container.childNodes[1].childNodes[0].childNodes[i].classList.contains("passage")) {
            container.childNodes[1].childNodes[0].childNodes[i].addEventListener("mouseout", newScore);
        } else {
            container.childNodes[1].childNodes[0].childNodes[i].addEventListener("mouseover", nowDead);
        }
    }
}

let mastergamescript = function()
{
    let intervalID;
    let blockheight;
    let prevscore = 0;
    let styletop = 0;
    //Reset variables
    score = 0;
    isDead = false;
    master_container = document.createElement("div");
    master_container.id = "block-lines";
    document.getElementById("wrapper").appendChild(master_container);

    let updateLocalStorage = function(score, bonus, bossup, bossdown)
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

    //boucle de jeu
    let gamefunc = function()
    {
        if(!isDead) {
            //Make master_container go down
            styletop = scrollMasterContainer(master_container, styletop);
            //Add a new block-line to master_container (and reset top position) if possible
            if(styletop>=-10) {
                createNewLineBlock(master_container, score);
                blockheight = window.getComputedStyle(master_container.lastChild).getPropertyValue("height");
                blockheight = blockheight.substr(0,blockheight.length-2);
                blockheight = parseInt(blockheight);
                styletop -= blockheight;
            }
            //remove oldest block-line when out of screen
            if(master_container.offsetHeight > 2*600 + window.innerHeight) {
                master_container.removeChild(master_container.lastChild);
                line_blocks.shift();
            }

            //to prevent player from hacking the game by getting through over and over to falsely increase score
            if(prevscore != score) {
                path_blocks[0].removeEventListener("mouseout", newScore);
                path_blocks.shift();
                prevscore = score;
            }
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
