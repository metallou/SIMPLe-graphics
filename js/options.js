const keysonoff =
[
    "music",
    "sound"
];
const keys =
[
    "totalgamesplayed",
    "totalscore",
    "highestscore",
    "averagescore",
    "lastscore",
    "totalbosswaves",
    "totalrisingbosswaves",
    "totalfallingbosswaves"
];

const initLocalStorage = function(koo, k)
{
    for(let i=0; i<koo.length; i++) {
        if(localStorage.getItem(koo[i]) == null || localStorage.getItem(koo[i]) == undefined) {
            localStorage.setItem(koo[i], "true");
        }
    }
    for(let i=0; i<k.length; i++) {
        if(localStorage.getItem(k[i]) == null || localStorage.getItem(k[i]) == undefined) {
            localStorage.setItem(k[i], "0");
        }
    }
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

const optionsFuncReady = function()
{
    initLocalStorage(keysonoff, keys);
    document.getElementById("optionsbutton").addEventListener("click", optionsFunc);
}
document.addEventListener("DOMContentLoaded", optionsFuncReady);
