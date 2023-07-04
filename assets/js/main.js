const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const input = $("input");
const button = $("button");
const ul = $("ul");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

const render = () => {
  const html = todos
    .map(
      (todo, idx) =>
        `<li onclick="addLine(${idx})">
            <span class="${todo.completed ? "through" : ""}">${
          todo.title
        }</span>
            <i class="fas fa-trash" onclick="removeItem(${idx})"></i>
        </li>`
    )
    .join("");

  ul.innerHTML = html;

  input.style.borderRadius = "1rem 1rem 0 0";

  if (ul.children === []) {
    input.style.borderRadius = "1rem";
  }
};

render();

// UI => Action => Data => Update UI
const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));

  render();
};

const addItem = () => {
    if (input.value !== "") {
      const inputValue = input.value;
  
      const newTodo = {
        title: inputValue,
        completed: false,
      };
  
      todos.push(newTodo);
  
      save();
  
      input.value = "";
      input.focus()
    }
  }

button.addEventListener("click", addItem);
input.addEventListener("keyup", (e) => {
  if(e.keyCode === 13) addItem()
});

function removeItem(idx) {
  todos.splice(idx, 1);

  save();
}

function addLine(idx) {
  todos[idx].completed = !todos[idx].completed;

  save();
}
