let test = function() {
    let rndcolor = function(elem) {
        let X = "#";
        let red = Math.floor(Math.random()*1000*255)%255;
        let green = Math.floor(Math.random()*1000*255)%255;
        let blue = Math.floor(Math.random()*1000*255)%255;
        return "rgb("+red+","+green+","+blue+")";
    }

    let wait = function(elem, ms) {
        setTimeout(function() {
            let element = document.getElementById(elem);
            element.parentNode.removeChild(element);
        }, ms);
    }

    let functions =
        [
        {func: rndcolor, name: "rndcolor"}
        ];

        document.addEventListener("mousemove", function() {
            let elem = document.getElementById("follow");
            if(event.clientX > window.innerWidth - elem.offsetWidth/2) {
                elem.style["left"] = window.innerWidth - elem.offsetWidth/2 + "px";
            } else if(event.clientX < elem.offsetWidth/2) {
                elem.style["left"] = elem.offsetWidth/2 + "px";
            } else {
                elem.style["left"] = event.clientX + "px";
            }

            if(event.clientY > window.innerHeight - elem.offsetHeight/2) {
                elem.style["top"] = window.innerHeight - elem.offsetHeight/2 + "px";
            } else if(event.clientY < elem.offsetHeight/2) {
                elem.style["top"] = elem.offsetHeight/2 + "px";
            } else {
                elem.style["top"] = event.clientY + "px";
            }
        });

        document.body.addEventListener("click", function() {
            let elem = document.createElement("div");
            elem.id = "title";
            document.getElementsByTagName("main")[0].appendChild(elem);
            elem.innerHTML = functions[0].name;
            document.getElementById("follow").style["background-color"] = functions[0].func();
            wait("title", 3000);
        });
}

document.addEventListener("DOMContentLoaded", test);
