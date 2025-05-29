import FeaturedGridSkeleton from "@/components/skeletons/featuredSongsSkeleton";
import { useMusicStore } from "@/Store/useMusicStore";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();
  if (isLoading) return <FeaturedGridSkeleton />;

  if (error) {
    return <div className='text-red-500 text-center'>Error: {error}</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
      {featuredSongs.map((song) => (
        <div key={song._id} className='flex items-center bg-zinc-800/50 rounded-md relative group shadow-lg shadow-black/20'>
          <img src={song.imageUrl} alt={song.title} className='w-16 sm:w-20 h-16 sm:h-20 flex-shrink-0' />
          <div className='flex-1 p-4'>
            <h3 className='text-white font-semibold'>{song.title}</h3>
            <p className='text-zinc-400'>{song.artist}</p>
          </div>
            <div className='absolute bottom-4 right-2 opacity-0 group-hover:opacity-100 transition'>
            <div className='p-2 sm:p-3 bg-green-500 rounded-full hover:scale-105 transition'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
              </svg>
            </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
