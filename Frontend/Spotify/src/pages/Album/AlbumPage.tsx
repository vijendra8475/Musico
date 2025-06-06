import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/Store/useMusicStore";
import { usePlayerStore } from "@/Store/usePlayerStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const formatDuration = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { currentAlbum, fetchAlbumById, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  const handlePlaySong = (index: number) => {

    if (!currentAlbum) return;
    playAlbum(currentAlbum.songs, index);
  };

  const isCurrentAlbumPlaying = currentAlbum?.songs.some(
    (s) => s._id === currentSong?._id
  );
  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    if (isCurrentAlbumPlaying) {
      togglePlay();
    } else {
      playAlbum(currentAlbum.songs, 0);
    }
  };

  if (isLoading) return null;

  return (
    <div className='h-full'>
      <ScrollArea className='h-full rounded-md overflow-hidden'>
        {/* main-content */}

        <div className='relative min-h-full'>
          {/* bg-gradient */}
          <div
            className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none'
            aria-hidden='true'
          />

          {/* content */}
          <div className='z-10 relative'>
            <div className='flex p-6 gap-6 pb-8'>
              <img
                src={currentAlbum?.imageUrl}
                alt=''
                className='h-[240px] w-[240px] shadow-lg rounded'
              />
              <div className='flex flex-col justify-end'>
                <p className='text-sm font-medium'>Album</p>

                <h1 className='text-7xl font-bold my-4'>
                  {currentAlbum?.title}
                </h1>
                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                  <span className='font-medium text-white'>
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* controls */}
            <div className='px-6 pb-4 flex items-center gap-6'>
              <Button
                size={"icon"}	
                onClick={() => handlePlayAlbum()}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400"
              >
                {isPlaying && isCurrentAlbumPlaying ? (
                  <Pause size={40} fill="currentColor" />
                ) : (
                  <Play size={40} fill="currentColor" />
                )}
              </Button>
            </div>

            {/* table */}
            <div className='bg-black/20 backdrop-blur-sm'>
              {/* table header */}
              <div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5'>
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className='h-4 w-4' />
                </div>
              </div>

              {/* song lists */}
              <div className='px-6'>
                <div className='space-y-2 py-4'>
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer
                      `}>
                        <div className='flex items-center justify-center'>
                          {isCurrentSong && isPlaying ? (
                            <div className='size-4 text-green-500'>♫</div>
                          ) : (
                            <span className='group-hover:hidden'>
                              {index + 1}
                            </span>
                          )}
                          <Play className='h-4 w-4 hidden group-hover:block' />
                        </div>

                        <div className='flex items-center gap-3'>
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className='size-10'
                          />

                          <div>
                            <div className={`font-medium text-white`}>
                              {song.title}
                            </div>
                            <div>{song.artist}</div>
                          </div>
                        </div>

                        <div className='flex items-center'>
                          {song.createdAt.split("T")[0]}
                        </div>
                        <div className='flex items-center'>
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
