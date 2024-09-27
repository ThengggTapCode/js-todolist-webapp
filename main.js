const body = document.querySelector('body');
const input = document.getElementById('input');
const taskList = document.getElementById('task-list');
const uiToggle = document.getElementById('ui-toggle');
let untitledTasks = 0;
let taskCount = 0;
uiToggle.setAttribute('title', 'Toggle Dark mode');

const checkTaskCount = () => {
    // avoid message duplicate
    const emptyListMsg = document.querySelector('#empty-list-msg');
    if (emptyListMsg)
        emptyListMsg.remove();

    if (taskCount === 0) {

        const newDiv = document.createElement('div');
        const newBtn = document.createElement('button');

        // set inline css prop for tasklist
        taskList.style.display = 'flex';
        taskList.style.justifyContent = 'center';
        taskList.style.alignItems = 'center';

        // set content, attributes for elements
        newDiv.id = 'empty-list-msg';
        newDiv.innerText = 'No task found! Add a new one';
        newBtn.innerText = 'Add';
        newBtn.setAttribute('title', 'Add new task'); 
        newBtn.setAttribute('onclick', 'addNewTask()');
        // add element to webpage
        newDiv.appendChild(newBtn);
        taskList.appendChild(newDiv);
        return;
    }
    // remove message
    if (emptyListMsg)
        emptyListMsg.remove();
    taskList.style.display = 'block';
    return;
}
// add new task
const addNewTask = () => {
    taskCount += 1;
    checkTaskCount();
    setTaskCount();
    const inputValue = input.value;
    
    // add new task to task list
    const newTask = document.createElement('li');
    const taskName = document.createElement('p');
    taskName.classList.add('task-name');

    // set default name if input is empty
    if (inputValue === '') {
        untitledTasks += 1;
        taskName.innerText = `Untitled #${untitledTasks}`;
        newTask.setAttribute('title', `Untitled #${untitledTasks}`);
    } else {
        untitledTasks = 0;
        taskName.innerText = inputValue;
        newTask.setAttribute('title', inputValue);
    }

    newTask.appendChild(taskName);
    taskList.appendChild(newTask);

    // add check task button
    const checkTag = document.createElement('i');
    checkTag.classList.add('fa-regular');
    checkTag.classList.add('fa-circle');
    checkTag.setAttribute('title', 'Check Task');
    newTask.appendChild(checkTag);

    // add edit task button
    const editTask = document.createElement('i');
    editTask.classList.add('fa-solid');
    editTask.classList.add('fa-pencil');
    editTask.setAttribute('title', 'Edit Task');
    newTask.appendChild(editTask);

    // add delete task button
    const deleteTask = document.createElement('i');
    deleteTask.classList.add('fa-solid');
    deleteTask.classList.add('fa-trash');
    deleteTask.setAttribute('title', 'Delete Task');
    newTask.appendChild(deleteTask);

    // clear input value
    input.value = '';
    setTaskList();
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
        clickedElement.setAttribute('title', 'Uncheck Task');

        // change icon
        clickedElement.classList.toggle('fa-circle');
        clickedElement.classList.toggle('fa-circle-check');
        setTaskList();
        return;
    }

    // checked box 
    if (clickedElement.classList.contains('fa-circle-check')) {
        // toggle uncheck class
        clickedElement.parentElement.classList.toggle('checked');
        clickedElement.setAttribute('title', 'Check Task');

        // change icon
        clickedElement.classList.toggle('fa-circle');
        clickedElement.classList.toggle('fa-circle-check');
        setTaskList();
        return;
    }

    // edit task
    if (clickedElement.classList.contains('fa-pencil')) {
        const taskItem = clickedElement.parentElement;
        const taskNameElement = taskItem.querySelector('.task-name');
        const oldTaskName = taskNameElement.textContent;

        let newTaskName = prompt('Enter a new name for your task', oldTaskName);

        if (newTaskName && newTaskName.trim() !== '') {
            taskNameElement.textContent = newTaskName.trim();
            setTaskList();
        }
        return;
    }

    // delete task
    if (clickedElement.classList.contains('fa-trash')) {
        taskCount -= 1;
        checkTaskCount();
        setTaskCount();
        clickedElement.parentElement.remove();
        untitledTasks = 0;
        setTaskList();
        return;
    }
});

uiToggle.addEventListener('click', () => {

    // toggle between light and dark mode
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    // change to sun icon
    if (body.classList.contains('dark-mode')) {
        uiToggle.setAttribute('title', 'Toggle Light mode');
        uiToggle.classList.remove('fa-moon');
        uiToggle.classList.add('fa-sun');
        setTheme(body.className);
        return;
    }

    // change to moon icon
    if (body.classList.contains('light-mode')) {
        uiToggle.setAttribute('title', 'Toggle Dark mode');
        uiToggle.classList.remove('fa-sun');
        uiToggle.classList.add('fa-moon');
        setTheme(body.className);
        return;
    }
});

// set theme to localStorage
const setTheme = (theme) => {
    localStorage.setItem('theme', theme);
}
// check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    body.classList.remove(body.className);
    body.classList.add(savedTheme);

    // change to sun icon
    if (savedTheme === 'dark-mode') {
        uiToggle.classList.remove('fa-moon');
        uiToggle.classList.add('fa-sun');
    }
    // change to moon icon
    if (savedTheme === 'light-mode') {
        uiToggle.classList.remove('fa-sun');
        uiToggle.classList.add('fa-moon');
    }
} else {
    // default
    body.classList.add('light-mode');
    uiToggle.classList.add('fa-moon');
}

// set task list to localstorage
const setTaskList = () => {
    localStorage.setItem('tasks', taskList.innerHTML);
}
// set task count to localstorage
const setTaskCount = () => {
    localStorage.setItem('taskcount', taskCount);
    console.log(`Tasks count: ${taskCount}`);
}
// show saved task list
const showTaskList = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks)
        taskList.innerHTML = savedTasks;
}
// get task count from localstorage
const getTaskCount = () => {
    const savedCount = localStorage.getItem('taskcount');
    taskCount = savedCount ? parseInt(savedCount) : 0;
}
console.log(`Tasks count: ${taskCount}`);
showTaskList();
getTaskCount();
checkTaskCount();