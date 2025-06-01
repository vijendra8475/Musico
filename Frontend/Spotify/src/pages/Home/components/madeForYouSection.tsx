import MadeForYouSkeleton from "@/components/skeletons/madeForYouSkeleton"
import { useMusicStore } from "@/Store/useMusicStore"
import PlayButton from "../PlayButton"

const MadeForYouSection = () => {
  const { isLoading, madeForYouSongs, error } = useMusicStore()
  if( isLoading ) return <MadeForYouSkeleton />

  if (error) {
    return <div className='text-red-500 text-center'>Error: {error}</div>
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Made For You</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
      {madeForYouSongs.map((song) => (
        <div key={song._id} className='bg-neutral-800/65 p-4 rounded-lg hover:bg-neutral-700 transition cursor-pointer group relative'>
          <div className='relative'>
            <img 
              src={song.imageUrl} 
              alt={song.title} 
              className='w-full aspect-square object-cover rounded-lg mb-4'
            />
            <PlayButton song={song} queue={madeForYouSongs} />
          </div>
          <h3 className='font-semibold truncate'>{song.title}</h3>
          <p className='text-sm text-gray-400 truncate'>{song.artist}</p>
        </div>
      ))}
      </div>
    </div>
  )
}

export default MadeForYouSection
