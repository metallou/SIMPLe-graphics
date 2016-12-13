let statsfunc = function()
{
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

let statsfuncready = function()
{
    document.getElementById("statsbutton").addEventListener("click", statsfunc);
}
document.addEventListener("DOMContentLoaded", statsfuncready);
