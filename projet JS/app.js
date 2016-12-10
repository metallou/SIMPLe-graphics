document.addEventListener("DOMContentLoaded", function(event) {

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
        let createLineH = function(contain, pos) {
            let center = document.createElement("div");
            center.classList.add("centre");
            contain.appendChild(center);
            let line = document.createElement("div");
            line.classList.add("ligne");
            center.appendChild(line);
            let nbCase = Math.round(100 / pos);
            for (let i = 0; i < nbCase; i++) {
                let ncase = document.createElement("div");
                document.getElementsByClassName("ligne")[0].appendChild(ncase);
                ncase.classList.add("bloc");
            }
            hauteur = document.getElementsByClassName("bloc")[0].offsetWidth;
            document.getElementsByClassName("ligne")[0].style.height = hauteur + "px";

            let randompass = function() {
                let nb = Math.round(Math.random() * 1000 * nbCase) % nbCase;
                document.getElementsByClassName("bloc")[nb].classList.add("passage");
            }
            randompass();

        }
        let containe = createContainer();
        console.log("createcont");
        createLineV(containe, "droite");
        console.log("droite");
        createLineH(containe, 5);
        console.log("mid");
        createLineV(containe, "gauche");
        console.log("left");
    }
    createNewLineBlocks();
    createNewLineBlocks();
    createNewLineBlocks();
    createNewLineBlocks();
});
