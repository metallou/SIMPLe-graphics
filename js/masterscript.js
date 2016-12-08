let game = function() {
    return "score";
}

let masterscript = function() {
    let score = game();
    console.log("mettre le score dans le Local Storage: " + score);
}

document.addEventListener("click", masterscript);
