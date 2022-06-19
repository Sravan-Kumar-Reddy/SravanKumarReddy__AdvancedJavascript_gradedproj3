let errorContainer = document.getElementById("errorContent");
let timerContainer = document.getElementById("timerContent");
let accuracyContainer = document.getElementById("accuracyContent");
let dummyTextContainer = document.getElementById("dummyText");
let wpmContainer = document.getElementById("wpmContainer");
let cpmContainer = document.getElementById("cpmContainer");
let wpmContent = document.getElementById("wpmContent");
let cpmContent = document.getElementById("cpmContent");
let inputText = document.getElementById("inputText");
let restartButton = document.getElementById("restart");

let timeElapsed = 0;
let timeLeft = TIMER;
let total_errors = 0;
let errors = 0;
let charactersTyped = 0;
let textIndex = 0;
let timer = null;
let dummyText = "";

timerContainer.innerHTML = timeLeft + "s";
wpmContainer.style.display = "none";
cpmContainer.style.display = "none";
restartButton.style.display = "none";

const timerFunction = () => {
    if (timeLeft > 0) {
        timeLeft--;
        timeElapsed++;
        timerContainer.innerHTML = timeLeft + "s";
    } else {
        //        alert("Times up");
        stopGame();
        return;

    }
};

const resetValues = () => {
    timeLeft = TIMER;
    timeElapsed = 0;
    inputText.value = "";
    errorContainer.innerHTML = 0;
    accuracyContainer.innerHTML = 100;

    wpmContainer.style.display = "none";
    cpmContainer.style.display = "none";
    restartButton.style.display = "none";
    inputText.readOnly = false;
    errors = 0;
    total_errors = 0;
    charactersTyped = 0;
    textIndex = 0;
    dummyTextContainer.innerHTML = "Click on the area below to start the game";
}

const startGame = () => {
    resetValues();
    updateDummyText();
    clearInterval(timer);
    timer = setInterval(timerFunction, 1000)

}

const updateDummyText = () => {
    dummyTextContainer.innerHTML = null;
    dummyText = dummyTextArray[textIndex];
    dummyText.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        dummyTextContainer.appendChild(charSpan);
    })
    if (textIndex < dummyTextArray.length - 1) {
        textIndex++;
    } else {
        textIndex = 0;
    }
}

const validateInputText = () => {
    charactersTyped++;
    errors = 0;
    let inputCharArray = inputText.value.split("");
    let dummyTextSpanArray = dummyTextContainer.querySelectorAll('span');
    dummyTextSpanArray.forEach((char, index) => {
        let inputChar = inputCharArray[index];
        if (inputChar == null || inputChar == "") {
            char.classList.remove('correctChar');
            char.classList.remove('incorrectChar');
        } else if (inputChar == char.innerHTML) {
            char.classList.add('correctChar');
            char.classList.remove('incorrectChar');
        } else {
            char.classList.add('incorrectChar');
            char.classList.remove('correctChar');
            errors++;
        }

    });
    errorContainer.innerHTML = total_errors + errors;
    let correctCharacters = (charactersTyped - (total_errors + errors));
    let accuracy = ((correctCharacters / charactersTyped) * 100);
    accuracyContainer.innerHTML = Math.round(accuracy);

    if (inputText.value.length == dummyText.length) {
        updateDummyText();

        total_errors += errors;

        inputText.value = "";
    }
}

const wordCounter = () => {

    let wordCount = Math.round((((charactersTyped / 5) / timeElapsed) * 60));
    wpmContent.innerHTML = wordCount;

}

const characterCounter = () => {
    let charCount = Math.round(((charactersTyped / timeElapsed) * 60));
    cpmContent.innerHTML = charCount;

}

const stopGame = () => {
    clearInterval(timer);
    wordCounter();
    characterCounter();
    wpmContainer.style.display = "";
    cpmContainer.style.display = "";
    restartButton.style.display = "";
    inputText.readOnly = true;
    inputText.innerHTML = "Click on the area below to start the game";

}

inputText.addEventListener("focus", startGame);
inputText.addEventListener("input", validateInputText);
restartButton.addEventListener("click", resetValues);