let keysonoff =
[
    "music",
    "sound"
];
let keys =
[
    "totalgamesplayed",
    "totalscore",
    "highestscore",
    "averagescore",
    "lastscore",
    "totalbonusestaken",
    "totalbosswavessurvived",
    "totalfallingbosswavessurvived",
    "totalrisingbosswavessurvived"
];

let optionsfunc = function()
{
    let checkValue = function(key)
    {
        let elemon = document.getElementById(key+"on");
        let elemoff = document.getElementById(key+"off");
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

    document.getElementById("clearstorage").addEventListener("click", function()
            {
                localStorage.clear();
                for(let i=0; i<keysonoff.length; i++) {
                    localStorage.setItem(keysonoff[i], "true");
                    checkValue(keysonoff[i]);
                }
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
                    checkValue(keysonoff[i]);
                });
        elem2.addEventListener("click", function()
                {
                    localStorage.setItem(keysonoff[i], "false");
                    checkValue(keysonoff[i]);
                });
    }
}

let optionsfuncready = function()
{
    document.getElementById("optionsbutton").addEventListener("click", optionsfunc);
}
document.addEventListener("DOMContentLoaded", optionsfuncready);
