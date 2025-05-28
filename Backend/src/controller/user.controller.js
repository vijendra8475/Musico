import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
    try {

        // get current user from the request
        const currentUser = req.auth.userId;

        // Check if the user is an admin
        const users = await User.find({ clerkId: { $ne: currentUser } });

        // send the response with the users
        res.status(200).json({users});

    } catch (error) {
        next(error);
    }
}