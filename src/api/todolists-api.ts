import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "2f833604-27d8-4456-8ea9-60570dd1e753"
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: string[]
    data: {
        item: TodolistType
    }
}
type DeleteUpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}




export const todolistsApi = {
    getTodolists() {
       const promise =  axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise;
    },
    createTodolist(title: string) {
        const promise = axios.post<CreateTodolistResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
        return promise;
    },
    updateTodolist(id: string, title: string) {
        const promise = axios.put<DeleteUpdateTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,{title: title}, settings)
        return promise;
    },
    deleteTodolist(id: string) {
        const promise = axios.delete<DeleteUpdateTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise;
    }
}