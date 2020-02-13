const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    due_date:{
        type: String,
        required: true
    }
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;