import { writable } from "svelte/store";

export interface AlbumState {
  album: string;
  songs: string[],
  currentSongName: string;
  currentSongIndex: number;
}

export const albumStore = writable<AlbumState>({
  album: "",
  songs: [],
  currentSongName: "",
  currentSongIndex: -1
});
