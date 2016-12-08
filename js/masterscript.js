//Not my task (to be removed soon)
let createNewLineBlocks = function() {};
let deleteFinishedLineBlocks = function() {};

let mastergamescript = function() {

    let score = 0;
    let isDead = false;
    let nowDead = function() {
        isDead = true;
    }
    let danger_blocks;
    let intervalID;

    //boucle de jeu
    let gamefunc = function() {
        if(!isDead) {
            console.log("a");
            createNewLineBlocks();

            danger_blocks = document.getElementsByClassName("danger");
            for(let i=0; i<danger_blocks.length; i++) {
                danger_blocks[i].addEventListener("mouseover", nowDead);
            }

            if(Math.floor(Math.random()*1000*2)%16==0) {
                nowDead();
            }

            score++;

            deleteFinishedLineBlocks();
            for(let i=0; i<danger_blocks.length; i++) {
                danger_blocks[i].removeEventListener("mouseover", nowDead);
            }
        } else {
            clearInterval(intervalID);
            console.log("b");
            console.log("Mettre le score dans le Local Storage: " + score);
        }
    }
    intervalID = setInterval(gamefunc, 10);
}

document.addEventListener("click", mastergamescript);
