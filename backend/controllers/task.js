import Task from "../models/Task.js";
import User from "../models/User.js";

export const createTask = async (req, res) => {
    try {

        const {userId, description, type, } = req.body
        const user = await User.findById(userId)
        const newTask = new Task({
            userId: user._id,
            description,
            type,
            expireDate,
            expireTime
        })


        const savedTask = await newTask.save()
        res.status(200).json(savedTask)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getTasks = async (req, res) => {
    try {
        const { userId } = req.body
        const tasks = await Task.find({ userId })
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getTasksByType = async (req, res) => {
    try {
        const {type} = req.params
        const {userId} = req.body
        const tasks = await Task.find({ userId, type })
        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateTask = async (req, res) => {
    try {
        const {taskId} = req.params
        const {description, type, expireDate, expireTime} = req.body
        const taskUpdated = await Task.findByIdAndUpdate(taskId, {description, type, expireDate, expireTime}, { new: true })
        res.status(200).json(taskUpdated)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const {taskId} = req.params
        await Task.findByIdAndDelete(taskId)
        res.status(200).json({ message: 'Tarefa deletada com sucesso' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}