import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone : boolean
    todolistId : string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    taskId: string
}

type ActionsType = RemoveTaskActionType | AddTaskType | ChangeTaskStatusActionType | ChangeTaskTitleActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            // найдём нужную таску:
            let task = tasks.find(t => t.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            // найдём нужную таску:
            let task = tasks.find(t => t.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.title = action.title;
            }
            return stateCopy;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string ): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = ( taskId: string, title: string, todolistId: string ): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}