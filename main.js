const element = {
  data_date: document.querySelectorAll('[data_date]'),
  todo_form: document.querySelector('[todo_form]'),
  todo_input: document.querySelector('[todo_input]'),
  todo_list: document.querySelector('[todo_list]'),
  data_progress: document.querySelector('[data_progress]'),
  data_cancel_edit : document.querySelector('[data_cancel_edit]'),
  edit_form: document.querySelector('[edit_form]'),
  edit_input: document.querySelector('[edit_input]'),
  data_search_input: document.querySelector('[data_search_input]'),
  erase_btn: document.querySelector('[erase_btn]'),
  data_filter: document.querySelectorAll('[data_filter]'),
}


let progress = 0;
let oldInputValue;
let saveProgress = Number(localStorage.getItem('progressBarr'))

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

  function saveTodo (text, done = 0, save = 1) {

    const todo = createElement('div')
    todo.classList.add('todo');
    todo.setAttribute('data_todo', '')
    // todo.classList.add('done');

    const todoTitle = createElement('h3')
    todoTitle.innerText += text

    todo.appendChild(todoTitle)

    const btnFinish = createElement('button')
    btnFinish.classList.add('finish_todo');
    btnFinish.setAttribute('title', 'realizar tarefa');
    btnFinish.setAttribute('data_finish_todo', '');
    
    const imgFinish = createElement('img')
    imgFinish.setAttribute('src', './assets/img/checked.png');
    imgFinish.setAttribute('alt', 'botão finalizado');

    btnFinish.appendChild(imgFinish)
    // btnFinish.innerHTML = '<img src="img/checked.png" alt="">'

    todo.appendChild(btnFinish)

    const btnEdit = createElement('button')
    btnEdit.classList.add('edit_todo');
    btnEdit.innerHTML = '<img src="assets/img/lapis.png" alt="">'
    btnEdit.setAttribute('title', 'Editar tarefa')
    btnEdit.setAttribute('data_edit_todo', '');

    todo.appendChild(btnEdit)

    const btnRemove = createElement('button')
    btnRemove.classList.add('remove_todo');
    btnRemove.innerHTML = '<img src="assets/img/lixeira.png" alt="">'
    btnRemove.setAttribute('title', 'excluir tarefa')
    btnRemove.setAttribute('data_remove_todo', '');

    todo.appendChild(btnRemove)

    if(done) {
      todo.classList.add('done')
    } 
    if(save) {
      saveTodoLS({text, done})
    }

    element.todo_list.appendChild(todo)
    element.todo_input.value = '';
    element.todo_input.focus();

  }

  function updateProgressBarr () {
    element.data_progress.style.width = progress + '%'
    localStorage.setItem('progressBarr', progress)

  }

  if(saveProgress) {
    progress = saveProgress
    updateProgressBarr()
  }

  function increaseProgressBarr () {
    progress += 5

    if(progress > 100) {
      progress = 100
    }

    updateProgressBarr()
  }

  function decrementProgressBarr () {
    progress -= 5

    if(progress < 0) {
      progress = 0
    }

    updateProgressBarr()
  }

  function toggleForms () {
    element.edit_form.classList.toggle('hide');
    element.todo_form.classList.toggle('hide');
    element.todo_list.classList.toggle('hide');
  }

  function updateTodo (text) {
    const todos = document.querySelectorAll('[data_todo]')

    todos.forEach((item) => {
      let todoTitle = item.querySelector('h3')

      if(todoTitle.innerText === oldInputValue)
        todoTitle.innerText = text
        updateTodoLS(oldInputValue, text)
    })
  }

  function getSearchTodos (search) {
    const todos = document.querySelectorAll('[data_todo]')

    todos.forEach((item) => {
      let todoTitle = item.querySelector('h3').innerText.toLowerCase()
      const normalizedSearch = search.toLowerCase()
      item.style.display = 'flex'

      if(!todoTitle.includes(normalizedSearch)) {
        item.style.display = 'none'
      }

    })
  }

// LOCALSTORAGE

  function getTodosLS () {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos;
  }

  function saveTodoLS (todo) {
    const todos = getTodosLS()

    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function loadTodosLS () {
    const todos = getTodosLS()

    todos.forEach((todo) => {
      saveTodo(todo.text, todo.done, 0)
    })
  }

  const updateTodoStatusLS = (todoText) => {
    const todos = getTodosLS()

    todos.map((todo) => todo.text === todoText 
      ? todo.done = !todo.done
      : null
      )
      localStorage.setItem('todos', JSON.stringify(todos))
  }

  const removeTodoLS = (todoText) => {
    const todos = getTodosLS()
    const filterTodos = todos.filter((todo) => todo.text !== todoText)
    localStorage.setItem('todos', JSON.stringify(filterTodos))
  }

  const updateTodoLS = (todoOldText, todoNewText) => {
    const todos = getTodosLS()

    todos.map((todo) => todo.text === todoOldText 
      ? todo.text = todoNewText
      : null
    )
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  loadTodosLS()

// EVENTOS

element.todo_form.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputValue = element.todo_input.value;

  if(inputValue && inputValue.length <= 60) {
    saveTodo(inputValue)
  } else {
    alert('Campo vazio ou quantidade de caracteres excedido')
  }

})

document.addEventListener('click', (event) => {

  const targetElement = event.target;
  const parentElement = targetElement.closest('div')
  let todoTitle;

  if(parentElement && parentElement.querySelector('h3')) {
    todoTitle = parentElement.querySelector('h3').innerText

  } 

  if(targetElement.getAttribute('data_finish_todo') === '') {
    parentElement.classList.toggle('done')

    updateTodoStatusLS(todoTitle)
    if(parentElement.classList.contains('done')) {
      increaseProgressBarr()
    } else {
      decrementProgressBarr()
    }
  } 

  if(targetElement.getAttribute('data_edit_todo') === '') {
    toggleForms()

    element.edit_input.value = todoTitle
    oldInputValue = todoTitle
  }

  if(targetElement.getAttribute('data_remove_todo') === '') {
    const removeConfirm = window.confirm('Tem certeza que deseja excluir essa tarefa?')

    if(removeConfirm) {
      parentElement.remove()
      decrementProgressBarr()
      removeTodoLS(todoTitle)
    }
  }

})

element.data_cancel_edit.addEventListener('click', (event) => {
  event.preventDefault()

  toggleForms()
})

element.edit_form.addEventListener('submit', (event) => {
  event.preventDefault()

  const editInputValue = element.edit_input.value

  if(editInputValue) {
    updateTodo(editInputValue)
  }
  toggleForms()
})

element.data_search_input.addEventListener('keyup', (event) => {

  const search = event.target.value

  getSearchTodos(search)
})

element.erase_btn.addEventListener('click', (event) => {
  event.preventDefault()

  element.data_search_input.value = ''

  element.data_search_input.dispatchEvent(new Event('keyup'))
})

element.data_filter.forEach((elemento) => {

  elemento.addEventListener('click', (event) => {
    event.preventDefault()
    const todos = document.querySelectorAll('[data_todo]')

    switch (elemento.getAttribute('data_filter')) {
      case 'all':
          todos.forEach((todo) => {
            todo.style.display = 'flex'
          })
        break;

      case 'finish':
          todos.forEach((todo) => {

            todo.classList.contains('done') 
              ? todo.style.display = 'flex' 
              : todo.style.display = 'none'
          })
        break;

      case 'pending':
          todos.forEach((todo) => {

            !todo.classList.contains('done')
              ? todo.style.display = 'flex' 
              : todo.style.display = 'none'
          })
        break;

      default:
        break;
    }
  })

})