import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFormPropsType = {
    addTask: (title: string, todolistId: string) => void
    id: string
}

export function AddItemForm(props: addItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)//функция для чтения текущего значения инпута
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }
    const [error, setError] = useState<string | null>(null);
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
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
    )
}