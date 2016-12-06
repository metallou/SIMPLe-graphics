let pathcanvas = function() {
    let path = [];
    let canv = document.getElementById("canv");
    let scaleratio = 3;
    let maxpathlength = 100;
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    let ctx = canv.getContext("2d");
    ctx.scale(scaleratio,scaleratio);

    let drawpath = function() {
        ctx.clearRect(0,0, canv.width,canv.height);
        ctx.beginPath();
        for(let i=0; i<path.length; i++) {
            ctx.lineTo(path[i].X, path[i].Y);
        }
        ctx.stroke();
    }

    let scrollpath = function() {
        for(let i=0; i<path.length; i++) {
            path[i].Y += 1;
        }
        if(path.length>0) {
            if(path[0].Y>canv.height/scaleratio) {
                path.shift();
            }
        }
        drawpath();
    }

    setInterval(scrollpath, 15);

    let updatepath = function() {
        let mouse = {X:Math.floor(event.clientX / 3),Y:Math.floor(event.clientY / 3)};
        path.push(mouse);
        if(path.length > maxpathlength) {
            path.shift();
        }
        drawpath();
    }

    document.addEventListener("mousemove", updatepath);
}

document.addEventListener("DOMContentLoaded", pathcanvas);
