let mouse = {X:0,Y:0};

let updatemouse = function() {
    mouse.X = event.clientX;
    mouse.Y = event.clientY;
}

document.addEventListener("mousemove", updatemouse);
