import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'general',
    },
    completed: {
        type: Boolean,
        default: false
    },
    expireDate: {
        type: String,
        default: ''
    },
    expireTime: {
        type: String,
        default: ''
    }
}, { timestamp: true })

const Task = mongoose.model('Task', TaskSchema)
export default Task