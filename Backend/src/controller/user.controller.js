import { User } from '../models/user.model.js';
import { Message } from '../models/message.model.js';

export const getAllUsers = async (req, res) => {
    try {

        // get current user from the request
        const currentUser = req.auth.userId;

        // Check if the user is an admin
        const users = await User.find({ clerkId: { $ne: currentUser } });

        // send the response with the users
        res.status(200).json({users});

    } catch (error) {
        console.log('not getting uses');
        
        next(error);
    }
}

export const getMessages = async(req, res, next) => {
    try {
        const myId = req.auth.userId;
        const { userId } = req.params;

        const messages = await Message.find({
            $or : [
                { senderId : myId, receiverId : userId },
                { senderId : userId, receiverId : myId }
            ]
        }).sort({ createdAt : 1 })

        res.status(200).json(messages)
    } catch (error) {
        console.log('not getting messages');
        
        next(error)
    }
}