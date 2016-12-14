let updateSpaceshipready = function() {

    let spaceship = document.getElementById("spaceship");
    spaceship.style["left"] = (initMouseX - spaceship.offsetWidth/2) + "px";
    spaceship.style["top"] = initMouseY + "px";

    let updateSpaceship = function() {
        spaceship.style["left"] = (mouseX - spaceship.offsetWidth/2) + 'px',
        spaceship.style["top"] =  (mouseY + 5) + 'px';
    }
    document.addEventListener("mousemove", updateSpaceship);
}
document.addEventListener("DOMContentLoaded", updateSpaceshipready);
