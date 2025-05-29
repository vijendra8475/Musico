import MadeForYouSkeleton from "@/components/skeletons/madeForYouSkeleton"
import { useMusicStore } from "@/Store/useMusicStore"

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
            <div className='absolute bottom-[15%] right-[5%] opacity-0 group-hover:opacity-100 transition'>
              <div className='p-[8%] bg-green-500 rounded-full hover:scale-105 transition'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[clamp(1rem,2vw,1.5rem)] h-[clamp(1rem,2vw,1.5rem)]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
              </svg>
              </div>
            </div>
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
