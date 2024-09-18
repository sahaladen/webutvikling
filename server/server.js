import express from "express";

const app = express();

app.get("/api/tasks", (req,res)=> {
    res.json([
        { id: 1, description: "Follow the lecture", completed: true },
        { id: 2, description: "Read the exercise", completed: false },
        { id: 3, description: "Complete the exercise", completed: false },
    ])
})

app.use(express.static("../client/dist"));

app.listen(process.env.PORT || 3000);




