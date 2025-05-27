import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.Admin_Email === currentUser.primaryEmailAddress?.emailAddress;
        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized - you must be an Admin" });
        }
        next();

    } catch (error) {
        console.log('Inernal Server Error in auth.middleware.js');
        
        next(error)
    }
}