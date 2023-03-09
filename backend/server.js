import bodyParser from 'body-parser'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import taskRoutes from './routes/task.js'
import { register } from './controllers/auth.js'
import { verifyToken } from './middleware/auth.js'

dotenv.config()
const app = express()

let __filename = fileURLToPath(import.meta.url)
let __dirname = path.join(__filename)

app.use(express.json())

// MAIS SEGURANÇA NA API
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/assets', express.static(__dirname + 'public/assets'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets',)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

// ROTAS
app.post('/auth/register', upload.single('picture'), register)
app.use('/auth', authRoutes)
app.use('/tasks', verifyToken, taskRoutes)


const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(PORT, () => console.log('Servidor Iniciado: ' + PORT))
})
.catch((err) => {
    console.log(`${err} não conectou`)
})