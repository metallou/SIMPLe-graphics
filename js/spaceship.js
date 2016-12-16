"use strict"

const updateSpaceshipReady = function() {

    const spaceship = document.getElementById("spaceship");
    spaceship.style["left"] = initMouseX + "px";
    spaceship.style["top"] = initMouseY + "px";

    let updateSpaceship = function() {
        spaceship.style["left"] = mouseX + 'px',
        spaceship.style["top"] =  (mouseY + 5) + 'px';
    }
    document.addEventListener("mousemove", updateSpaceship);
}
document.addEventListener("DOMContentLoaded", updateSpaceshipReady);
