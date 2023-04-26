import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active"

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");

    const removeTask = (id: number) => {
        let resultTasks = tasks.filter(t => t.id !== id) // t - параметр функции.
        // Здесь сокращённая конструкция if-else. if (t.id !== id) {return true} else {return false}
        setTasks(resultTasks); //setTask часть хука useState отвечает за перерисовку нового массива с тасками после удаления
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    } // Функция для фильтрации тасок. setFilter Отрисовывыает

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
            />
        </div>
    );
}

export default App;
