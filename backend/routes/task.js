import express from 'express'
import { deleteTask, getTasks, getTasksByType, updateTask } from '../controllers/task.js'

const route = express.Router()
route.get('/', getTasks)
route.get('/:type', getTasksByType)
route.patch('/update/:taskId', updateTask)
route.delete('/delete/:taskId', deleteTask)
export default route