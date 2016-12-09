let buttonready = function() {
    let blackScreen = function() {
        let elem = document.createElement("div");
        let blackScreenOff = function() {
            document.getElementById("wrapper").removeChild(elem);
        }

        elem.classList.add("blackscreen");
        document.getElementById("wrapper").appendChild(elem);
        setTimeout(blackScreenOff, 500);
    }

    document.getElementById("optionsbutton").addEventListener("click", function() {
        blackScreen();
        document.getElementsByTagName("article")[0].style["left"] = "0px";
    });
    document.getElementById("statsbutton").addEventListener("click", function() {
        blackScreen();
        document.getElementsByTagName("article")[0].style["left"] = "-200vw";
    });

    let buttons = document.getElementsByClassName("menubutton");
    for(let i=0; i<buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            blackScreen();
            document.getElementsByTagName("article")[0].style["left"] = "-100vw";
        });
    }

}
document.addEventListener("DOMContentLoaded", buttonready);
