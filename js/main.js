 function randomId(){return Math.round(Math.random() * 999999)}
const themes = {
  light: {
    '--bg': '#deb887',
    '--color-text': '#010101',
    '--del-btn': '#b10000',
    '--body-bg': '#f2f2f2',
    '--icon-color-light': '#deb887',
    '--icon-color-dark': '#010101',
  },
  dark: {
    '--bg': '#111111',
    '--color-text': '#ffffff',
    '--del-btn': '#ffbb00',
    '--body-bg': '#232323',
    '--icon-color-light': '#ffffff',
    '--icon-color-dark': '#010101',
  },
  
}
// elements
const contentItems = document.querySelector('.content-items');
const taskForm = document.taskForm;
const titleInput = taskForm.elements.title;
const contentArea = taskForm.elements.content;
const btnTheme = document.querySelector('.navbar-btn');
// events
taskForm.addEventListener('submit', onFormSubmit)
btnTheme.addEventListener('click', selectTheme)
// document.addEventListener('DOMContentLoaded', loadCards)

loadCards()
function loadCards(){
  let tasks
  if(localStorage.getItem('tasks') == null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.reverse()
  tasks.forEach(function(task, key){
    const card = createCardTemplate(task)
    contentItems.append(card)
  })
}
function createCardTemplate({id, title, content}){
  const item = document.createElement('div')
  item.classList.add('item')
  item.setAttribute('item-id', id)
  const itemText = document.createElement('div')
  itemText.classList.add('item__text')
  const itemDel = document.createElement('a')
  itemDel.classList.add('item-del', 'icon-trash')
  itemDel.innerHTML = 'Удалить'
  itemDel.href = '#!'
  const h3 = document.createElement('h3')
  h3.innerHTML = title
  const p = document.createElement('p')
  p.innerHTML = content
  itemText.append(h3, p)
  item.append(itemText, itemDel)
  return item
}
function onFormSubmit(event){
  event.preventDefault()
  const valueInp = titleInput.value
  const valueArea = contentArea.value
  if(!valueArea || !valueInp){
    alert('Заполните все поля')
    return
  }
  const newTask = {id: randomId(), title: valueInp, content: valueArea}
  saveInLocalStorage(newTask)
  const card = createCardTemplate(newTask)
  contentItems.insertAdjacentElement('afterbegin',card)
  taskForm.reset();
}
function saveInLocalStorage(obj){
  let tasks
  if(localStorage.getItem('tasks') == null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(obj)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
function selectTheme(){
  if(btnTheme.classList.contains('light')){
    btnTheme.classList.remove('light')
    btnTheme.classList.add('dark')
    btnTheme.setAttribute('data-theme', 'dark')
  }else{
    btnTheme.classList.remove('dark')
    btnTheme.classList.add('light')
    btnTheme.setAttribute('data-theme', 'light')
  }
  const themeAttr = btnTheme.getAttribute('data-theme');
  const themeObj = themes[themeAttr];
  let themeStr = '';
  for(const key in themeObj){
    themeStr += `${key}: ${themeObj[key]}; `
  }
  document.documentElement.style = themeStr
}