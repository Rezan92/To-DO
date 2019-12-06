const clear = document.querySelector('.clear')
const dateElement = document.getElementById('date')
const list = document.getElementById('list')
const input = document.getElementById('item')
const addBtn = document.getElementById('add_btn')

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = 'lineThrough';

function addToDo(toDo, id, done, trash) {

  if (trash) { return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINK = done ? LINE_THROUGH : "";

  const text = `<li class='item'>
    <i class="fa ${DONE}" job="complete"  id="${id}"></i>
    <p class="text ${LINK}">${toDo}</p>
    <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
  </li>`
  const position = "beforeend";
  list.insertAdjacentHTML(position, text);
}

let LIST = [];
let id = 0;
addBtn.addEventListener('click', function () {
  const toDo = input.value;
  if (toDo) {
    addToDo(toDo, id, false, false);
    LIST.push(
      {
        name: toDo,
        id: id,
        done: false,
        trash: false
      }
    )
    localStorage.setItem("TODO", JSON.stringify(LIST));
  }
  input.value = "";
  id++;
  localStorage.setItem("TODO", JSON.stringify(LIST));
})
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push(
        {
          name: toDo,
          id: id,
          done: false,
          trash: false
        }
      )
      localStorage.setItem("TODO", JSON.stringify(LIST));
    }
    input.value = "";
    id++;
    localStorage.setItem("TODO", JSON.stringify(LIST));
  }
})

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
  localStorage.setItem("TODO", JSON.stringify(LIST));
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)
  LIST[element.id].trash = true;
  localStorage.setItem("TODO", JSON.stringify(LIST));
}

list.addEventListener('click', function (event) {
  const element = event.target;
  if (element.attributes.job) {
    if (element.attributes.job.value == "complete") {
      completeToDo(element)
    } else if (element.attributes.job.value == "delete") {
      removeToDo(element)
    }
  }
})

function loadToDo(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash)
  })
}

let data = localStorage.getItem('TODO');
if (data) {
  LIST = JSON.parse(data);
  loadToDo(LIST);
  id = LIST.length;
} else {
  LIST = [];
  id = 0;
}

clear.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
})
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString('ar-Sy', options);