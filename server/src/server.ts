import SocketIO from 'socket.io'
import { app } from './app'
import { onConnection } from './socket.io'

const PORT = process.env.PORT || 3333

const httpServer = app.listen(PORT, () => console.log(`Server is running on port ${PORT} 🔥`))



const io = new SocketIO.Server(httpServer, {
  cors: {
    origin: '*'
  }
})


io.on('connection',onConnection)

