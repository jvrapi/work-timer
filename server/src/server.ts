import http from 'http'
import { app } from './app'
const PORT = process.env.PORT || 3333



const httpServer = http.createServer(app)


httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT} 🔥`))



// const io = new SocketIO.Server(httpServer, {
//   cors: {
//     origin: '*'
//   }
// })


// io.on('connection',onConnection)

