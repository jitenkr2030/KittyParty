import { createServer } from 'http'
import { Server } from 'socket.io'

const server = createServer()
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// Store active rooms and their users
const rooms = new Map()
const users = new Map()

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // Join a group chat room
  socket.on('join-group', (data) => {
    const { groupId, userName } = data
    
    // Leave previous rooms
    socket.rooms.forEach(room => {
      if (room !== socket.id) {
        socket.leave(room)
      }
    })

    // Join new room
    socket.join(groupId)
    
    // Store user info
    users.set(socket.id, { userName, groupId })
    
    // Add to room
    if (!rooms.has(groupId)) {
      rooms.set(groupId, new Set())
    }
    rooms.get(groupId).add(socket.id)

    // Notify others
    socket.to(groupId).emit('user-joined', {
      userName,
      userId: socket.id
    })

    // Send current room users
    const roomUsers = Array.from(rooms.get(groupId) || [])
      .map(userId => users.get(userId))
      .filter(Boolean)

    socket.emit('room-users', roomUsers)
  })

  // Send message
  socket.on('send-message', (data) => {
    const { groupId, message, type = 'text' } = data
    const user = users.get(socket.id)
    
    if (!user) return

    const messageData = {
      id: Date.now().toString(),
      message,
      type,
      sender: user.userName,
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      groupId
    }

    // Send to all users in the room
    io.to(groupId).emit('new-message', messageData)
  })

  // Handle typing indicators
  socket.on('typing', (data) => {
    const { groupId, isTyping } = data
    const user = users.get(socket.id)
    
    if (!user) return

    socket.to(groupId).emit('user-typing', {
      userName: user.userName,
      isTyping
    })
  })

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    const user = users.get(socket.id)
    
    if (user) {
      // Remove from room
      const room = rooms.get(user.groupId)
      if (room) {
        room.delete(socket.id)
        if (room.size === 0) {
          rooms.delete(user.groupId)
        }
      }

      // Notify others
      socket.to(user.groupId).emit('user-left', {
        userName: user.userName,
        userId: socket.id
      })

      // Remove user
      users.delete(socket.id)
    }
  })
})

const PORT = 3003
server.listen(PORT, () => {
  console.log(`Chat service running on port ${PORT}`)
})