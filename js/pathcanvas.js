let path = [];
let maxpathstops = 500;
let offX = 0;
let offY = 0;
let canvas1;
let ctx1;
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
    ctx1.clearRect(0,0, canvas1.width,canvas1.height);
    ctx1.beginPath();
    ctx1.moveTo(path[0].X, path[0].Y);
    for(let i=1; i<path.length; i++) {
        ctx1.lineTo(path[i].X, path[i].Y);
    }
    ctx1.stroke();
}
let funcPath = function()
{
    updatePath(offX, offY);
    scrollPath();
    drawPath();
}

let funcPathReady = function()
{
    canvas1 = document.getElementById("canvas1");
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    ctx1 = canvas1.getContext("2d");
    ctx1.globalCompositeOperation="destination-over";
    offX = 0;
    offY = document.getElementById("spaceship").offsetHeight*0.69;

    setInterval(funcPath, 10);
}
document.addEventListener("DOMContentLoaded", funcPathReady);
