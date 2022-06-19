let errorContainer = document.getElementById("errorContent");
let timerContainer = document.getElementById("timerContent");
let accuracyContainer = document.getElementById("accuracyContent");

let inputText = document.getElementById("inputText");
//let accuracyContainer = document.getElementById("accuracyContent");

let timer = 7;
timerContainer.innerHTML = timer+"s";

inputText.addEventListener("keydown",()=>{
    setInterval(() => {
    if(timer>0){
        timer--;
        timerContainer.innerHTML = timer+"s";
    }
    else{   
        clearInterval(timerFunction);
        alert("Times up");
    }
},1000);
})
/*
var timerFunction = setInterval(() => {
    if(timer>0){
        timer--;
        timerContainer.innerHTML = timer+"s";
    }
    else{   
        clearInterval(timerFunction);
        alert("Times up");
    }
},1000);
*/

