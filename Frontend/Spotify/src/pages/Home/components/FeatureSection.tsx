import FeaturedGridSkeleton from "@/components/skeletons/featuredSongsSkeleton";
import { useMusicStore } from "@/Store/useMusicStore";
import PlayButton from "../PlayButton";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();
  
  if (isLoading) return <FeaturedGridSkeleton />;

  if (error) {
    return <div className='text-red-500 text-center'>Error: {error}</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className='flex items-center bg-zinc-800/50 rounded-md relative group shadow-lg shadow-black/20 cursor-pointer hover:bg-zinc-800 transition'>
          <img
            src={song.imageUrl}
            alt={song.title}
            className='w-16 sm:w-20 h-16 sm:h-20 flex-shrink-0'
          />
          <div className='flex-1 p-4'>
            <h3 className='text-white font-semibold'>{song.title}</h3>
            <p className='text-zinc-400'>{song.artist}</p>
          </div>
          <PlayButton song={song} queue={featuredSongs} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
