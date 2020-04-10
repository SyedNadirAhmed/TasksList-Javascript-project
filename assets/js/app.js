//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter  = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();


//Load all event listeners
function loadEventListeners(){
     //DOM load all event listeners
     document.addEventListener('DOMContentLoaded',getTasks); 

    //Add task event
    form.addEventListener('submit', addTask);

    //Remove Task list
    taskList.addEventListener('click',removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click',clearTasks);

    //Filter Task Event
    filter.addEventListener('keyup',filterTask);
}

//Get task form local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create Element
        const li = document.createElement('li');
        li.className = 'collection-item';
        //Create textNode and append to li 
        li.appendChild(document.createTextNode(task));
        //Create new link element 
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item float-right';
        //Add icon html
        link.innerHTML = '<i class="fas fa-times-circle"></i>';
        //Append the link to li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });
}

//Add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //Create Element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //Create textNode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element 
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item float-right';
    //Add icon html
    link.innerHTML = '<i class="fas fa-times-circle"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store task in local storage

    storeTaskInLocalStorage(taskInput.value);

    //ClearInput 
    taskInput.value = '';

    e.preventDefault();
}


//Store task in LS
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Remove From List
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

           //Remove task from local storage
           removeTaskFromLocalStorage( e.target.parentElement.parentElement);
        }
    }
}
//Rove from local storage
function removeTaskFromLocalStorage(taskItem){
    //check local storage
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Task
function clearTasks(){
    // taskList.innerHTML = '';
    //than faster on this method
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear from local storage
    clearTaskFromLocalStorage();
}
//clear from local storage
function clearTaskFromLocalStorage(){
    //confirmation message 
    if(confirm('Are you sure,you want delete all the task from list?')){
        localStorage.clear();
    }
}

//Filter Task

function filterTask(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) === -1){
            task.style.display = 'none';
        }else{
            task.style.display = 'block';
        }
    });
}




