import {
    changeWhoMove, changeResults, getItemFromLocalStorage, setItemIfNotValue, setItem
    , KeysFromLocalStorage} from "./export.js"

function whoFirstMove() {
    let user1 = KeysFromLocalStorage.user1, user2 = KeysFromLocalStorage.user2;
    setItemIfNotValue(user1, user1);
    setItemIfNotValue(user2, user2);
    changeWhoMove(localStorage.getItem(user1));
}
addEventListener("load", whoFirstMove);

function getNameByKey(key) {
    let defaultName = key;
    let name = getItemFromLocalStorage(key,defaultName);
    let user = document.left[key];
    user.value = name;
}
addEventListener("load", () => {
    getNameByKey(KeysFromLocalStorage.user1);
    getNameByKey(KeysFromLocalStorage.user2);
});

function getColorByKey(key) {
    let color = localStorage.getItem(key);
    let user = document.left[key];

    if (color) 
        user.value = color;
    else 
        setItem(key,user.value)
}
addEventListener("load", () => {
    getColorByKey(KeysFromLocalStorage.color1);
    getColorByKey(KeysFromLocalStorage.color2);
});

function getSize() {
    let size = getItemFromLocalStorage(KeysFromLocalStorage.size, "3");

    let options = document.right.sizes;
    for (let option of options) {
        if (option.value === size) {
            option.selected = true;
        }
    }
}
addEventListener("load", getSize);

addEventListener("load", changeResults);


