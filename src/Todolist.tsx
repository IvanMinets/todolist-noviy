import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
}

function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks.isDone}/><span>{props.tasks.title}</span></li>
                <li><input type="checkbox" checked={true}/><span>CSS</span></li>
                <li><input type="checkbox" checked={true}/><span>JS</span></li>
                <li><input type="checkbox" checked={false}/><span>REACT</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;