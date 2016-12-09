let optionsfuncready = function() {

    let optionsfunc = function() {
        let elem;
        let elem2;
        let keysonoff =
            [
            "music",
            "sound"
            ];

        let checkvalue = function(key) {
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

        elem = document.getElementById("clearstorage").addEventListener("click", function() {
            localStorage.clear();
            for(let i=0; i<keysonoff; i++) {
                localStorage.setItem(keysonoff[i], "true");
            }
            localStorage.setItem("totalgamesplayed", "0");
            localStorage.setItem("totalscore", "0");
            localStorage.setItem("highestscore", "0");
            localStorage.setItem("averagescore", "0");
            localStorage.setItem("totalbonusestaken", "0");
            localStorage.setItem("totalbosswavessurvived", "0");
            localStorage.setItem("totalfallingbosswavessurvived", "0");
            localStorage.setItem("totalrisingbosswavessurvived", "0");
            localStorage.setItem("lastscore", "0");
        });

        for(let i=0; i<keysonoff.length; i++) {
            elem = document.getElementById(keysonoff[i]+"on");
            elem2 = document.getElementById(keysonoff[i]+"off");
            checkvalue(keysonoff[i]);

            elem.addEventListener("click", function() {
                localStorage.setItem(keysonoff[i], "true");
                checkvalue(keysonoff[i]);
            });
            elem2.addEventListener("click", function() {
                localStorage.setItem(keysonoff[i], "false");
                checkvalue(keysonoff[i]);
            });
        }
    }
    document.getElementById("optionsbutton").addEventListener("click", optionsfunc);
}
document.addEventListener("DOMContentLoaded", optionsfuncready);
