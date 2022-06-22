import { removeAllChild, changeResultsOfUser, changeWhoMove, setItem, KeysFromLocalStorage } from "./export.js"

class Gamer {
    constructor(size, keyName, keyColor) {
        this.moves = [];
        this.results = [];
        this.size = size;
        this.sumOfButtons = size ** 2;
        this.name = localStorage.getItem(keyName);
        this.color = localStorage.getItem(keyColor);
    }

    #hasElements(between, increment) {
        let count = 0, elements = [];
        let [first, last] = between;
        for (let i = first; i <= last; i += increment) {
            if (this.moves.includes(i)) {
                count++;
                elements.push(i);
            }
        }
        let isWin = count === this.size;
        if (isWin)
            this.results.push(...elements);
        return isWin;
    }

    #isVerticalWin() {
        let end = this.size;
        for (let i = 1; i <= end; i++) {
            if (this.#hasElements([i, (this.size - 1) * this.size + i], this.size))
                return true;
        }
        return false;
    }
    #isHorizontalWin() {
        let end = this.sumOfButtons - this.size + 1;
        for (let i = 1; i <= end; i += this.size) {
            if (this.#hasElements([i, i + this.size - 1], 1))
                return true;
        }
        return false;
    }
    #isWinOnDiagonal() {
        return this.#hasElements([1, this.sumOfButtons], this.size + 1)
            || this.#hasElements([this.size, this.sumOfButtons - this.size + 1], this.size - 1);
    }
    isWin() {
        if (this.moves.length >= this.size)
            if (this.#isHorizontalWin() || this.#isVerticalWin() || this.#isWinOnDiagonal())
                return true;
        return false;
    }
}


class Moves {
    constructor(size) {
        this.size = size;
        this.countOfMoves = 0;
        this.isFirstGamerMove = true;
        this.sumOfButtons = this.size ** 2;

        this.firstGamer = new Gamer(this.size, KeysFromLocalStorage.user1, KeysFromLocalStorage.color1);
        this.secondGamer = new Gamer(this.size, KeysFromLocalStorage.user2, KeysFromLocalStorage.color2);
    }

    #getNowUser() {
        return this.isFirstGamerMove ? this.firstGamer : this.secondGamer;
    }

    #isEnd(gamer) {
        let isWin = gamer.isWin(), isDraw = this.countOfMoves === this.sumOfButtons;
        if (isWin || isDraw) {
            alert(isWin ? `${gamer.name} win!` : "No one win!");

            let places = document.getElementsByClassName("place");
            for (let place of places)
                place.disabled = true;

            let whoMove = document.getElementById("whoMove");
            whoMove.innerText = "Конец игры!";

            if (isWin) {
                let id = !this.isFirstGamerMove ? KeysFromLocalStorage.resultsOfUser1
                    : KeysFromLocalStorage.resultsOfUser2;
                let resultsOfUser = document.getElementById(id);
                let result = parseInt(resultsOfUser.innerText) + 1;
                setItem(id, result);
                changeResultsOfUser(id);
            }
        }
    }
    #isUserWin(gamer) {
        this.#isEnd(gamer);
        let results = gamer.results;
        if (results.length !== 0) {
            let places = document.getElementsByClassName("place");
            for (let place of places) {
                let intName = parseInt(place.name);
                if (results.includes(intName))
                    place.style.borderColor = gamer.color;
            }
        }

    }
    isSomeoneWin(e) {
        let numberOfButtons = parseInt(e.target.name);
        let gamer = !this.isFirstGamerMove ? "firstGamer" : "secondGamer";

        this[gamer].moves.push(numberOfButtons);
        this.#isUserWin(this[gamer]);
    }

    oneMove(e) {
        let target = e.target;

        let i = document.createElement("i");
        i.classList.add("fa");
        i.classList.add(this.isFirstGamerMove ? "fa-close" : "fa-circle");
        i.style.fontSize = "30px";
        i.style.color = this.#getNowUser().color;
        target.appendChild(i);

        target.disabled = "true";
    }

    whoNextMove() {
        let userName = localStorage.getItem(this.isFirstGamerMove ? KeysFromLocalStorage.user1 :
            KeysFromLocalStorage.user2);
        changeWhoMove(userName);
    }

    freePlaces(e) {
        let place = e.target;
        let borderColor = this.#getNowUser().color;
        if (!place.getAttribute("disabled")) 
            place.style.borderColor = borderColor;
    }

    WithoutBorderColor(e) {
        let place = e.target;
        place.style.borderColor = "";
    }

    afterClickPlace(e) {
        this.WithoutBorderColor(e);

        this.countOfMoves++;
        this.isFirstGamerMove = !this.isFirstGamerMove;
    }
}


class TicTakToe extends HTMLElement {
    constructor() {
        super();
        this.start = true;
        this.places = [];

        let key = KeysFromLocalStorage.size;
        let localStorageValue = localStorage.getItem(key);
        if (localStorageValue)
            this.size = parseInt(localStorageValue);
        else if (this.hasAttribute(key))
            this.size = parseInt(this.getAttribute(key));
        else
            this.size = 3;
    }

    #createElement(size) {
        let tic_tac_toe = document.createElement("table");

        for (let i = 1; i < size ** 2; i += size) {
            let tr = document.createElement("tr");

            for (let j = i; j < i + size; j++) {
                let td = document.createElement("td");

                let button = document.createElement("button");
                button.classList.add("place");
                button.setAttribute("name", j);

                this.places.push(button);

                td.appendChild(button);
                tr.appendChild(td);
            }

            tic_tac_toe.appendChild(tr);
        }
        this.appendChild(tic_tac_toe);
    }

    #addPlacesListener(moves) {
        for (let place of this.places) {
            place.addEventListener("click", moves.oneMove.bind(moves));
            place.addEventListener("mouseover", moves.freePlaces.bind(moves));
            place.addEventListener("mouseout", moves.WithoutBorderColor.bind(moves));
            place.addEventListener("click", moves.afterClickPlace.bind(moves));
            place.addEventListener("click", moves.whoNextMove.bind(moves));
            place.addEventListener("click", moves.isSomeoneWin.bind(moves));
        }
    }

    #addColorOfUserListener(nameColor, firstGamer, moves) {
        let color = document.left[nameColor];
        color.addEventListener("change", e => {
            let color = e.target.value;
            setItem(nameColor, color);

            moves[firstGamer].color = color;

            let movesOfUser = moves[firstGamer].moves;
            for (let place of this.places) {
                let intName = parseInt(place.name);
                if (movesOfUser.includes(intName)) {
                    let i = place.firstChild;
                    if (i)
                        i.style.color = color;
                }
            }
        });
    }
    #addColorsListener(moves) {
        this.#addColorOfUserListener(KeysFromLocalStorage.color1, "firstGamer", moves)
        this.#addColorOfUserListener(KeysFromLocalStorage.color2, "secondGamer", moves)
    }
    #addListener() {
        let moves = new Moves(parseInt(this.size));
        this.#addPlacesListener(moves);
        this.#addColorsListener(moves);
    }

    static get observedAttributes() { return ["size"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        let key = "size";
        if (name === key) {
            removeAllChild(this);

            if (!this.start) {
                this.size = newValue;
                localStorage.setItem(key, newValue);
            }
            else
                this.start = false;

            this.#createElement(parseInt(this.size));

            this.#addListener();
        }
    }
}

customElements.define("tic-tactoe", TicTakToe);

