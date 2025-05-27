import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    imageUrl : {
        type : String,
        required : true,
    },
    clerkId : {
        type : String,
        required : true,
        unique : true,
    }
},{ timestamps : true });
// createdAt and updatedAt fields are automatically added by mongoose

export const User = mongoose.model("User", userSchema);
// The model is created using the mongoose.model() method, which takes two arguments: the name of the model and the schema to use for that model. The model can then be used to create, read, update, and delete documents in the MongoDB database.