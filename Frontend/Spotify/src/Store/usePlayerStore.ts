import { create } from "zustand";
import { Song } from "@/types";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  initilizeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], index: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,

  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id);

    set({
      currentSong: get().queue[songIndex] || null,
      currentIndex: songIndex !== -1 ? songIndex : 0,
      isPlaying: true,
    });
  },
  setIsPlaying: (isPlaying) => set({ isPlaying }),

  initilizeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentIndex: get().currentIndex || 0,
      currentSong: songs[get().currentIndex] || null,
    });
  },

  playAlbum: (songs: Song[], index=0) => {
    console.log(songs,index);
    if (songs.length === 0) {
      return
    };

    set({
      queue: songs,
      currentIndex: index,
      currentSong: songs[index],
      isPlaying: true,
    });
  },

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  playNext: () =>
    set((state) => {
      const nextIndex = (state.currentIndex + 1) % state.queue.length;
      return {
        currentSong: state.queue[nextIndex],
        currentIndex: nextIndex,
        isPlaying: true,
      };
    }),

  playPrevious: () =>
    set((state) => {
      const prevIndex =
        (state.currentIndex - 1 + state.queue.length) % state.queue.length;
      return {
        currentSong: state.queue[prevIndex],
        currentIndex: prevIndex,
        isPlaying: true,
      };
    }),
}));
