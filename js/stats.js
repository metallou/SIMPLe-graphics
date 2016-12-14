const statsFunc = function()
{
    const nb_elems = document.getElementsByTagName("tr").length;
    let key;
    let value;
    for(let i=1; i<=nb_elems; i++) {
        key = document.getElementById("k"+i).innerHTML;
        key = key.toLowerCase();
        key = key.split("\n").join("");;
        key = key.split(":").join("");
        key = key.split(" ").join("");
        value = localStorage.getItem(key);
        document.getElementById("v"+i).innerHTML = value;
    }
}

const statsFuncReady = function()
{
    document.getElementById("statsbutton").addEventListener("click", statsFunc);
}
document.addEventListener("DOMContentLoaded", statsFuncReady);
