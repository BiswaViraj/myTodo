let input = document.querySelector("#input-list");
let inputForm = document.querySelector(".input-form");

let ul = document.querySelector(".list-items");
let li = document.querySelector(".item");

let LOCAL_STORAGE_KEY = "LOCAL.TODO";

let localTodo = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
let myTodos = [];
if (localTodo) {
    myTodos = localTodo;
}

const deleteTodo = e => {
    let deleteItem = e.target.parentNode;
    let text = deleteItem.innerText;
    // console.log(text);
    let removeIndex = myTodos.indexOf(text);
    // console.log(removeIndex);
    myTodos.splice(removeIndex, 1);
    setLocalStorage(myTodos);
    deleteItem.parentNode.removeChild(deleteItem);
};

inputForm.addEventListener("submit", function(e) {
    e.preventDefault();
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
    // console.log(data);

    window.localStorage.setItem(LOCAL_STORAGE_KEY, data);
};
const createListItem = text => {
    let li = document.createElement("li");
    li.textContent = text;
    li.classList.add("item");
    let image = document.createElement("img");
    image.setAttribute("src", "Assets/multiply.svg");
    image.setAttribute("onclick", "deleteTodo(event)");
    image.classList.add("delete");
    appendChildren(li, image);
    return li;
};

const appendChildren = (parent, children) => {
    parent.appendChild(children);
};
const render = () => {
    let data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    let parsedData = JSON.parse(data);
    if (parsedData) {
        parsedData.forEach(function(todo) {
            // console.log(`this is my ${todo}`);
            appendChildren(ul, createListItem(todo));
        });
    }
};
window.onload = render();
