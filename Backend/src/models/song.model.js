import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist : {
        type: String,
        required: true,
    },
    imageUrl : {
        type: String,
        required: true,
    },
    audioUrl : {
        type: String,
        required: true,
    },
    duration : {
        type: Number,
        required: true,
    },
    albumId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Album",
        required : false,
    }
},{ timestamps : true });
// createdAt and updatedAt fields are automatically added by mongoose

export const Song = mongoose.model("Song", songSchema);