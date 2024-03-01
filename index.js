import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config()

const app = express()

const port = 3002

app.use(express.json())
app.use(cors());

const server = app.listen(port, () => {

      console.log('api-websocket is running on port 3002')

})

const io = new Server(server, {
      cors : {
            origin : '*',
            methods : ['POST', 'GET']
      }
});

io.on('connection', socket => {

      console.log('User connected')

      socket.on('Task created', task => {
            console.log('task received: ', task)      
            io.emit('task-user', task)
      })

      socket.on('disconnect', () => {
            console.log('User disconnected')
      })
})