const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const {router} = require('./routes/index.js')
const {Server} = require('socket.io')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: [`http://localhost:3000`]
}))

// Routes
app.use(router)

const server =  app.listen(process.env.APP_PORT, () => {
    console.log(`Server up and running...`)
})

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data)
        console.log(`user ${socket.id} join room: ${data}`);
    })

    socket.on('send_message', (data) => {
        console.log(data);
        socket.to(data.room).emit('receive_message', data)
    })

    socket.on('disconnected', () => {
        console.log(`User disconnected: ${socket.id}`);
    })
})