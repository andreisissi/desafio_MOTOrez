const element = {
  data_date: document.querySelector('[data_date]'),
  data_year: document.querySelector('[data_year]'),
  data_week: document.querySelector('[data_week]'),
}

let dt = new Date();
let week = dt.getDay();
let day = dt.getDate();
let month = dt.getMonth();
let year = dt.getFullYear();


let arrayMonth = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
let arrayWeek = new Array('Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado');

element.data_date.innerHTML = `${day} de ${arrayMonth[month]}`
element.data_year.innerHTML = year;
element.data_week.innerHTML = `${arrayWeek[week]}`

let input = document.querySelector('.input_message');
let list = document.querySelector('.ul_list');
let button = document.querySelector('.btn_add_task');
let taskDoneBtn = document.querySelector('.finish_btn');
let taskPendingbtn = document.querySelector('.pending_btn');
let search = document.querySelector('.search');

let toDo = [];

function inputTask () {
  const inputValue = input.value.trim();

  if(inputValue === ''){
    input.focus()
    return
  }

  toDo.push({
    task: input.value,
    done: false,
  })

  input.value = ''

  saveLi()
}

function saveLi () {

  let newList = '';

    toDo.forEach((item, index) => {

    newList = `<li class="task ${item.done && "done"}" >
                <img src="./img/checked.png" alt="" onclick="completeTask(${index})">
                  <p>${item.task}</p>
                <img src="./img/lixeira.png" alt="" onclick="deleteItem(${index})">
               </li>` + newList
  
  })

  list.innerHTML = newList;
  localStorage.setItem('item', JSON.stringify(toDo))
}

function completeTask (index) {
  toDo[index].done = !toDo[index].done

  saveLi()
}

function deleteItem (index) {
  if(confirm("Tem certeza que deseja excluir essa tarefa?")){
  toDo.splice(index, 1)
  
  saveLi()
  }
}

function refresh () {
  const indexLocalStorage = localStorage.getItem('item')

  if(indexLocalStorage){
    toDo = JSON.parse(indexLocalStorage)
  }

  saveLi()
}

refresh()
button.addEventListener('click', inputTask)