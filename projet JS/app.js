document.addEventListener("DOMContentLoaded", function(event) {

    let lineBlocks = [];

    let createNewLineBlocks = function() {
        let createContainer = function() {
            let contain = document.createElement("div");
            contain.classList.add("block-line");
            document.body.appendChild(contain); //a modifier lors du merge
            return contain;
        }
        let createLineV = function(contain, position) {
            let vert = document.createElement("div");
            vert.classList.add(position);
            contain.appendChild(vert);
        }
        let createLineH = function(contain, wid) {
            let randompass = function(nbCase) {
                let indCase = Math.round(Math.random() * 1000 * nbCase) % nbCase;
                lineBlocks[lastLineBlocksIndex].childNodes[1].childNodes[0].childNodes[indCase].classList.add("passage");
            }

            let center = document.createElement("div");
            center.classList.add("centre");
            contain.appendChild(center);
            let line = document.createElement("div");
            line.classList.add("ligne");
            center.appendChild(line);
            let nbCase = Math.round(100 / wid);
            for (let i = 0; i < nbCase; i++) {
                let ncase = document.createElement("div");
                lineBlocks[lastLineBlocksIndex].childNodes[1].childNodes[0].appendChild(ncase);
                ncase.classList.add("bloc");
            }
            hauteur = document.getElementsByClassName("bloc")[0].offsetWidth;
            lineBlocks[lastLineBlocksIndex].childNodes[1].childNodes[0].style["height"] = hauteur + "px";

            randompass(nbCase);
        }

        let lastLineBlocksIndex = lineBlocks.length;
        if(lastLineBlocksIndex>0) {
            //Mettre les blocs.block-line  en position absolute dans le css
            //Faire l'animation (@keyframes} de descente des blocs.block-line (from{top:-block.height} to {top:window.height})
            console.log(lineBlocks[lastLineBlocksIndex-1].style["top"]);
            //if (top < 5) then create new blocks else break
        }
        let containe = createContainer();
        lineBlocks.push(containe);
        createLineV(containe, "gauche");
        createLineH(containe, 5);
        createLineV(containe, "droite");
    }
    createNewLineBlocks();
    createNewLineBlocks();
    createNewLineBlocks();
    createNewLineBlocks();
});
