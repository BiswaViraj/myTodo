let input = document.querySelector("#input-list");
let inputForm = document.querySelector(".input-form");

let ul = document.querySelector(".list-items");

let key = "test";

let localTodo = JSON.parse(window.localStorage.getItem(key))
let myTodos = [];
if(localTodo){
    myTodos = localTodo;
}


inputForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // console.log(input.value);
    let value = input.value.trim();
    if (value) {
        myTodos.push(input.value);
        appendChildren(ul, createListItem(input.value));
        input.value = "";
        setLocalStorage(myTodos);
    }
});
const setLocalStorage = todo => {
    let data = JSON.stringify(todo);
    console.log(data);

    window.localStorage.setItem(key, data);
};
const createListItem = text => {
    let li = document.createElement("li");
    li.textContent = text;
    li.classList.add("item");
    return li;
};

const appendChildren = (parent, children) => {
    parent.appendChild(children);
};
const render = () => {
    let data = window.localStorage.getItem(key);
    let parsedData = JSON.parse(data);
    if (parsedData) {
        parsedData.forEach(function(todo) {
            // console.log(`this is my ${todo}`);
            appendChildren(ul, createListItem(todo));
        });
    }
};
window.onload = render();
