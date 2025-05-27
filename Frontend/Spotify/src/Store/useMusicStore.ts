import { axiosInstance } from '@/lib/axios'
import { Album, Song } from '@/types'
import { create } from 'zustand'

interface MusicStore {
    songs : Song[],
    albums : Album[],
    isLoading : boolean,
    error : string | null,
    currentAlbum : Album | null,
    fetchAlbum : () => Promise<void>,
    fetchAlbumById : (id : string) => Promise<void>
}

export const useMusicStore = create<MusicStore>(set => ({
    songs : [],
    albums : [],
    isLoading : false,
    error : null,
    currentAlbum : null,
    // featuredSongs : [],
    // madeForYouSongs : [],

    fetchAlbum : async () => {
        set({isLoading : true, error : null})

        try {
            const response = await axiosInstance.get('/album');
            set({ albums : response.data })
        } catch (error : any) {
            set({ error : error.response.data.message})
        }
        finally{
            set({
                isLoading : false
            })
        }
    },
    fetchAlbumById : async (id) => {
        set({ isLoading : true , error : null })
     try {
        const response = await axiosInstance.get(`/album/${id}`);
        set({ currentAlbum : response.data, isLoading : false })
     } catch (error : any) {
        set({ error : error.response.data.message})
     }
     finally {
        set({ isLoading : false });
     }
    }
}))