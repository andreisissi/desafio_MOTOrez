const element = {
  data_date: document.querySelectorAll('[data_date]'),
  todo_form: document.querySelector('[todo_form]'),
  todo_input: document.querySelector('[todo_input]'),
  todo_list: document.querySelector('[todo_list]'),
}
// console.log(element.todo_list)

// FUNÇÕES

  function systemDate () {

  const date = new Date();

  const getDayWeekString = (day_week) => {
    const days_week_string = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return days_week_string[day_week];
  };

  const getMonthNameString = (number_month) => {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    return months[number_month];
  };

  element.data_date.forEach((data) => {

    if(data.getAttribute('data_date') === 'day_month') {
      data.innerHTML = `${date.getDate()} de ${getMonthNameString(date.getMonth())}`
      return;
    }

    if(data.getAttribute('data_date') === 'year') {
      data.innerHTML = `${date.getFullYear()}`
      return;
    }

    if(data.getAttribute('data_date') === 'week') {
      data.innerHTML = `${getDayWeekString(date.getDay())}`
      return;
    }

  })
};
systemDate()

  function createElement (elementName) {

    return document.createElement(elementName)
  }

  function saveTodo (text) {

    const todo = createElement('div')
    todo.classList.add('todo');
    // todo.classList.add('done');

    const todoTitle = createElement('h3')
    todoTitle.innerText += text

    todo.appendChild(todoTitle)

    const btnFinish = createElement('button')
    btnFinish.classList.add('finish_todo');
    btnFinish.setAttribute('title', 'realizar tarefa')
    
    const imgFinish = createElement('img')
    imgFinish.setAttribute('src', 'img/checked.png');
    imgFinish.setAttribute('alt', 'botão finalizado');

    btnFinish.appendChild(imgFinish)

    // console.log(imgFinish)

    // btnFinish.innerHTML = '<img src="img/checked.png" alt="">'

    todo.appendChild(btnFinish)

    const btnEdit = createElement('button')
    btnEdit.classList.add('edit_todo');
    btnEdit.innerHTML = '<img src="img/lapis.png" alt="">'
    btnEdit.setAttribute('title', 'Editar tarefa')

    todo.appendChild(btnEdit)

    const btnRemove = createElement('button')
    btnRemove.classList.add('remove_todo');
    btnRemove.innerHTML = '<img src="img/lixeira.png" alt="">'
    btnRemove.setAttribute('title', 'excluir tarefa')

    todo.appendChild(btnRemove)

    element.todo_list.appendChild(todo)
    // console.log(todo)
  }

// EVENTOS

element.todo_form.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputValue = element.todo_input.value;

  if(inputValue && inputValue.length <= 60) {
    saveTodo(inputValue)
  } else {
    alert('Campo vazio ou quantidade de caracteres exedido')
  }

})




// let dt = new Date();
// let week = dt.getDay();
// let day = dt.getDate();
// let month = dt.getMonth();
// let year = dt.getFullYear();


// let arrayMonth = new Array('Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
// let arrayWeek = new Array('Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado');

// element.data_date.innerHTML = `${day} de ${arrayMonth[month]}`
// element.data_year.innerHTML = year;
// element.data_week.innerHTML = `${arrayWeek[week]}`



// let input = document.querySelector('.input_message');
// let list = document.querySelector('.ul_list');
// let button = document.querySelector('.btn_add_task');
// let taskDoneBtn = document.querySelector('.finish_btn');
// let taskPendingbtn = document.querySelector('.pending_btn');
// let search = document.querySelector('.search');

// let toDo = [];

// function inputTask () {
//   const inputValue = input.value.trim();

//   if(inputValue === ''){
//     input.focus()
//     return
//   }

//   toDo.push({
//     task: input.value,
//     done: false,
//   })

//   input.value = ''

//   saveLi()
// }

// function saveLi () {

//   let newList = '';

//     toDo.forEach((item, index) => {

//     newList = `<li class="task ${item.done && "done"}" >
//                 <img src="./img/checked.png" alt="" onclick="completeTask(${index})">
//                   <p>${item.task}</p>
//                 <img src="./img/lixeira.png" alt="" onclick="deleteItem(${index})">
//                </li>` + newList
  
//   })

//   list.innerHTML = newList;
//   localStorage.setItem('item', JSON.stringify(toDo))
// }

// function completeTask (index) {
//   toDo[index].done = !toDo[index].done

//   saveLi()
// }

// function deleteItem (index) {
//   if(confirm("Tem certeza que deseja excluir essa tarefa?")){
//   toDo.splice(index, 1)
  
//   saveLi()
//   }
// }

// function refresh () {
//   const indexLocalStorage = localStorage.getItem('item')

//   if(indexLocalStorage){
//     toDo = JSON.parse(indexLocalStorage)
//   }

//   saveLi()
// }

// refresh()
// button.addEventListener('click', inputTask)