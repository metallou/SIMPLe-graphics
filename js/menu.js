const blackScreen = function(time)
{
    const elem = document.createElement("div");
    const blackscreenOff = function()
    {
        document.getElementById("wrapper").removeChild(elem);
    }

    elem.classList.add("blackscreen");
    document.getElementById("wrapper").appendChild(elem);
    setTimeout(blackscreenOff, time);
}

const buttonReady = function()
{
    document.getElementById("optionsbutton").addEventListener("click", function()
            {
                blackScreen(500);
                document.getElementsByTagName("article")[0].style["left"] = "0px";
            });
    document.getElementById("statsbutton").addEventListener("click", function()
            {
                blackScreen(500);
                document.getElementsByTagName("article")[0].style["left"] = "-200vw";
            });
    document.getElementById("playbutton").addEventListener("click", mastergamescript);

    const buttons = document.getElementsByClassName("menubutton");
    for(let i=0; i<buttons.length; i++) {
        buttons[i].addEventListener("click", function()
                {
                    blackScreen(500);
                    document.getElementsByTagName("article")[0].style["left"] = "-100vw";
                });
    }
}
document.addEventListener("DOMContentLoaded", buttonReady);
