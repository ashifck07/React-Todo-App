const Todo = require('../Model/toDo')

const createNewTsak = async (req, res) => {
    const newTodo = await new Todo({ name: req.body.data })
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
    const { _id } = req.body
    const task = await Todo.findById(_id);
    const updatedTask = await Todo.findByIdAndUpdate(
        _id,
        { isCompleted: !task.isCompleted },
        { new: true } // This option returns the updated document
    );
    res.status(200).json(updatedTask);
}

module.exports = {
    createNewTsak, getAllTask, deleteTask, completedTask
}