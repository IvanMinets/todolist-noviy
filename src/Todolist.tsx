import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null >(null);

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle);
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
                            props.removeTask(t.id)
                        }// функция для удаления таски
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked)} // функция для изменения стейта чекбокса

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