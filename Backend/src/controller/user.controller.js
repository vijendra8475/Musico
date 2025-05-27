import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
    try {

        // get current user from the request
        const currentUser = req.auth.userId;

        // Check if the user is an admin
        const users = await User.find({ clerkId : { $ne : currentUser}});

        // check if there is any user in the database
        if (!users) {
            console.log('No users found')
            return res.status(404).json({
                message: 'No users found',
            });
        }

        // send the response with the users
        res.status(200).json({
            message: 'Users fetched successfully',
            data: users,
        });

    } catch (error) {
        next(error);
    }
}