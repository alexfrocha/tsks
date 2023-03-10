import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    categoriaId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamp: true })

const Task = mongoose.model('Task', TaskSchema)
export default Task