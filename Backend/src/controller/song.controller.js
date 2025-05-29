import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
    try {
        // Fetch all songs from the database
        const songs = await Song.find().sort({ createdAt: -1 });

        // Check if songs exist
        if (!songs) {
            return res.status(404).json({ message: "No songs found" });
        }
        // Return the songs in the response
        return res.status(200).json(songs);

    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error fetching songs:", error);
        next(error);
    }
}

export const getFeaturedSong = async (req, res, next) => {
    try {

        const featuredSongs = await Song.aggregate([
            {
                $sample : { size : 6},
            },
            {
                $project : {
                    _id : 1,
                    title : 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])

        res.status(200).json(featuredSongs);
        
    } catch (error) {
        console.error("Error fetching featured song:", error);
        next(error);
        
    }
}

export const getMadeForYou = async (req, res, next) => {
    try {
        // Fetch 4 songs from the database
        const madeForYou = await Song.aggregate([
            {
                $sample : { size : 6},
            },
            {
                $project : {
                    _id : 1,
                    title : 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])

        res.status(200).json(madeForYou);
        
    } catch (error) {
        console.error("Error fetching featured song:", error);
        next(error);
        
    }
}

export const getTrendingSongs = async (req, res, next) => {

    try {
        // Fetch 4 songs from the database
        const trenddingSongs = await Song.aggregate([
            {
                $sample : { size : 5},
            },
            {
                $project : {
                    _id : 1,
                    title : 1,
                    artist : 1,
                    imageUrl : 1,
                    audioUrl : 1,
                }
            }
        ])

        res.status(200).json(trenddingSongs);
        
    } catch (error) {
        console.error("Error fetching featured song:", error);
        next(error);
        
    }
}