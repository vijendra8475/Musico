import { Server } from 'socket.io'

export const initilizeSocket = server => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost/3000',
            credentials: true
        }
    });

    const userSocket = new Map();
    const userActivites = new Map();

    io.on('connection', socket => {

        socket.on('user_connected', userId => {
            userSocket.set(userId, socket.id)
            userActivites.set(userId, 'Idle')

            // broadcast to All connected Socket that this user just logged in
            io.emit('user_connected', userId)

            socket.emit('users_online', Array.from(userSocket.keys()))
        })

        socket.on('update_activity', ({ userId, activity }) => {
            console.log('activity updated', userId, activity);
            userActivites.set(userId, activity)
            io.emit('update_activity', { userId, activity })
        })

        socket.on('send_message', async (data) => {
            try {
                const { senderId, receiverId, content } = data;
                const message = new Message({ senderId, receiverId, content });

                // send to the receiver if they ae online
                const receiverSocketId = socket.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit('receive_message', message);
                }
                socket.emit('receive_message', message)
            } catch (error) {
                console.error('Message error : ', error);
                socket.emit('message_error', error.message)
            }
        })

        socket.on('disconnect', () => {
            let disconnectedUserId ;
            for(const [userId, socketId] of userSocket) {
                if(socket.id === socketId) {
                    disconnectedUserId = userId
                    userSocket.delete(userId)
                    userActivites.delete(userId)
                    break;
                }
            }

            if(disconnectedUserId) {
                io.emit('user_disconnected', disconnectedUserId)
            }
        })

    })
}

