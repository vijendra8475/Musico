import { useAuthStore } from '@/Store/useAuthStore'
import { Dashboard } from './Components/Dashboard';
import { Header } from './Components/Header';
import { Album, Music } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SongsTabConetent } from './Components/SongsTabConetent';
import { AlbumTabContent } from './AlbumTabContent';
import { useEffect } from 'react';
import { useMusicStore } from '@/Store/useMusicStore';


export const AdminPage = () => {
    const { isLoading, isAdmin } = useAuthStore();

    const { fetchAlbum, fetchSongs, fetchStats } = useMusicStore()

    useEffect(() => {
        fetchSongs();
        fetchAlbum();
        fetchStats()
    }, [])


    if (!isLoading && !isAdmin) return <div>Access Denied</div>;
    return (
        <div className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8'>
            <Header />

            <Dashboard />

            <Tabs defaultValue='songs' className='space-y-6' >
                <TabsList className='p-1 bg-zinc-800/50'>
                    <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700'>
                        <Music className='mr-2 size-4' />
                        Songs
                    </TabsTrigger>

                    <TabsTrigger value='album' className='data-[state=active]:bg-zinc-700'>
                        <Album className='mr-2 size-4' />
                        Album
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='songs'>
                    <SongsTabConetent />
                </TabsContent>
                <TabsContent value='album'>
                    <AlbumTabContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}
