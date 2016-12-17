"use strict"

const statsFunc = function()
{
    const tables = document.getElementById("statspage").getElementsByTagName("table");
    const trs = document.getElementById("statspage").getElementsByTagName("tr");
    let key;
    let value;
    for(let i=0; i<trs.length; i++) {
        key = trs[i].children[0].textContent;
        key = key.toLowerCase();
        key = key.split("\n").join("");;
        key = key.split(":").join("");
        key = key.split(" ").join("");
        value = localStorage.getItem(key);
        trs[i].children[1].innerHTML = value;
    }
    for(let i=1; i<tables.length; i++) {
        tables[i].style["display"] = "none";
    }
}

const displayedElementIndex = function(array)
{
    let displayed;
    for(let i=0; i<array.length; i++) {
        if(displayed == undefined) {
            if(array[i].style["display"] != "none") {
                displayed = i;
            }
        }i
    }
    return displayed;
}
const nextStatsPage = function()
{
    const pages = document.getElementById("statspage").getElementsByTagName("table");
    const num = displayedElementIndex(pages);
    const curr = pages[num];
    const next = pages[num+1];
    if(next!=null && next!=undefined) {
        curr.style["display"] = "none";
        next.style["display"] = "";;
    }
}
const prevStatsPage = function()
{
    const pages = document.getElementById("statspage").getElementsByTagName("table");
    const num = displayedElementIndex(pages);
    const curr = pages[num];
    const prev = pages[num-1];
    if(prev!=null && prev!=undefined) {
        curr.style["display"] = "none";
        prev.style["display"] = "";
    }
}

const statsFuncReady = function()
{
    document.getElementById("statsbutton").addEventListener("click", statsFunc);
    document.getElementById("nextstats").addEventListener("click", nextStatsPage);
    document.getElementById("prevstats").addEventListener("click", prevStatsPage);
}
document.addEventListener("DOMContentLoaded", statsFuncReady);
