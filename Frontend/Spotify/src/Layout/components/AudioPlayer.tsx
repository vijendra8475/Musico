import { usePlayerStore } from "@/Store/usePlayerStore";
import { useEffect, useRef } from "react"

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const prevSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext } = usePlayerStore()

    // handle play/pause login
    useEffect(() => {
        if(isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying])

    // handle song end
    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            playNext();
        }

        audio?.addEventListener('ended', handleEnded);
        return () => {
            audio?.removeEventListener('ended', handleEnded);
        }
    }, [playNext])

    // handle song change
    useEffect(() => {
        if( !audioRef.current || !currentSong ) return;
        const audio  = audioRef.current;

        // check if the song has changed
        const isSongChanged = prevSongRef.current !== currentSong?.audioUrl;

        if(isSongChanged) {
            audio.src = currentSong?.audioUrl;
            // reset the audio element
            audio.currentTime = 0;

            prevSongRef.current = currentSong?.audioUrl;
            if(isPlaying) {
                audio.addEventListener('loadeddata', () => {
                    audio.play().catch(error => console.log("Playback error:", error));
                }, { once: true });
            }
        }
    },[ isPlaying, currentSong ]);
    

    
  return (
   <audio ref={audioRef} />
  )
}

export default AudioPlayer
