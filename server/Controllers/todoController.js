const Todo = require('../Model/toDo')

const createNewTsak = async (req, res) => {
    const newTodo =  new Todo({ name: req.body.data })
    const response = await newTodo.save()
    res.status(200).json(response);
}

const getAllTask = async (req, res) => {
    const allTask = await Todo.find();
    res.json(allTask);
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Todo.findByIdAndDelete(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};


const completedTask = async (req, res) => {
    try {
      const { _id } = req.body;
        const task = await Todo.findById(_id);
        if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the task" });
    }
  };
  

module.exports = {
    createNewTsak, getAllTask, deleteTask, completedTask
}