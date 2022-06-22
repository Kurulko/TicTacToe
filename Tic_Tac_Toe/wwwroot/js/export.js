export class KeysFromLocalStorage {
    constructor() {}
    static #user1 = "user1";
    static get user1() {
        return this.#user1;
    }
    static #user2 = "user2";
    static get user2() {
        return this.#user2;
    }

    static #color1 = "color1";
    static get color1() {
        return this.#color1;
    }
    static #color2 = "color2";
    static get color2() {
        return this.#color2;
    }

    static #resultsOfUser1 = "resultsOfUser1";
    static get resultsOfUser1() {
        return this.#resultsOfUser1;
    }
    static #resultsOfUser2 = "resultsOfUser2";
    static get resultsOfUser2() {
        return this.#resultsOfUser2;
    }

    static #size = "size";
    static get size() {
        return this.#size;
    }
}

export function getItemFromLocalStorage(key, defaultValue) {
    return localStorage.getItem(key) ?? defaultValue;
}

export function setItemIfNotValue(key, value) {
    if (!localStorage.getItem(key))
        localStorage.setItem(key, value);
}

export function setItem(key, value) {
    localStorage.setItem(key, value);
}

export function changeWhoMove(userName) {
    let user = document.getElementById("whoMove");
    user.innerText = "Ходит игрок: " + userName;
}

export function changeUserName(id) {
    let user = document.getElementById(id);
    user.innerText = getItemFromLocalStorage(id, id);
}
export function changeResultsOfUser(id) {
    let resultsOfUser = document.getElementById(id);
    resultsOfUser.innerText = getItemFromLocalStorage(id, "0");
}
export function changeResults() {
    let user1 = "user1", user2 = "user2";
    changeUserName(user1);
    changeUserName(user2);

    let resultsOfUser1 = "resultsOfUser1", resultsOfUser2 = "resultsOfUser2";
    changeResultsOfUser(resultsOfUser1);
    changeResultsOfUser(resultsOfUser2);
}

export function removeAllChild(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
