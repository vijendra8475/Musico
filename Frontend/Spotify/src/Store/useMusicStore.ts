import { axiosInstance } from '@/lib/axios'
import { Album, Song } from '@/types'
import { create } from 'zustand'

interface MusicStore {
    songs : Song[],
    albums : Album[],
    isLoading : boolean,
    error : string | null,
    currentAlbum : Album | null,
    featuredSongs : Song[],
    madeForYouSongs : Song[],
    trendingSongs : Song[],

    fetchAlbum : () => Promise<void>,
    fetchAlbumById : (id : string) => Promise<void>
    fetchTrendingSongs : () => Promise<void>,
    fetchMadeForYouSongs : () => Promise<void>,
    fetchFeaturedSongs : () => Promise<void>
}

export const useMusicStore = create<MusicStore>(set => ({
    songs : [],
    albums : [],
    isLoading : false,
    error : null,
    currentAlbum : null,
    featuredSongs : [],
    madeForYouSongs : [],
    trendingSongs : [],

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
    },
    fetchFeaturedSongs : async () => {
        set({ isLoading : true, error : null })

        try {
            const response = await axiosInstance.get('/song/featured');
            set({ featuredSongs : response.data })
        } catch (error : any) {
            set({ error : error.response.data.message })
        } finally {
            set({ isLoading : false })
        }
    },
    fetchMadeForYouSongs : async () => {
        set({ isLoading : true, error : null })

        try {
            const response = await axiosInstance.get('/song/made-for-you');
            set({ madeForYouSongs : response.data })
        } catch (error : any) {
            set({ error : error.response.data.message })
        } finally {
            set({ isLoading : false })
        }
    },
    fetchTrendingSongs : async () => {
        set({ isLoading : true, error : null })

        try {
            const response = await axiosInstance.get('/song/trending');
            set({ trendingSongs : response.data })
        } catch (error : any) {
            set({ error : error.response.data.message })
        } finally {
            set({ isLoading : false })
        }
    }
}))