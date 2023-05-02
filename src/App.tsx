import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "taska", isDone: false},
        {id: v1(), title: "taska2", isDone: false}
    ]);

    const removeTask = (id: string) => {
        let resultTasks = tasks.filter(t => t.id !== id) // t - параметр функции.
        // Здесь сокращённая конструкция if-else. if (t.id !== id) {return true} else {return false}
        setTasks(resultTasks); //setTask часть хука useState отвечает за перерисовку нового массива с тасками после удаления
    } // Функция для удаления тасок
    const changeFilter = (value: FilterValuesType, todolistId: string) => {

    } // Функция для фильтрации тасок.
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    } // Функция для добавления тасок
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find((t) => {
            return t.id === taskId
        }) // if (t.id === taskId) {return true} else {return false} //находим нужную таску
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    } // Функция для изменения чекбокса таски


    let todolists: Array<TodoListType> = [
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to buy", filter: "completed"}
    ]

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let tasksForTodoList = tasks;

                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks.filter(t => t.isDone === true)
                    }
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks.filter(t => t.isDone === false)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
