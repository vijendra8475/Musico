import { create } from "zustand";
import { Song } from "@/types";
import { useChatStore } from "./useChatStore";

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

    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }

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

  playAlbum: (songs: Song[], index = 0) => {
    console.log(songs, index);
    if (songs.length === 0) {
      return;
    }
    const song = songs[index];

    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      });
    }

    set({
      queue: songs,
      currentIndex: index,
      currentSong: songs[index],
      isPlaying: true,
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;
  
    const currentSong = get().currentSong;
    const socket = useChatStore.getState().socket
    socket.emit('update_activity', {
      userId : socket.auth.userId,
      activity : willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : 'Not playing',
    })

    set({ isPlaying : willStartPlaying })
  },

  playNext: () => {
    set((state) => {
      const nextIndex = (state.currentIndex + 1) % state.queue.length;
      const nextSong = get().queue[nextIndex];

      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
        });
      }

      return {
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      };
    });
  },

  playPrevious: () =>
    set((state) => {
      const prevIndex = (state.currentIndex - 1 + state.queue.length) % state.queue.length;
      const prevSong = get().queue[prevIndex]

      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
        });
      }

      return {
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      };
    }),
}));
