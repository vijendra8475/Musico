import { axiosInstance } from '@/lib/axios'
import { Album, Song, Stats } from '@/types'
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
    stats : Stats

    fetchAlbum : () => Promise<void>,
    fetchAlbumById : (id : string) => Promise<void>
    fetchTrendingSongs : () => Promise<void>,
    fetchMadeForYouSongs : () => Promise<void>,
    fetchFeaturedSongs : () => Promise<void>
    fetchSongs : () => Promise<void>
    fetchStats : () => Promise<void>
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
    stats : {
        totalAlbums : 0,
        totalArtists : 0,
        totalSongs : 0,
        totalUsers : 0,
    },

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
    },
    fetchSongs : async () => {

        set({ isLoading : true, error : null})
        try{
            let response = await axiosInstance.get('/song');
            set({ songs : response.data })
        }
        catch(error : any){
            set({ error : error})
        }
        finally{
            set({ isLoading : false })
        }

    },

   fetchStats: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/stats");
			set({ stats: response.data.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

}))