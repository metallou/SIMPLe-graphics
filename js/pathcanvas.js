"use strict"

//Global variable
const path = [];
const offsetDown = Math.floor(0.5*window.innerHeight/100);

const funcPath = function()
{
    const canvas1 = document.getElementById("canvas1");
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    const ctx1 = canvas1.getContext("2d");
    ctx1.globalCompositeOperation="destination-over";
    const offX = 0;
    const offY = document.getElementById("spaceship").offsetHeight*0.69;

    const updatePath = function(offsetX, offsetY)
    {
        const maxpathstops = 500;

        path.push({X: mouseX+offsetX, Y: mouseY+offsetY});
        if(path.length > maxpathstops) {
            path.shift();
        }
    }
    const scrollPath = function()
    {
        for(let i=0; i<path.length; i++) {
            path[i].Y += offsetDown;
        }
    }
    const drawPath = function()
    {
        ctx1.clearRect(0,0, canvas1.width,canvas1.height);
        ctx1.beginPath();
        ctx1.moveTo(path[0].X, path[0].Y);
        for(let i=1; i<path.length; i++) {
            ctx1.lineTo(path[i].X, path[i].Y);
        }
        ctx1.stroke();
    }

    updatePath(offX, offY);
    scrollPath();
    drawPath();
}

let funcPathReady = function()
{
    setInterval(funcPath, 10);
}
document.addEventListener("DOMContentLoaded", funcPathReady);
