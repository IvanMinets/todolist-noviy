import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string] : Array<TaskType>
}
function App() {

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]; // это уже обычный массив, к которому можно применять методы
        let resultTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = resultTasks;
        setTasks({...tasksObj});
    } // Функция для удаления тасок
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todolists]);
        }
    } // Функция для фильтрации тасок.
    const addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks(tasksObj);
    } // Функция для добавления тасок
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find((t) => {
            return t.id === taskId
        }) // if (t.id === taskId) {return true} else {return false} //находим нужную таску
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        //достаём нужный массив по todolistId
        let tasks = tasksObj[todolistId];
        //находим нужную таску
        let task = tasks.find((t) => {
            return t.id === taskId
        }) // if (t.id === taskId) {return true} else {return false} //находим нужную таску
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj});
        }
    } // Функция для изменения чекбокса таски

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [{id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "taska", isDone: false},
            {id: v1(), title: "taska2", isDone: false}],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ]
    })

    const addTodolist = (title: string) => {
        let todolist: TodoListType = {
            id: v1(),
            filter: "all",
            title: title
        }
        setTodoLists([todolist, ...todolists]);
        setTasks({...tasksObj, [todolist.id]:[]})
    }
    let removeTodoList = (todoListId: string) => {
        let filteredTodolist = todolists.filter( tl => tl.id !== todoListId)
        setTodoLists(filteredTodolist);
        delete tasksObj[todoListId];
        setTasks({...tasksObj});
    }
    let changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.id];

                    if (tl.filter === "completed") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                    }
                    if (tl.filter === "active") {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
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
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}

export default App;
