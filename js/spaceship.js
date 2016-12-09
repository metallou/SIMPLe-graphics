let updateSpaceshipready = function() {

    let spaceship = document.getElementById("spaceship");

    let updateSpaceship = function() {
        spaceship.style["left"] = mouseX + 'px',
        spaceship.style["top"] =  mouseY + 'px';
    }
    setInterval(updateSpaceship, 10);

}

document.addEventListener("DOMContentLoaded", updateSpaceshipready);
