import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

function TaskList() {
    const [tasks, setTasks] = useState( []);
    const [description, setDescription] = useState("");
    function loadTask(){
        fetch("/api/tasks")
            .then(res => res.json())
            .then(tasks => setTasks(tasks));
    }

    useEffect(() => {
        loadTask();
    }, []);


    //legg til clear button
    //legg til at check boksen state blir igjen
    async function handleSubmit(e){
        e.preventDefault()
        const task = { description, completed: false };
        setDescription("");
        await fetch("/api/tasks", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(task)
        });
        loadTask();
    }

    async function handleCheckChange(e, id) {
        await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({completed: e.target.checked})
        });
        loadTask();
    }

    return <div>
        <h2>Tasks</h2>
        {tasks.map(({id, description, completed}) => <label key={id}>
            <input type="checkbox" checked={completed} onChange={e => handleCheckChange(e, id)} />
            {description}
        </label>)}
        <h2>new task</h2>
        <form onSubmit={handleSubmit}>
            <div>
                description: <input
                type={"text"}
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            </div>
            <div>
                <button disabled={!description}>Submit</button>
            </div>
        </form>
    </div>;
}



function Application(){
    return <TaskList/>

}

root.render(<Application/>);
