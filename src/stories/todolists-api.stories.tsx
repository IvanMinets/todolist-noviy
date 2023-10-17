import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
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

}