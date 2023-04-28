import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "taska", isDone: false},
        {id: v1(), title: "taska2", isDone: false}
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");

    const removeTask = (id: string) => {
        let resultTasks = tasks.filter(t => t.id !== id) // t - параметр функции.
        // Здесь сокращённая конструкция if-else. if (t.id !== id) {return true} else {return false}
        setTasks(resultTasks); //setTask часть хука useState отвечает за перерисовку нового массива с тасками после удаления
    } // Функция для удаления тасок
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    } // Функция для фильтрации тасок.
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    } // Функция для добавления тасок
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find((t) => {return t.id === taskId}) // if (t.id === taskId) {return true} else {return false} //находим нужную таску
        if (task) {
            task.isDone = isDone;
        }
        setTasks(tasks);
    } // Функция для изменения чекбокса таски

    let tasksForTodoList = tasks;
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }

    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
