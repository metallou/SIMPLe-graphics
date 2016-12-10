let statsfuncready = function() {

    let statsfunc = function() {
        let nbelems = document.getElementsByTagName("tr").length;
        let key;
        let value;
        for(let i=1; i<=nbelems; i++) {
            key = document.getElementById("t"+i).innerHTML;
            key = key.toLowerCase();
            key = key.split("\n").join("");;
            key = key.split(":").join("");
            key = key.split(" ").join("");
            value = localStorage.getItem(key);
            document.getElementById("v"+i).innerHTML = value;
        }
    }
    document.getElementById("statsbutton").addEventListener("click", statsfunc);

    let keys =
        [
        "totalgamesplayed",
        "totalscore",
        "highestscore",
        "averagescore",
        "totalbonusestaken",
        "totalbosswavessurvived",
        "totalfallingbosswavessurvived",
        "totalrisingbosswavessurvived",
        "lastscore"
        ];
    let val;
    for(let i=0; i<keys.length; i++) {
        val = localStorage.getItem(keys[i]);
        if(val === null || val === undefined) {
            localStorage.setItem(keys[i], "0");
        }
    }


}
document.addEventListener("DOMContentLoaded", statsfuncready);
