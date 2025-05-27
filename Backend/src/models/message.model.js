import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    senderId : {
        type : String,
        required : true,
    },
    receiverId : {
        type : String,
        required : true,
    },
    content : {
        type : String,
        required : true,
    }
}, { timestamps : true });
// createdAt and updatedAt fields are automatically added by mongoose

export const Message = mongoose.model("Message", messageSchema);
// The model is created using the mongoose.model() method, which takes two arguments: the name of the model and the schema to use for that model. The model can then be used to create, read, update, and delete documents in the MongoDB database.