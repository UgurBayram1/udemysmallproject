//ui variables
const form = document.querySelector('form');
const input = document.querySelector('#txtTakName');
const dltall = document.querySelector('#btnDeleteAll');
const tasklist = document.querySelector('#task-list');
const dltbutton = document.querySelector('#dlt');
//const items = getItemsLocalStorage();
addFirstlyArray();
eventListeners();

function eventListeners() {
    form.addEventListener('submit', addNewTask);
    tasklist.addEventListener('click', deleteTask);
    dltall.addEventListener('click', deleteTask);
}

function addFirstlyArray() {
    items = getItemsLocalStorage();
    if (items.length === 0) {
        return;
    } else {
        items.forEach(function (item) { //TODO creating new element can be one function 
            addtask(item);
        })
    }

}

function addtask(task) {
    newli = document.createElement('li');
    newli.className = 'list-group-item list-group-item-secondary';
    newli.appendChild(document.createTextNode(task));
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times" id="dlt"></i>';
    newli.appendChild(a);
    tasklist.appendChild(newli);
}

function addNewTask(event) {
    if (input.value.length === 0) {
        alert('please enter task');
        return;
    }
    addtask(input.value);
    setItemsLocalStorage(input.value);
    input.value = '';
    event.preventDefault();
}

function getItemsLocalStorage() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function deleteItem(deleteItem) {
    var k = getItemsLocalStorage();
    k.forEach(function (item, index) {
        if (deleteItem === item) {
            k.splice(index, 1);
        }
    })
    localStorage.setItem('items', JSON.stringify(k));

}

function setItemsLocalStorage(text) {
    items = getItemsLocalStorage();
    items.push(text);
    console.log(items);
    localStorage.setItem('items', JSON.stringify(items));

}

function deleteTask(event) {
    if (event.target.id === 'dlt') {
        event.target.parentElement.parentElement.remove();
        deleteItem(event.target.parentElement.parentElement.textContent);
    } else if (event.target.id === 'btnDeleteAll') {
        var k = confirm('are you sure? you want to delete');
        if (k === true) {
            listForRemove = document.querySelector('#task-list');
            //one method is listForRemove.innerHtml = '';
            //anathor method is listForRemove.childNode.forEach(func(item){item.NodeType === 1 ise item.remove})
            //method3 is listForRemove.children using for method haschild clidren[i].remove(); 
            //method 2 - 3 is so hard way because they all using loops it can be hard for large data 
            listForRemove.innerHTML = '';
            localStorage.removeItem('items');
            event.preventDefault();
        } else {
            alert('no data removed');
            event.preventDefault();
        }
    }
}