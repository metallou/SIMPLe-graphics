"use strict"

const keysonoff =
[
    "music",
    "sound",
    "normalgameonly",
    "bossgameonly",
    "risingbossonly",
    "fallingbossonly"
];
const keys =
[
    "totalgamesplayed",
    "totalscore",
    "highestscore",
    "averagescore",
    "lastscore",
    "totalbosswaves",
    "totalbosstotalscore",
    "totalbosshighestscore",
    "totalbossaveragescore",
    "totalbosslastscore",
    "totalrisingbosswaves",
    "risingbosstotalscore",
    "risingbosshighestscore",
    "risingbossaveragescore",
    "risingbosslastscore",
    "totalfallingbosswaves",
    "fallingbosstotalscore",
    "fallingbosshighestscore",
    "fallingbossaveragescore",
    "fallingbosslastscore",
];

const initLocalStorage = function(koo, k)
{
    for(let i=0; i<koo.length; i++) {
        if(localStorage.getItem(koo[i]) == null || localStorage.getItem(koo[i]) == undefined) {
            localStorage.setItem(koo[i], "false");
        }
    }
    for(let i=0; i<k.length; i++) {
        if(localStorage.getItem(k[i]) == null || localStorage.getItem(k[i]) == undefined) {
            localStorage.setItem(k[i], "0");
        }
    }
    localStorage.setItem("music", "true");
    localStorage.setItem("sound", "true");
}

const optionsFunc = function()
{
    const checkValue = function(key)
    {
        const elemon = document.getElementById(key+"on");
        const elemoff = document.getElementById(key+"off");
        if(localStorage.getItem(key) === "true") {
            if(!elemon.classList.contains("selected")) {
                elemon.classList.add("selected");
                elemoff.classList.remove("selected");
            }
        } else {
            if(!elemoff.classList.contains("selected")) {
                elemon.classList.remove("selected");
                elemoff.classList.add("selected");
            }
        }
    }

    document.getElementById("clearoptions").addEventListener("click", function()
            {
                for(let i=0; i<keysonoff.length; i++) {
                    localStorage.setItem(keysonoff[i], "false");
                    checkValue(keysonoff[i]);
                }
                localStorage.setItem("music", "true");
                checkValue("music");
                localStorage.setItem("sound", "true");
                checkValue("sound");
            });
    document.getElementById("clearstats").addEventListener("click", function()
            {
                for(let i=0; i<keys.length; i++) {
                    localStorage.setItem(keys[i], 0);
                }
            });

    let elem;
    let elem2;
    for(let i=0; i<keysonoff.length; i++) {
        checkValue(keysonoff[i]);
        elem = document.getElementById(keysonoff[i]+"on");
        elem2 = document.getElementById(keysonoff[i]+"off");

        elem.addEventListener("click", function()
                {
                    localStorage.setItem(keysonoff[i], "true");
                    if(keysonoff[i] === "risingbossonly") {
                        localStorage.setItem("fallingbossonly", "false");
                        checkValue("fallingbossonly");
                    }
                    if(keysonoff[i] === "fallingbossonly") {
                        localStorage.setItem("risingbossonly", "false");
                        checkValue("risingbossonly");
                    }
                    if(keysonoff[i] === "bossgameonly") {
                        localStorage.setItem("normalgameonly", "false");
                        checkValue("normalgameonly");
                    }
                    if(keysonoff[i] === "normalgameonly") {
                        localStorage.setItem("bossgameonly", "false");
                        checkValue("bossgameonly");
                    }
                    checkValue(keysonoff[i]);
                });
        elem2.addEventListener("click", function()
                {
                    localStorage.setItem(keysonoff[i], "false");
                    checkValue(keysonoff[i]);
                });
    }
}

const optionsFuncReady = function()
{
    initLocalStorage(keysonoff, keys);
    document.getElementById("optionsbutton").addEventListener("click", optionsFunc);
}
document.addEventListener("DOMContentLoaded", optionsFuncReady);
