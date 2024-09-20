const input = document.getElementById('input');
const taskList = document.getElementById('task-list');
const emptyInputNoti = document.getElementById('empty-input-noti');
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
    newTask.textContent = inputValue;
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
}
// submit when enter is pressed
input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        addNewTask();
        return;
    }
});

taskList.addEventListener('click', (event) => {
    // checkbox
    if (event.target.classList.contains('fa-circle')) {
        // toggle checked class
        event.target.parentElement.classList.toggle('checked');

        // change icon
        event.target.classList.toggle('fa-circle');
        event.target.classList.toggle('fa-circle-check');
        return;
    }

    // checked box 
    if (event.target.classList.contains('fa-circle-check')) {
        // toggle uncheck class
        event.target.parentElement.classList.toggle('checked');

        // change icon
        event.target.classList.toggle('fa-circle');
        event.target.classList.toggle('fa-circle-check');
        return;
    }

    // delete task
    if (event.target.classList.contains('fa-xmark')) {
        event.target.parentElement.remove();
    }
});

