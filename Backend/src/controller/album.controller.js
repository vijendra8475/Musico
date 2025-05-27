import { Album } from "../models/album.model.js"

export const getAlbumById = async (req, res, next) => {
   try {
    const { albumId } = req.params;
    // populate will replace the song ids with the actual song objects
    const album = await Album.findById(albumId).populate('songs');

    // if album is not found, return 404 error
    if(!album) {
        return res.status(404).json({ message: "No albums found" });
    }

    // if album is found, return 200 status code and the album object
    res.status(200).json(album);
   } catch (error) {
    next(error)
   }
}

export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        next(error)
    }
}