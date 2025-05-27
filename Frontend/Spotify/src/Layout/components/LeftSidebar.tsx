import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton"
import { buttonVariants } from "@/components/ui/button"
import { useMusicStore } from "@/Store/useMusicStore"
import { cn } from "@/lib/utils"
import { SignedIn } from "@clerk/clerk-react"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { HomeIcon, Library, MessageCircle } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const LeftSidebar = () => {
    const { albums, isLoading, fetchAlbum } = useMusicStore();

    // fetching albums
    useEffect(() => {
        fetchAlbum();
    }, [fetchAlbum])
    
    console.log({ albums });
    


  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation Menu */}

      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
            <Link to={'/'} className={cn(
                buttonVariants({
                    variant : 'ghost',
                    className : 'w-full justify-start text-white hover:bg-zinc-700'
                })
            )}>
                <HomeIcon className="mr-2 size-5" />
                <span className="hidden md:inline">Home</span>
            </Link>

            <SignedIn>
                <Link to={'/chat'} className={cn(
                    buttonVariants({
                        variant : 'ghost',
                        className : 'w-full justify-start text-white hover:bg-zinc-700'
                    })
                )}>
                    <MessageCircle className="size-5 mr-2" />
                    <span className="hidden md:inline">Messages</span>
                </Link>
            </SignedIn>
        </div>
      </div>

      {/* Library Menu */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-white px-2">
                <Library className="mr-2 size-5" />
                <span className="hidden lg:inline">Playlists</span>
            </div>
        </div>

        <ScrollArea>
            <div className="space-y-2">
                {isLoading ? 
                    <PlaylistSkeleton />
                : (
                    albums.map(ele => (
                        <Link 
                            key={ele._id}
                            to={`/albums/${ele._id}`}
                            className="flex gap-3 p-2 hover:bg-zinc-800 rounded-md items-center group cursor-pointer"
                        >
                            <img src={ele.imageUrl} alt="Playlist Picture"
                            className="object-cover rounded-md size-12 flex-shrink-0" />

                            <div className="flex-1 hidden md:block min-w-0">
                                <p className="font-medium truncate">
                                    {ele.title}
                                </p>
                                <p className="text-sm text-zinc-400 truncate">
                                    {ele.artist}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default LeftSidebar
