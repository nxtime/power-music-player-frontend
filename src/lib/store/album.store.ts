import { get, writable } from "svelte/store";
import { audioStore } from "./create-audio.store";
import { TrackSequence } from "../../interfaces/music";

export interface AlbumState {
  albums?: any[],
  album?: string;
  songs: { name: string, album: string }[],
  currentSongName: string;
  currentSongIndex: number;
}

const getRandomAlbum = () => {
  const albums = get(albumStore)?.albums!;

  return albums[Math.floor(Math.random() * albums.length)];
}

const sequenceNextTrack = (songsQty: number) => {
  const tempNextSongIndex = get(albumStore).currentSongIndex + 1;

  const nextSongIndex = tempNextSongIndex > songsQty - 1 ? 0 : tempNextSongIndex;

  return nextSongIndex;
}

const randomNextTrack = (songsQty: number) => {
  const randomSong = Math.floor(Math.random() * songsQty);

  return randomSong;
}

const repeatNextTrack = () => {
  return get(albumStore).currentSongIndex;
}

console.log({ trackSequence: TrackSequence })

const nextTrackActions: Record<TrackSequence, (songQty: number) => number> = {
  [TrackSequence.Random]: randomNextTrack,
  [TrackSequence.Sequence]: sequenceNextTrack,
  [TrackSequence.Repeat]: repeatNextTrack
}

export const handleNextTrack = () => {
  const songsQty = get(albumStore).songs.length;

  const nextSongIndex = nextTrackActions[get(audioStore).trackSequence](songsQty);

  console.log({ nextSongIndex, order: get(audioStore).trackSequence });

  const nextSong = get(albumStore).songs[nextSongIndex];

  const currentAlbum = get(albumStore).songs[nextSongIndex].album;

  albumStore.update((prevState) => ({ ...prevState, currentSongIndex: nextSongIndex, currentSongName: nextSong.name }));
  audioStore.playAudio(currentAlbum, nextSong.name);
}

export const handlePreviousTrack = () => {
  const tempPreviousSongIndex = get(albumStore).currentSongIndex - 1;

  const previousSongIndex = tempPreviousSongIndex < 0 ? get(albumStore).songs.length - 1 : tempPreviousSongIndex;

  console.log({ tempPreviousSongIndex, previousSongIndex})

  const previousSong = get(albumStore).songs[previousSongIndex];

  albumStore.update((prevState) => ({ ...prevState, currentSongIndex: previousSongIndex, currentSongName: previousSong.name }));

  const currentAlbum = get(albumStore).songs[previousSongIndex].album;

  audioStore.playAudio(currentAlbum, previousSong.name);
}

export const albumStore = writable<AlbumState>({
  songs: [],
  currentSongName: "",
  currentSongIndex: -1
});
