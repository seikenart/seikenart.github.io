const slot_symbols = ["🍒", "🍋", "🍊", "🍇", "🍉", "🍌", "🍎", "🍍", "🍓", "🍑"];

const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const spinButton = document.getElementById("spinButton");
const scoreDisplay = document.getElementById("score");

let score = 100;

spinButton.addEventListener("click", spin);

function spin() {
    if (score < 10) {
        alert("You don't have enough score to spin!");
        return;
    }

    score -= 10;
    updateScore();

    const spins = [spinSlot(slot1), spinSlot(slot2), spinSlot(slot3)];
    Promise.all(spins)
        .then(() => {
            const symbolsOnSlots = [slot1.innerText, slot2.innerText, slot3.innerText];
            const result = checkResult(symbolsOnSlots);
            if (result > 0) {
                score += result * 10;
                updateScore();
                alert(`You won ${result * 10} points!`);
            }
        });
}

function spinSlot(slot) {
    return new Promise(resolve => {
        const randomIndex = Math.floor(Math.random() * slot_symbols.length);
        const symbol = slot_symbols[randomIndex];
        slot.innerText = symbol;

        const spins = 10 + Math.floor(Math.random() * 10);
        const interval = setInterval(() => {
            slot.innerText = slot_symbols[Math.floor(Math.random() * slot_symbols.length)];
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            slot.innerText = symbol;
            resolve();
        }, spins * 100);
    });
}

function checkResult(symbolsOnSlots) {
    const uniqueSymbols = new Set(symbolsOnSlots);
    if (uniqueSymbols.size === 1) {
        return 10;
    } else if (symbolsOnSlots[0] === symbolsOnSlots[1] || symbolsOnSlots[0] === symbolsOnSlots[2] || symbolsOnSlots[1] === symbolsOnSlots[2]) {
        return 5;
    } else {
        return 0;
    }
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}