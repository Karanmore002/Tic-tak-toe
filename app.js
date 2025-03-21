let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");

let turnO = true;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

let winnerMessage = document.querySelector("#winner-message");
let winnerText = document.querySelector("#winner-text");
let winnerImg = document.querySelector("#winner-img");

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.style.pointerEvents = "none";
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            disableBoxes();
            return;
        }
    }

    checkDraw();
};

const showWinner = (winner) => {
    winnerMessage.style.display = "block";
    winnerText.innerText = `🎉 Congratulations! Player ${winner} wins! 🎉`;

    if (winner === "X") {
        winnerImg.src = "https://cdn-icons-png.flaticon.com/512/1055/1055646.png"; // Example X image URL
    } else if (winner === "O") {
        winnerImg.src = "https://cdn-icons-png.flaticon.com/512/1055/1055644.png"; // Example O image URL
    }
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    });
};

const checkDraw = () => {
    let allFilled = true;

    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        winnerMessage.style.display = "block";
        winnerText.innerText = "It's a draw!";
        winnerImg.src = "https://cdn-icons-png.flaticon.com/512/535/535239.png"; // Example draw image
    }
};

resetbtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "auto";
    });

    turnO = true;
    winnerMessage.style.display = "none";
});
