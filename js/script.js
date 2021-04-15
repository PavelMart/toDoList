'use strict';

const todoContainer = document.querySelector('.todo-container'),
    todoControl = document.querySelector('.todo-control'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    headerInput = document.querySelector('.header-input');

let buttonsRemove = [],
    buttonsComplete = [];

let toDo = JSON.parse(localStorage.getItem('toDoList')) || [];

const addToDo = function() {
    if (headerInput.value.trim() === '') {
        headerInput.value = '';
        alert('Пустых задач не бывает!');
        return;
    } else {
        const headerInputValue = headerInput.value;
        const newTask = {
            value: headerInputValue,
            completed: false,
        };

        toDo.push(newTask);
        document.querySelector('.header-input').value = '';
    }
};

const getButtons = function(render) {
    buttonsRemove = [];
    buttonsComplete = [];

    buttonsRemove = todoContainer.querySelectorAll('.todo-remove');
    buttonsComplete = todoContainer.querySelectorAll('.todo-complete');

    buttonsRemove.forEach(function(item) {
        item.addEventListener('click', function() {
            for (let elem in toDo) {
                if (toDo[elem].value === item.closest('.todo-item').textContent.trim()) {
                    toDo = toDo.filter(function(n) {
                        return n !== toDo[elem];
                    });
                    render();
                    return;
                }
            }
        });
    });

    buttonsComplete.forEach(function(item) {
        item.addEventListener('click', function() {
            for (let elem in toDo) {
                if (toDo[elem].value === item.closest('.todo-item').textContent.trim()) {
                    toDo[elem].completed = !toDo[elem].completed;
                    render();
                    return;
                }
            }
        });
    });
};

const render = function() {

    todoList.textContent = '';
    todoCompleted.textContent = '';

    toDo.forEach(function(item) {
        const newLi = document.createElement('li');

        newLi.classList.add('todo-item');

        newLi.innerHTML = `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `;

        if (item.completed) {
            todoCompleted.append(newLi);
        } else {
            todoList.append(newLi);
        }

    });

    getButtons(render);

    localStorage.setItem('toDoList', JSON.stringify(toDo));

};

render();

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();
    addToDo();
    render();
});