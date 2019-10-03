let input = document.querySelector("#input-list");
let inputForm = document.querySelector(".input-form");

let ul = document.querySelector(".list-items");

let myTodos = [];

inputForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // console.log(input.value);
    let value = input.value.trim();
    if (value) {
        myTodos.push(input.value);
        appendChildren(ul, createListItem(input.value));
        input.value = "";
    }
});

const createListItem = text => {
    let li = document.createElement("li");
    li.textContent = text;
    li.classList.add("item");
    return li;
};

const appendChildren = (parent, children) => {
    parent.appendChild(children);
};
const render = todos => {
    myTodos.forEach(function(todo) {
        // console.log(`this is my ${todo}`);
        appendChildren(ul, createListItem(todo));
    });
};
window.onload = render(myTodos);
