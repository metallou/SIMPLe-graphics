let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;

let updateMousePos = function() {
    mouseX = event.clientX;
    mouseY = event.clientY;
}
document.addEventListener("mousemove", updateMousePos);
