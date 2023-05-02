import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null >(null);

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("");
        }
        else {
            setError("Title is required");
        }
    } // функция для добавления таски по клику на кнопку
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)//функция для чтения текущего значения инпута
    } //функция для чтения текущего значения инпута
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    } // функция для добавления таски по нажатию на Enter
    const onAllClickHandler = () => props.changeFilter("all", props.id); //функция для фильтрации всех тасок
    const onActiveClickHandler = () => props.changeFilter("active", props.id); //функция для фильтрации активных тасок
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);//функция для фильтрации выполненных тасок
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>
                    +
                </button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {
                    //убрали return и скобки .map((t)=>{return <li>...}
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }// функция для удаления таски
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)} // функция для изменения стейта чекбокса

                        return <li key={t.id} className={t.isDone ? "is-done": ""}><input
                            type="checkbox"
                            onChange={onChangeHandler}
                            checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    }) //map - это метод массива, который на основе каждого элемента в массиве, создаёт новый элемент;
                }
            </ul>
            <div>
                <button className={props.filter === "all"? "active-filter": ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active"? "active-filter": ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed"? "active-filter": ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;