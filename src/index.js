/* eslint-disable no-undef */
import express from 'express'
import pkg from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { connect } from './utils/db.js'
import goalRouter from './resources/goal/goal.router.js'
import userRouter from './resources/user/user.router.js'
import langRouter from './resources/lang/lang.router.js'
import noteRouter from './resources/note/note.router.js'
import { config } from 'dotenv'



const app = express()
const { json, urlencoded } = pkg
const PORT = process.env.PORT || 5000
// app.use('/user',userRouter)

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(morgan('dev'))
app.use(cors())
app.options('*', cors())
app.use('/user', userRouter)
app.use('/lang',langRouter)
app.use('/note',noteRouter) 
app.use('/goal',goalRouter)

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(PORT, async () => {
    config({path:'.env'})
    console.log(`server is running on port ${PORT} http://localhost:${PORT}`)
    console.log(process.env.MONGO_DB_URL)
    await connect()
        .then(() => console.log('DB Connected'))
        .catch((err) => console.log(`DB Disconnected ${err.message}`))
})
