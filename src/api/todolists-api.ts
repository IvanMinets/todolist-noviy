import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "2f833604-27d8-4456-8ea9-60570dd1e753"
    }
}
const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        ...settings
    })

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType =  {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}


export const todolistsApi = {
    getTodolists() {
       const promise = instance.get<TodolistType[]>('todo-lists')
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
        return promise;
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${id}`,{title: title})
        return promise;
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise;
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: title})
    }
}