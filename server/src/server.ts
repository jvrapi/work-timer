import http from 'http'
import SocketIO from 'socket.io'
import { app } from './app'
import { onConnection } from './socket.io'

const PORT = process.env.PORT || 3000

const httpServer = http.createServer(app)

const io = new SocketIO.Server(httpServer)


io.on('connection', onConnection)

app.listen(PORT, () => console.log(`Server is running on port ${PORT} 🔥`))
