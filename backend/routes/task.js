import express from 'express'
import { createTask, deleteTask, findByCategoryId, getTasks, updateTask } from '../controllers/task.js'
import { verifyToken } from '../middleware/auth.js'

const route = express.Router()
route.get('/', getTasks)
route.post('/create', createTask)
route.patch('/update/:taskId', verifyToken, updateTask)
route.delete('/delete/:taskId', verifyToken, deleteTask)
route.get('/:categoriaId', verifyToken, findByCategoryId
)
export default route