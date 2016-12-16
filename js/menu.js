"use strict"

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
const blackscreen2 = function(time){
  const expl = document.getElementById('spaceship');
  expl.src="img/mort.gif";
  const elem = document.createElement("div");
  const blackscreen2Off = function()
  {
      const expl = document.getElementById('spaceship');
      expl.src="img/tintin_spaceship.gif";
      document.getElementById("wrapper").removeChild(elem);
  }

  elem.classList.add("blackscreen");
  document.getElementById("wrapper").appendChild(elem);
  setTimeout(blackscreen2Off, time);

}

const scoreMenu = function()
{
    document.getElementById("HS").textContent = localStorage.getItem("highestscore");
    document.getElementById("LS").textContent = localStorage.getItem("lastscore");
}

const buttonReady = function()
{
    document.getElementById("optionsbutton").addEventListener("click", function()
            {
                blackScreen(500);
                document.getElementById("pages").style["left"] = "0px";
            });
    document.getElementById("statsbutton").addEventListener("click", function()
            {
                blackScreen(500);
                document.getElementById("pages").style["left"] = "-200vw";
            });
    document.getElementById("playbutton").addEventListener("click", function()
            {
                document.getElementById("pages").style["display"] = "none";
                mastergamescript()
            });

    const buttons = document.getElementsByClassName("menubutton");
    for(let i=0; i<buttons.length; i++) {
        buttons[i].addEventListener("click", function()
                {
                    blackScreen(500);
                    document.getElementById("pages").style["left"] = "-100vw";
                });
    }

    scoreMenu();
    setInterval(scoreMenu,1000);
    //Does not seem to work (ask Ben)
    //window.addEventListener("storage", scoreMenu);
}
document.addEventListener("DOMContentLoaded", buttonReady);
