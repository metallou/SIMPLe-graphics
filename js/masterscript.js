let line_blocks = [];
let path_blocks = [];
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

let backgroundColor = function()
{
    document.getElementsByTagName("body")[0].style["background-color"] = "#FF0000";
    setTimeout(function()
            {
                document.getElementsByTagName("body")[0].style["background-color"] = "";
            }
            ,1000);
}

let createNewLineBlocks = function()
{
    let lastLineBlocksIndex = line_blocks.length;

    let createContainer = function()
    {
        let contain = document.createElement("div");
        contain.classList.add("block-line");
        document.body.appendChild(contain); //a modifier lors du merge
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
        let randompass = function(nb)
        {
            let indCase = Math.round(Math.random() * 1000 * nb) % nb;
            let block = line_blocks[lastLineBlocksIndex].childNodes[1].childNodes[0].childNodes[indCase];
            block.classList.add("passage");
            path_blocks.push(block);
        }

        let center = document.createElement("div");
        center.classList.add("centre");
        contain.appendChild(center);
        let line = document.createElement("div");
        line.classList.add("ligne");
        center.appendChild(line);
        for (let i = 0; i < nb; i++) {
            let ncase = document.createElement("div");
            line_blocks[lastLineBlocksIndex].childNodes[1].childNodes[0].appendChild(ncase);
            ncase.classList.add("bloc");
        }
        let hauteur = line.offsetWidth / nb;
        line_blocks[lastLineBlocksIndex].childNodes[1].childNodes[0].style["height"] = hauteur + "px";

        randompass(nb);
    }

    //Increase number of blocks in the line at each step
    let nbCases = 5 + score;
    //Limitation to 100 cases
    if(nbCases > 100) {
        nbCases = 100;
    }

    //Create all the blocs
    let container = createContainer();
    line_blocks.push(container);
    createLineV(container, "gauche");
    createLineH(container, nbCases);
    createLineV(container, "droite");

    //Add all Event Listeners to children
    container.childNodes[0].addEventListener("mouseover", nowDead);
    container.childNodes[2].addEventListener("mouseover", nowDead);
    for(let i=0; i<container.childNodes[1].childNodes[0].childNodes.length; i++) {
        if(container.childNodes[1].childNodes[0].childNodes[i].classList.contains("passage")) {
            container.childNodes[1].childNodes[0].childNodes[i].addEventListener("mouseover", newScore);
        } else {
            container.childNodes[1].childNodes[0].childNodes[i].addEventListener("mouseover", nowDead);
        }
    }
}

let mastergamescript = function()
{
    let intervalID1;
    let intervalID2;
    //Reset variables
    let prevscore = 0;
    score = 0;
    isDead = false;

    //boucle de jeu
    let gamefunc = function()
    {
        if(!isDead) {
            //to prevent player from hacking the game by getting through over and over to falsely increase score
            if(prevscore != score) {
                path_blocks[0].removeEventListener("mouseout", newScore);
                path_blocks.shift();
                prevscore = score;
            }
        } else {
            blackScreen(1000);
            clearInterval(intervalID1);
            clearInterval(intervalID2);
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
            let as = ts/tgp;
            localStorage.setItem("averagescore", as);
            //detele all Blocks
            for(let i=0; i<line_blocks.length; i++) {
                line_blocks[i].parentNode.removeChild(line_blocks[i]);
            }
        }
    }

    let time = (window.innerHeight + 2*600)/(3*600);
    intervalID1 = setInterval(gamefunc, 10);
    intervalID2 = setInterval(createNewLineBlocks, 1000*time);
}

let funcready = function()
{
    //Test blocks (to be removed)
    let tmp = document.getElementById("follow");
    tmp.addEventListener("mouseout", newScore);
    let tmp2 = document.getElementById("death");
    tmp2.addEventListener("mouseover", nowDead);
    path_blocks.push(tmp);
}
document.addEventListener("DOMContentLoaded", funcready);
