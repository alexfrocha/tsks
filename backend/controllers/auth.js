import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath
        } = req.body

        if(!firstName && !lastName) return res.status(404).json({ messageError: 'Não deixe os campos vazios' })

        const emailLowerCase = String(email).toLowerCase()
        const someUserWithSameEmail = await User.findOne({ email: emailLowerCase })
        if(someUserWithSameEmail) return res.status(404).json({ messageError: 'Já existe uma conta criada com esse email' })

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
        const newUser = new User({
            firstName,
            lastName,
            email: emailLowerCase,
            password: passwordHash,
            picturePath
        })

        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const login = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body

        if(!email) return res.status(404).json({ messageError: 'Não deixe os campos vazios' })

        const emailLowerCase = String(email).toLowerCase()
        const user = await User.findOne({ email: emailLowerCase })
        if(!user) return res.status(404).json({ messageError: "Credenciais desconhecidas" })
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(404).json({ messageError: "Senha incorreta" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({ token, user })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}