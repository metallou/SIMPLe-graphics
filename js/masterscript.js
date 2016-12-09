let totalgamesplayed = 3;
let totalgamesplayedkey = "totalgamesplayed";
sessionStorage.setItem(totalgamesplayedkey, totalgamesplayed);
for(let i=1; i<=totalgamesplayed; i++) {
    sessionStorage.setItem("score"+i, Math.floor(Math.random()*1000*5)%5);
}

let funcready = function() {
    let gamesplayed = parseInt(sessionStorage.getItem(totalgamesplayedkey));

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

    //Test blocks (to be removed)
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
        //Reset variables
        let prevscore = 0;
        score = 0;
        isDead = false;

        //boucle de jeu
        let gamefunc = function() {
            if(!isDead) {
                //Create new line if possible
                createNewLineBlocks();

                //to prevent player from hacking the game by getting through over and over to falsely increase score
                if(prevscore != score) {
                    path_blocks[0].removeEventListener("mouseout", newScore);
                    prevscore = score;
                }

                //Delete old line if necessary
                deleteFinishedLineBlocks();
            } else {
                clearInterval(intervalID);
                //Ajout dans LocalStorage
                let totalgamesplayed = sessionStorage.getItem(totalgamesplayedkey);
                totalgamesplayed++;
                sessionStorage.setItem(totalgamesplayedkey, totalgamesplayed);
                sessionStorage.setItem("score"+totalgamesplayed, score);
                //Ajoutee autres champs dans le LocalStorage (j'aime les stats)
            }
        }
        //Repeat gamefunc
        intervalID = setInterval(gamefunc, 10);
    }

    document.addEventListener("click", mastergamescript);
}

document.addEventListener("DOMContentLoaded", funcready);
