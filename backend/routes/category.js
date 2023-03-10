import express from 'express'
import { createCategory, deleteCategory, editCategory, getCategories } from '../controllers/category.js'

const route = express.Router()
route.get('/:userId', getCategories)
route.post('/create', createCategory)
route.patch('/edit/:categoryId', editCategory)
route.delete('/delete/:categoryId', deleteCategory)
export default route