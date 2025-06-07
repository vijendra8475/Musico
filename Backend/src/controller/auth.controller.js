import { User } from "../models/user.model.js";

export const authUser = async (req, res) => {
    try {
      const { id, firstName, lastName, imageUrl } = req.body;
  
      // check if the user is already exist
      const user = await User.findOne({ clerkId: id });
  
      if(!user) {
        await User.create({
          clerkId: id,
          name: `${firstName || ''} ${lastName || ''}`.trim(),
          imageUrl: imageUrl,
        });
      }
  
      res.status(200).json({ success: true, message: "User authenticated successfully" });
  
    } catch (error) {
      
      console.error("Error in auth route:", error);
      next(error)
    }
  };