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
            if(sessionStorage.getItem(key) === "true") {
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
            sessionStorage.clear();
            for(let i=0; i<keysonoff; i++) {
                sessionStorage.setItem(keysonoff[i], "true");
            }
        });

        for(let i=0; i<keysonoff.length; i++) {
            elem = document.getElementById(keysonoff[i]+"on");
            elem2 = document.getElementById(keysonoff[i]+"off");
            checkvalue(keysonoff[i]);

            elem.addEventListener("click", function() {
                sessionStorage.setItem(keysonoff[i], "true");
                checkvalue(keysonoff[i]);
            });
            elem2.addEventListener("click", function() {
                sessionStorage.setItem(keysonoff[i], "false");
                checkvalue(keysonoff[i]);
            });
        }
    }
    document.getElementById("optionsbutton").addEventListener("click", optionsfunc);
}
document.addEventListener("DOMContentLoaded", optionsfuncready);
