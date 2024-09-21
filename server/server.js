import express from "express";

const app = express();

app.use(express.json());
const tasks = [
    {id: 1, description: "Follow the lecture", completed: true},
    {id: 2, description: "Read the exercise", completed: false},
    {id: 3, description: "Complete the exercise", completed: false},
];
app.get("/api/tasks", (req,res)=> {

    res.json(tasks)
})






app.post("/api/tasks", (req,res) => {
    const{description,completed} = req.body
    const id = tasks.length + 1
    tasks.push({id,description,completed})
    res.sendStatus(201)


})
app.use(express.static("../client/dist"));

app.listen(process.env.PORT || 3000);




