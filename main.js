let input = document.querySelector("#input-list");
let inputForm = document.querySelector(".input-form");

let ul = document.querySelector(".list-items");
let li = document.querySelector(".item");

let LOCAL_STORAGE_KEY = "LOCAL.TODO";

// Gets the todo list from the local storage if any
let localTodo = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
let myTodos = [];
if (localTodo) {
    myTodos = localTodo;
}

const deleteTodo = e => {
    // target the image and get its parent element and its text
    let deleteItem = e.target.parentNode;
    let text = deleteItem.innerText;
    // console.log(text);

    // search through the todo list to get the index of item to be removed
    let removeIndex = myTodos.indexOf(text);
    // console.log(removeIndex);

    // remove the item
    myTodos.splice(removeIndex, 1);
    // update the local storage with the new list
    setLocalStorage(myTodos);
    // delete the html element
    deleteItem.parentNode.removeChild(deleteItem);
};

inputForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // removes spaces from the input task
    // this enables to not take any empty spaces input
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
    // create task list
    let li = document.createElement("li");
    li.textContent = text;
    li.classList.add("item");
    // create delete icon
    let image = document.createElement("img");
    image.setAttribute("src", "Assets/multiply.svg");
    image.setAttribute("onclick", "deleteTodo(event)");
    image.classList.add("delete");
    // append the img element to the li tag
    appendChildren(li, image);
    return li;
};

// appends an element to other
const appendChildren = (parent, children) => {
    parent.appendChild(children);
};

// renders the list from the local storage on refresh
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
