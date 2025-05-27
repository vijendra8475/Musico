import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    artist : {
        type : String,
        required : true,
    },
    imageUrl : {
        type : String,
        required : true,
    },
    releaseYear : {
        type : Number,
        required : true,
    },
    songs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Song",
        }
    ],
},{ timestamps : true });
// createdAt and updatedAt fields are automatically added by mongoose

export const Album = mongoose.model("Album", albumSchema);
// The model is created using the mongoose.model() method, which takes two arguments: the name of the model and the schema to use for that model. The model can then be used to create, read, update, and delete documents in the MongoDB database.