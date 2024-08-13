const express = require('express');
const app = express();
const Todo = require('../Model/toDo');
const {createNewTsak,getAllTask,deleteTask,completedTask} = require('../Controllers/todoController')

app.get('/',getAllTask)
app.post('/new',createNewTsak);
app.delete('/delete/:id',deleteTask);
app.put('/update',completedTask)

module.exports = app;