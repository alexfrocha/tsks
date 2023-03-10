import Category from "../models/Category.js";
import User from "../models/User.js";

export const getCategories = async (req, res) => {
    try {
        const {userId} = req.params
        const categories = await Category.find({ userId: userId })
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const createCategory = async (req, res) => {
    try {
        const { name, userId } = req.body
        if(!name) return res.status(404).json({ messageError: 'O nome não pode estar vazio' })
        const someUserWithId = await User.findById(userId)
        const category = new Category({ name, userId: someUserWithId._id })
        const savedCategory = await category.save()
        res.status(200).json({...savedCategory, successMessage: 'Categoria criada com sucesso'})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const editCategory = async (req, res) => {
    try {
        const {categoryId} = req.params
        const { name, tasks, userId } = req.body
        if(!name) return res.status(404).json({ messageError: 'O nome não pode estar vazio' })
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, {name, tasks, userId}, { new: true })
        res.status(200).json({...updatedCategory, successMessage: 'Categoria editada com sucesso'})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params
        await Category.findByIdAndDelete(categoryId)
        res.status(200).json({successMessage: 'Categoria deletada com sucesso'})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}