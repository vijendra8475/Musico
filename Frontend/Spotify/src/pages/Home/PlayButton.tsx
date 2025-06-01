import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/Store/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";


const PlayButton = ({ song, queue } : { song : Song, queue : Song[] }) => {
	
	// Get the player store methods
	const { initilizeQueue, setCurrentSong, isPlaying, currentSong } = usePlayerStore();
    const isCurrentSong = currentSong?._id === song._id

	const handelPlaySong = (index: number) => () => {
    
    // if (!featuredSongs || featuredSongs.length === 0) return;
    // Set the current song and play it
    const song = queue[index];

    if(currentSong === song && isPlaying) {
      // If the song is already playing, toggle play
      usePlayerStore.getState().togglePlay();
      console.log("Toggling play for song:", song.title);
      return;
    }

    if (song) {
      // Assuming you have a method to set the current song in your player store
      usePlayerStore.getState().setCurrentSong(song);
      console.log("Playing song:", song.title);
      initilizeQueue(queue);
      setCurrentSong(song);
    }
  }

  return (
    <Button
			size={"icon"}
			onClick={handelPlaySong(queue.indexOf(song))}
			className={`cursor-pointer absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
				opacity-0 translate-y-2 group-hover:translate-y-0 ${
					isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
				}`}
		>
			{isCurrentSong && isPlaying ? (
				<Pause className='size-5 text-black' />
			) : (
				<Play className='size-5 text-black' />
			)}
		</Button>
  )
}

export default PlayButton
