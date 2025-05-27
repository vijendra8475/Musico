import { Song } from '../models/song.model.js'
import { Album } from  '../models/album.model.js'
import cloudinary from 'cloudinary'


const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            resource_type: 'auto',
        })
        return result.secure_url
    } catch (error) {
        console.error('Error uploading to Cloudinary', error)
        throw new Error('Error uploading file to Cloudinary');
    }
}


export const  createSong = async (req, res, next) => {
    try {
        if(!req.files || !req.files.audioFile || ! req.files.imageFile) {
            return res.status(400).json({message : 'Please upload all files'})
        }

        const { title, artist, albumId, duration} = req.body
        const { audioFile, imageFile} = req.files;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song( {
            title,
            artist,
            imageUrl,
            audioUrl,
            duration,
            albumId : albumId || null
        })

        await song.save();

        if(albumId) {
            await Album.findByIdandUpdate(albumId, {
                $push : {
                    song : song._id
                }
            })
        }

        res.status(200).json(song)

    } catch (error) {
        console.log('Error in createSong', error);
        res.status(500).json({message : 'Internal Server Error in admin.controller.js', error})
        next(error)   
    }
};

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params

        // Firstly find the song
        const song = await Song.findById(id)

        // if song belongs to album, remove the song from the album
        if(song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull : {
                    song : song._id
                }
            })
        }

        // delete the song from the database
        await Song.findByIdAndDelete(id)

        res.status(200).json({message : 'Song deleted successfully'})

    } catch (error) {
        console.error('Error in deleteSong', error);
        next(error)
    }
}


export const createAlbum = async (req, res, next) => {
    try {
        const { artist, title, releaseDate } = req.body;
        const { imageFile } = req.files;

        const album = new Album({
            artist,
            title,
            releaseDate,
            imageUrl: await uploadToCloudinary(imageFile),
        })

        await album.save();

        res.status(200).json(album)
    } catch (error) {
        console.error('Error in createAlbum', error);
        next(error)
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {   
        //  extract album id from params
        const { id } = req.params;
        const album = await Album.findById(id);

        if(!album) {
            return res.status(404).json({message : 'Album not found'})
        }
        // delete all songs in the album
        await Song.deleteMany({ albumId : id});
        // delete the album
        await Album.findByIdAndDelete(id);

        res.status(200).json({message : 'Album deleted successfully'});

    } catch (error) {
        console.error('Error in deleteAlbum', error);
        next(error)
        
    }
}


export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin : true });
}