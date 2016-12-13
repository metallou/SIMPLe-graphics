const initMouseX = window.innerWidth/2;
const initMouseY = window.innerHeight/4;

let mouseX = initMouseX;
let mouseY = initMouseY;

let updateMousePos = function(e)
{
    mouseX = e.clientX;
    mouseY = e.clientY;
}
document.addEventListener("mousemove", updateMousePos);
