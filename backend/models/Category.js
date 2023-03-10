import mongoose from "mongoose";

const CategoryScheme = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('Category', CategoryScheme)
export default Category