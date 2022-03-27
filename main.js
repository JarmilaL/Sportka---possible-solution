// Udělej losování klasické Sportky
// Máš osudí čísel od 1 do 48
// Náhodně z tohoto osudí vyber 7 čísel
// Žádné číslo se nesmí v tahu opakovat
// (je vyjmuté z osudí, takže už ho nemůžeš znovu vylosovat)
// Z každého vylosovaného čísla vygeneruj následující HTML kód:
// <span class="cislo">8</span>
// ... který pak přidej dovnitř prvku <div id="vyherni-cisla">:
let pulledNumbers = [];
let a = 0;
let timeInterval;

function start() {
    clearInterval(timeInterval); //Zrusi interval, pokud byl nejaky nastaveny
    moveToHistory();   
    document.querySelector('#vyherni-cisla').innerHTML = '';
    let numbers = fillNumbers();
    pulledNumbers = pullNumbers(numbers);
    render();
}

// Nahazi koule do osudi.
function fillNumbers() {
    let numbers = [];
    for (let i = 1; i <= 48; i++) {
        numbers.push(i);
    }
    return numbers;
}

// Vytahne sedm nahodnych cisel z osudi.
function pullNumbers(numbers) {
    
    for (let i = 0; i < 7; i++) {
        let random = Math.round(Math.random() * numbers.length);
        let pulled = numbers.splice(random, 1);
        pulledNumbers.push(pulled);
    }

    return pulledNumbers;
}

async function render() {
    timeInterval = setInterval(addNumber, 1000);
}

function addNumber() {
    if (a < pulledNumbers.length) {
        document.querySelector('#vyherni-cisla').innerHTML += `<span class="cislo">${pulledNumbers[a]}</span>`;
        a++;
    } else {
        return;
    } 
}

// Presune do historie sadu cisel z minuleho losovani.
function moveToHistory() {
    let historyDiv = document.querySelector('#historie');
    let winningNumbers = document.querySelector('#vyherni-cisla');

    historyDiv.innerHTML = `<div>${winningNumbers.innerHTML}</div>` + historyDiv.innerHTML;  
}

document.querySelector('#losuj').addEventListener('click', start);

