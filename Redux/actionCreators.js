import { ADD_TASK, DO_TASK, GET_ALL_TASKS, REMOVE_ALL_TASKS, REMOVE_TASK, SET_TASKS } from "./taskActionType.js"

const addTask = (title) => {
  return { type: ADD_TASK, title }
}
const removeTaskAction = (id) => {
  return { type: REMOVE_TASK, id }
}
const DoTaskAction = (id) => {
   return { type: DO_TASK, id }
}
const setTasks = (tasks) => {
   return  { type: SET_TASKS, tasks}
}
const getAllTasks = () => {
  return { type: GET_ALL_TASKS }
}
const removeAllTasks = () => {
  return { type: REMOVE_ALL_TASKS  }
}


export {addTask , removeTaskAction , DoTaskAction , setTasks  , getAllTasks , removeAllTasks}