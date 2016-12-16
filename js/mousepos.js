"use strict"

const initMouseX = 0.5*window.innerWidth;
const initMouseY = 0.55*window.innerHeight;

let mouseX = initMouseX;
let mouseY = initMouseY;

const updateMousePos = function(event)
{
    mouseX = event.clientX;
    mouseY = event.clientY;
}
document.addEventListener("mousemove", updateMousePos);
