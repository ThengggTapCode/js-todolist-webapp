const body = document.querySelector('body');
const input = document.getElementById('input');
const taskList = document.getElementById('task-list');
const emptyInputNoti = document.getElementById('empty-input-noti');
const uiToggle = document.getElementById('ui-toggle');

// add new task
const addNewTask = () => {
    const inputValue = input.value;
    
    // if input is empty
    if (inputValue === '') {
        emptyInputNoti.textContent = "\u274c Please don't leave this input empty";
        emptyInputNoti.style.display = 'block';
        return;
    }
    emptyInputNoti.style.display = 'none'; // disable empty input notification

    // add new task to task list
    const newTask = document.createElement('li');
    const taskName = document.createElement('p');
    taskName.textContent = inputValue;
    newTask.appendChild(taskName);
    taskList.appendChild(newTask);

    // add check task button
    const checkTag = document.createElement('i');
    checkTag.classList.add('fa-regular');
    checkTag.classList.add('fa-circle');
    newTask.appendChild(checkTag);

    // add delete task button
    const deleteTask = document.createElement('i');
    deleteTask.classList.add('fa-solid');
    deleteTask.classList.add('fa-xmark');
    newTask.appendChild(deleteTask);

    // clear input value
    input.value = '';
    return;
}
// submit when enter is pressed
input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addNewTask();
        return;
    }
});

taskList.addEventListener('click', (event) => {
    const clickedElement = event.target;
    // checkbox
    if (clickedElement.classList.contains('fa-circle')) {
        // toggle checked class
        clickedElement.parentElement.classList.toggle('checked');

        // change icon
        clickedElement.classList.toggle('fa-circle');
        clickedElement.classList.toggle('fa-circle-check');
        return;
    }

    // checked box 
    if (clickedElement.classList.contains('fa-circle-check')) {
        // toggle uncheck class
        clickedElement.parentElement.classList.toggle('checked');

        // change icon
        clickedElement.classList.toggle('fa-circle');
        clickedElement.classList.toggle('fa-circle-check');
        return;
    }

    // delete task
    if (clickedElement.classList.contains('fa-xmark')) {
        clickedElement.parentElement.remove();
        return;
    }
});

uiToggle.addEventListener('click', () => {

    // toggle between light and dark mode
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');


    // change to sun icon
    if (body.classList.contains('dark-mode')) {
        uiToggle.classList.remove('fa-moon');
        uiToggle.classList.add('fa-sun');
        return;
    }

    // change to moon icon
    if (body.classList.contains('light-mode')) {
        uiToggle.classList.remove('fa-sun');
        uiToggle.classList.add('fa-moon');
        return;
    }
});