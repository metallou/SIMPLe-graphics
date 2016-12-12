"use strict"

document.addEventListener("DOMContentLoaded", function(event)
        {
            //Necessary for testing (to be removed)
            let backgroundColor = function()
            {
                document.getElementsByTagName("body")[0].style["background-color"] = "#FF0000";
                setTimeout(function()
                        {
                            document.getElementsByTagName("body")[0].style["background-color"] = "";
                        }
                        ,1000);
            }

            let lineBlocks = [];

            let createNewLineBlocks = function(score)
            {
                let lastLineBlocksIndex = lineBlocks.length;

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
                lineBlocks.push(container);

                //Add all Event Listeners to children
                container.childNodes[0].addEventListener("mouseover", backgroundColor);
                container.childNodes[2].addEventListener("mouseover", backgroundColor);
                for(let i=0; i<container.childNodes[1].childNodes[0].childNodes.length; i++) {
                    if(container.childNodes[1].childNodes[0].childNodes[i].classList.contains("passage")) {
                        //container.childNodes[1].childNodes[0].childNodes[i].addEventListener("mouseover", backgroundColor);
                    } else {
                        container.childNodes[1].childNodes[0].childNodes[i].addEventListener("mouseover", backgroundColor);
                    }
                }

                //When animation ends, remove all Event Listeners and deletes block-line
                container.addEventListener("animationend", function()
                        {
                            //Not really necessary
                            /*
                            this.childNodes[0].removeEventListener("mouseover", backgroundColor);
                            this.childNodes[2].removeEventListener("mouseover", backgroundColor);
                            for(let i=0; i<this.childNodes[1].childNodes[0].childNodes.length; i++) {
                                this.childNodes[1].childNodes[0].childNodes[i].removeEventListener("mouseover", backgroundColor);
                            }
                            */
                            lineBlocks.shift();
                            this.parentNode.removeChild(this);
                        });
            }

            createNewLineBlocks(7);
        });
