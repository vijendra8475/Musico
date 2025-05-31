import FeaturedGridSkeleton from "@/components/skeletons/featuredSongsSkeleton";
import { useMusicStore } from "@/Store/useMusicStore";
import { usePlayerStore } from "@/Store/usePlayerStore";
import { useEffect } from "react";
import PlayButton from "../PlayButton";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error, fetchFeaturedSongs } = useMusicStore();
  const { initilizeQueue, setCurrentSong, isPlaying } = usePlayerStore();
  
  useEffect(() => {
      fetchFeaturedSongs();
    }, []);

  const handelPlaySong = (index: number) => () => {
    
    if (!featuredSongs || featuredSongs.length === 0) return;
    // Set the current song and play it
    const song = featuredSongs[index];

    if(isPlaying && song) {
      // If the song is already playing, toggle play
      usePlayerStore.getState().togglePlay();
      console.log("Toggling play for song:", song.title);
      return;
    }

    if (song) {
      // Assuming you have a method to set the current song in your player store
      usePlayerStore.getState().setCurrentSong(song);
      console.log("Playing song:", song.title);
      initilizeQueue(featuredSongs);
      setCurrentSong(song);
 
    }
  }
  if (isLoading) return <FeaturedGridSkeleton />;

  if (error) {
    return <div className='text-red-500 text-center'>Error: {error}</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
      {featuredSongs.map((song, index) => (
        <div
          key={song._id}
          onClick={handelPlaySong(index)}
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
          <PlayButton song={song} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
