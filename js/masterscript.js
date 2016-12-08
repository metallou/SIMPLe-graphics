let funcready = function() {
let falling_blocks = [];
let path_blocks = [];
let danger_blocks = [];
let score = 0;
let newScore = function() {
    score++;
}
let isDead = false;
let nowDead = function() {
    isDead = true;
}

let tmp = document.getElementById("follow");
tmp.addEventListener("mouseout", newScore);
let tmp2 = document.getElementById("death");
tmp2.addEventListener("mouseover", nowDead);
path_blocks.push(tmp);

let createNewLineBlocks = function() {
    //Check if there is room for a new falling block (verify top positionning of last falling block in the array)
    //exit otherwise
    let danger_elems = [];
    let path_elem;
    for(let i=0; i<danger_elems.length; i++) {
        danger_blocks.push(danger_elems[i]);
        danger_elems[i].addEventListener("mouseover", nowDead);
    }
    path_blocks.push(path_elem);
    //Uncomment when fonction is implemented
    //path_elem.addEventListener("mouseout", newScore);
}
let deleteFinishedLineBlocks = function() {
    //Check if a falling block is out the screen (verify top positionning of first falling block in the array)
    //exit otherwise
    let danger_elems = [];
    for(let i=0; i<danger_elems.length; i++) {
        danger_blocks.shift(danger_elems[i]);
        danger_elems[i].removeEventListener("mouseover", nowDead);
    }
}

let mastergamescript = function() {
    let intervalID;
    let prevscore = score;

    //boucle de jeu
    let gamefunc = function() {
        if(!isDead) {
            createNewLineBlocks();

            //to prevent player from hacking the game by getting through over and over to falsely increase score
            if(prevscore != score) {
                path_blocks[0].removeEventListener("mouseout", newScore);
                prevscore = score;
            }

            deleteFinishedLineBlocks();
        } else {
            clearInterval(intervalID);
            isDead = false;
            console.log("Mettre le score dans le Local Storage: " + score);
            score = 0;
        }
    }
    intervalID = setInterval(gamefunc, 10);
}

document.addEventListener("click", mastergamescript);
}

document.addEventListener("DOMContentLoaded", funcready);
