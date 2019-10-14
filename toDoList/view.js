;
(function () {
    'use strict';

    const template = `
    <div id="app">
        <input type="text" id="enter">
        <button id="addItem">Добавить</button>
        <div id="todoList"></div>
        <button id="makeDone">Выполнить</button>
        <button id="makeNotDone">Воcстановить</button>
        <button id="remove">Удалить</button>		
    </div>`;

    let rootElement = null;

    function getRoot() {
        const divElement = document.createElement('div');
        divElement.innerHTML = template;

        rootElement = divElement.firstElementChild;

        const buttonElements = rootElement.querySelectorAll('button');

        for (let i = 0; i < buttonElements.length; i++) {
            const buttonElement = buttonElements[i];

            buttonElement.addEventListener('click', function (evt) {
                view.clickHandler(buttonElement.getAttribute('id'));
            });
        }

        return rootElement;
    }

    function getValue() {
        return rootElement.querySelector('#enter').value;
    }

    function setValue(value) {
        rootElement.querySelector('#enter').value = '';
    }

    function update(items) {
        const todoList = document.querySelector('#todoList');
        const ulElement = createToDoList(items);

        todoList.textContent = '';
        todoList.append(ulElement);
    }

    function createToDoList(items) {
        const ulElement = document.createElement('ul');

        for (const item of items) {
            const liElement = document.createElement('li');
            const checkboxElement = document.createElement('input');

            checkboxElement.setAttribute('type', 'checkbox');

            if (item.done) {
                liElement.classList.add('done');
            }

            if (item.checked) {
                checkboxElement.setAttribute('checked', '');
            }

            liElement.append(checkboxElement);
            liElement.append(' ' + item.content);

            ulElement.append(liElement);

            checkboxElement.addEventListener('click', function (evt) {
                evt.preventDefault();
                view.clickHandler('clickByItem', item.id);
            });
        }

        return ulElement;
    }

    window.view = {
        getRoot: getRoot,
        update: update,
        getValue: getValue,
        setValue: setValue,
        clickHandler: () => {}
    };

})();