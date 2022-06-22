import { changeWhoMove, changeUserName, setItem, changeResultsOfUser, KeysFromLocalStorage } from "./export.js"

function newWhoMove(oldValue, newValue) {
    let user = document.getElementById("whoMove");
    let innerText = user.innerText;
    let endGame = "Конец игры!";
    if (innerText !== endGame) {
        let textBeforeName = "Ходит игрок: ";
        let name = innerText.replace(textBeforeName, "");
        if (name === oldValue) {
            user.innerText = textBeforeName + newValue;
        }
    }
}
function saveName(user, key) {
    user.addEventListener("change", (e) => {
        let oldValue = localStorage.getItem(key);
        let newValue = e.target.value;
        setItem(key, newValue);
        changeUserName(key);
        newWhoMove(oldValue, newValue);
    });
}

let user1 = document.left.user1;
saveName(user1, KeysFromLocalStorage.user1);

let user2 = document.left.user2;
saveName(user2, KeysFromLocalStorage.user2);



function sizeOfTable(size) {
    let tic_tac_toe = document.getElementById("tic_tac_toe");
    tic_tac_toe.setAttribute("size", size);
}

let sizes = document.right.sizes;
let func = (e) => {
    let select = e.target;
    let size = parseInt(select[select.selectedIndex].value);
    sizeOfTable(size);
    changeWhoMove(localStorage.getItem(KeysFromLocalStorage.user1));
    setItem(KeysFromLocalStorage.size, size);
};
sizes.addEventListener("change", func);

let reload = document.getElementById("reload");
reload.addEventListener("click", e => {
    let target = e.target;

    let ticTacToe = document.getElementById("tic_tac_toe");
    let parent = target.parentElement;
    parent.removeChild(ticTacToe);

    let newTicTacToe = document.createElement("tic-tactoe");
    let value = localStorage.getItem(KeysFromLocalStorage.size);
    newTicTacToe.setAttribute("size", value);
    newTicTacToe.id = "tic_tac_toe";

    parent.insertAdjacentElement("afterbegin", newTicTacToe);

    changeWhoMove(localStorage.getItem(KeysFromLocalStorage.user1));
});

let restart = document.getElementById("restart");
restart.addEventListener("click", () => {
    let defaultValue = 0;

    setItem(KeysFromLocalStorage.resultsOfUser1, defaultValue);
    changeResultsOfUser(KeysFromLocalStorage.resultsOfUser1);

    setItem(KeysFromLocalStorage.resultsOfUser2, defaultValue);
    changeResultsOfUser(KeysFromLocalStorage.resultsOfUser2);
});

