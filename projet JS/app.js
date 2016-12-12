"use strict"
document.addEventListener("DOMContentLoaded", function(event)
        {

            let lineBlocks = [];

            let createNewLineBlocks = function(score)
            {
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
                        lineBlocks[lastLineBlocksIndex].childNodes[1].childNodes[0].childNodes[indCase].classList.add("passage");
                    }

                    let center = document.createElement("div");
                    center.classList.add("centre");
                    contain.appendChild(center);
                    let line = document.createElement("div");
                    line.classList.add("ligne");
                    center.appendChild(line);
                    for (let i = 0; i < nb; i++) {
                        let ncase = document.createElement("div");
                        lineBlocks[lastLineBlocksIndex].childNodes[1].childNodes[0].appendChild(ncase);
                        ncase.classList.add("bloc");
                    }
                    let hauteur = line.offsetWidth / nb;
                    lineBlocks[lastLineBlocksIndex].childNodes[1].childNodes[0].style["height"] = hauteur + "px";

                    randompass(nb);
                }

                //Check if there is room for a new line of blocks
                let lastLineBlocksIndex = lineBlocks.length;
                if(lastLineBlocksIndex>0) {
                    //Mettre les blocs.block-line en position absolute dans le css
                    //Faire l'animation (@keyframes} de descente des blocs.block-line (from{top:-block.height} to {top:window.height})
                    console.log(lineBlocks[lastLineBlocksIndex-1].style["top"]);
                //if (top < 5) then create new line of blocks else break
            }

            if(true) {
                //Increase number of blocks in the line at each step
                let nbCases = 5 + score;
                //Limitation to 100 cases
                if(nbCases > 100) {
                    nbCases = 100;
                }

                //Create all the blocs
                let container = createContainer();
                lineBlocks.push(container);
                createLineV(container, "gauche");
                createLineH(container, nbCases);
                createLineV(container, "droite");
                //Il faut mettre les addEventListener pour la mort et le score (possiblement dans une fonction  à part)
            }
        }
//Score will be set by masterscript

createNewLineBlocks(7);
createNewLineBlocks(7);
createNewLineBlocks(7);
createNewLineBlocks(7);
});
