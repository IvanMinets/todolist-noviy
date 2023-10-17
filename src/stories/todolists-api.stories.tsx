import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
        .then( (res) => {
            debugger
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist('123')
            .then( (res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId ='f4f115b9-86db-49e1-872f-6bfd67239d9d'
        todolistsApi.deleteTodolist(todolistId)
            .then( (res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'f4f115b9-86db-49e1-872f-6bfd67239d9d';
        todolistsApi.updateTodolist(todolistId,'hello')
            .then( (res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3a538602-332c-4181-b91b-5babb1301ce9'
        todolistsApi.getTasks(todolistId)
            .then( (res) => {
                debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3a538602-332c-4181-b91b-5babb1301ce9'
        const taskId = '260a2c30-c090-4074-a577-359368a4fd53'
        todolistsApi.deleteTask(todolistId, taskId)
            .then( (res) => {
                debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3a538602-332c-4181-b91b-5babb1301ce9'
        const taskId = '260a2c30-c090-4074-a577-359368a4fd53'
        const title = 'HelloTestTask!'
        todolistsApi.updateTask(todolistId, taskId,title)
            .then( (res) => {
                debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3a538602-332c-4181-b91b-5babb1301ce9'
        const title = 'HelloTestTask!1234'
        todolistsApi.createTask(todolistId, title)
            .then( (res) => {
                debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}