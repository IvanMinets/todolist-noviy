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
    }

)

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}

export const todolistsApi = {
    getTodolists() {
       const promise =  instance.get<TodolistType[]>('todo-lists')
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
        return promise;
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`todo-lists/${id}`,{title: title})
        return promise;
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
        return promise;
    }
}