"use strict"

//Global variable
const path = [];
const offsetDown = Math.floor(0.5 * window.innerHeight / 100);
const proutprout = new Image();
proutprout.src = "img/prout.png";
proutprout.style["left"] = "-50%";


const funcPath = function() {
    const canvas1 = document.getElementById("canvas1");
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    const ctx1 = canvas1.getContext("2d");
    ctx1.globalCompositeOperation = "destination-over";
    const offX = 0;
    const offY = document.getElementById("spaceship").offsetHeight * 0.69;

    const updatePath = function(offsetX, offsetY) {
        const maxpathstops = 100;

        path.push({
            X: mouseX + offsetX,
            Y: mouseY + offsetY,
            prout: false
        });
        if(path.length == 1) {
            path[0].prout = true;
        }
        if(path.length >= 3) {
            path[path.length-1].prout = path[path.length-3].prout;
        }
        if (path.length > maxpathstops) {
            path.shift();
        }
    }
    const scrollPath = function() {
        for (let i = 0; i < path.length; i++) {
            path[i].Y += offsetDown;
        }
    }
    const drawPath = function() {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        for (let i = 0; i < path.length; i++) {
            if(path[i].prout) {
                ctx1.drawImage(proutprout, (path[i].X - 14*i/path.length), path[i].Y, 30*i/path.length, 30*i/path.length);
            }
        }

    }

    updatePath(offX, offY);
    scrollPath();
    drawPath();
}

let funcPathReady = function() {
    setInterval(funcPath, 10);
}
document.addEventListener("DOMContentLoaded", funcPathReady);
