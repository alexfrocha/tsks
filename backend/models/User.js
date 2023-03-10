import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picturePath: {
        type: String,
        default: ""
    },
    tasks: {
        type: Array,
        default: []
    }
}, { timestamp: true })

const User = mongoose.model("User", UserSchema);
export default User