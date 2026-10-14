import { addTask, DoTaskAction, getAllTasks, removeAllTasks, removeTaskAction, setTasks } from "../Redux/actionCreators.js";
import { ADD_TASK, DO_TASK, GET_ALL_TASKS, REMOVE_ALL_TASKS, REMOVE_TASK, SET_TASKS } from "../Redux/taskActionType.js";

const $ = document;
const inputTask = $.querySelector(".add-task-input");
const btnAddTask = $.querySelector(".add-task-btn");
const tasksContainer = $.querySelector(".tasks-container");
const taskCount = $.querySelector(".task-count");
const radios = $.querySelectorAll('.radio')
const delMusic = $.getElementById('send-music')
const sendMusic = $.getElementById('del-music')
const btnDelAllTasks = $.querySelector('.btn-del-all-tasks')




const taskReducer = (tasks = [], action) => {
  switch (action.type) {
    case ADD_TASK: {
      const copyTasks = [...tasks];
      const newTask = {
        id: crypto.randomUUID(),
        title: action.title,
        hasDone: false,
        time : getTime()
      };
      copyTasks.push(newTask);

      return copyTasks;
    }
    case REMOVE_TASK: {
      const copyTasks = [...tasks];
      const filterTasks = copyTasks.filter(task => task.id !== action.id )
      
      return filterTasks;
      
    }
    case DO_TASK: {
         const copyTasks = [...tasks];
      const updateTasks = copyTasks.map(task => {
           if(task.id === action.id){
              task.hasDone = !task.hasDone
           }
           return task
      })
      return updateTasks;
     
    }
    case SET_TASKS : {
      return action.tasks
    }
    case GET_ALL_TASKS : {
      return tasks
    }
    case REMOVE_ALL_TASKS : {
      return []
    }
    default: return tasks
  }
};

const store = Redux.createStore(taskReducer);

const handleAddTask = () => {
  const taskValue = inputTask.value;

  if (taskValue) {
    actionAddTask(taskValue);
  } else {
    alert("please type a correct task");
  }
};

const actionAddTask = (title) => {
  store.dispatch(addTask(title));
  const tasks = store.getState();
  sendMusic.play()
  generateTasks(tasks);
  setLocal(tasks)  
  taskCount.innerHTML = `Added Tasks (${tasks.length})`;
  normalize();
};

const generateTasks = (tasks) => {
  tasksContainer.innerHTML = "";
    if(tasks.length){
     tasks.forEach((task) => {
    tasksContainer.insertAdjacentHTML(
      "beforeend",
      `<div class=" ${task.hasDone && 'bg-success-subtle  '} task position-relative   my-2 p-4 d-flex   justify-content-between border-bottom align-items-center rounded-top-5">
                            <div class="task-title fw-bold ">
                               <i class="fa-solid fa-clipboard-list me-2 "></i> <i class='${task.hasDone && 'text-decoration-line-through text-secondary'}'>${task.title}</i>
                            </div>
                             <p class='position-absolute time  my-2  fw-light ' ><i class="fas fa-bell text-success"></i> ${task.time}</p>
                            <div class="task-operations">
                                   <button class="btn btn-sm  rounded-circle" onclick='doTask("${task.id}")'>
                                    ${
                                        !task.hasDone ? "✏️" : "<i class='fa-solid fa-circle-check text-success'></i>"
                                    }
                                   </button>
                                   <button class="btn btn-sm   rounded-circle" onclick='removeTask("${task.id}")'><i class='fa-solid fa-trash-can'></i></button> 
                            </div>
                          </div>`,
    );
  });
    }else {
         tasksContainer.innerHTML =   `<div class='text-center'><img width='400' src='imgs/selfie 1.png'/></div>`
    }
};

const removeTask = (id) => {
  store.dispatch(removeTaskAction(id));
  const tasks = store.getState();
  generateTasks(tasks);
  delMusic.play()
  setLocal(tasks)  
  taskCount.innerHTML = `Added Tasks (${tasks.length})`;
  
};


const setLocal = (data) => {
  localStorage.setItem('tasks' , JSON.stringify(data))
}

window.removeTask = removeTask;

const doTask = (id) => {
  store.dispatch(DoTaskAction(id));
  const tasks = store.getState();
 
  generateTasks(tasks);
  setLocal(tasks)  
  
};

window.doTask = doTask;


const normalize = () => {
  inputTask.focus();
  inputTask.value = "";
};



const getTime = () => {
  const time = new Date()
  return `${time.getHours().toString().padStart(2,'0')}:${time.getMinutes().toString().padStart(2,'0')} `
}




window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks) {
        generateTasks(tasks);
        setNewDataToStore(tasks);
        taskCount.innerHTML = `Added Tasks (${tasks.length})`;
    }
});

const setNewDataToStore = (tasks) =>  store.dispatch(setTasks(tasks))
  
  




// filtering

radios.forEach(radio => {
   radio.addEventListener('change' , (e) => {
      const filterValue = e.target.value
       store.dispatch(getAllTasks())
       let tasks = store.getState()
      
       if(filterValue === 'All'){
          generateTasks(tasks)
       }
       if(filterValue === 'Completed'){
          filterCompletedTasks(tasks)
       }
       if(filterValue === 'inCompleted'){
          filterInCompletedTasks(tasks)
       }
      
   })
})


const filterCompletedTasks = (tasks) => {
   const doneTasks = tasks.filter(task => task.hasDone)
   generateTasks(doneTasks)
}
const filterInCompletedTasks = (tasks) => {
   const inCompletedTasks = tasks.filter(task => !task.hasDone)
   generateTasks(inCompletedTasks)
}

const handleDeleteAllTasks = () => {
   store.dispatch(removeAllTasks())
   const tasks = store.getState()
  generateTasks(tasks)
  setLocal(tasks)
  taskCount.innerHTML = `Added Tasks (${tasks.length})`;
  
}

btnAddTask.addEventListener("click", handleAddTask);
btnDelAllTasks.addEventListener('click' , handleDeleteAllTasks )
