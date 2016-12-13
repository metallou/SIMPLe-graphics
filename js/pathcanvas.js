let path = [];
let maxpathstops = 100;
let canv;
let ctx;
let offX;
let offY;
let spaceship;

let updatePath = function(offsetX, offsetY)
{
    path.push({X: mouseX+offsetX, Y: mouseY+offsetY});
    if(path.length > maxpathstops) {
        path.shift();
    }
}
let scrollPath = function()
{
    for(let i=0; i<path.length; i++) {
        path[i].Y += 5;
    }
}
let drawPath = function()
{
    ctx.clearRect(0,0, canv.width,canv.height);
    ctx.beginPath();
    ctx.moveTo(path[0].X, path[0].Y);
    for(let i=1; i<path.length; i++) {
        ctx.lineTo(path[i].X, path[i].Y);
    }
    ctx.stroke();
}
let funcPath = function()
{
    updatePath(offX, offY);
    scrollPath();
    drawPath();
}

let funcPathReady = function()
{
    canv = document.getElementById("canv");
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    ctx = canv.getContext("2d");
    offX = 0;
    offY = 93*0.69;

    setInterval(funcPath, 10);
}
document.addEventListener("DOMContentLoaded", funcPathReady);
