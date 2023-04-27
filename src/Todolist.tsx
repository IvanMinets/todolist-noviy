import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)//функция для чтения текущего значения инпута
    } //функция для чтения текущего значения инпута
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    } // функция для добавления таски по нажатию на Enter
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    } // функция для добавления таски по клику на кнопку
    const onAllClickHandler = () => props.changeFilter("all"); //функция для фильтрации всех тасок
    const onActiveClickHandler = () => props.changeFilter("active"); //функция для фильтрации активных тасок
    const onCompletedClickHandler = () => props.changeFilter("completed");//функция для фильтрации выполненных тасок

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>
                    +
                </button>
            </div>
            <ul>
                {
                    //убрали return и скобки .map((t)=>{return <li>...}
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }// функция для удаления таски
                        return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    }) //map - это метод массива, который на основе каждого элемента в массиве, создаёт новый элемент;
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;