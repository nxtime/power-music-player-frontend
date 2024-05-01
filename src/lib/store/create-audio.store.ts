import { api } from '$lib/api';
import { get, writable, type Writable } from 'svelte/store';
import { handleNextTrack } from './album.store';
import { TrackSequence } from '../../interfaces/music';

export interface AudioState {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
  album?: string;
  song?: string;
  artist?: string;
  currentTime: number;
  duration: number;
  volume: number;
  trackSequence: TrackSequence;
}

const TrackSequenceOrder: Record<TrackSequence, TrackSequence> = {
  [TrackSequence.Random]: TrackSequence.Sequence,
  [TrackSequence.Sequence]: TrackSequence.Repeat,
  [TrackSequence.Repeat]: TrackSequence.Random
}

interface AudioStore extends Writable<AudioState> {
  playAudio(album: string, song: string): void;
  pauseAudio(): void;
  resumeAudio(): void;
  setVolume(value: number): void;
  seek(seconds: number): void;
  changeTrackSequence(): void
}

const defaultAudioState: AudioState  = {
    audioElement: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    trackSequence: TrackSequence.Sequence
  }

const createAudioStore = (): AudioStore => {
  const { subscribe, set, update } = writable<AudioState>(defaultAudioState);

  let intervalId: any;

  const playAudio = async (album: string, song: string,) => {
    const { data } = await api(`/albums/${album}/${song}`, {
      responseType: 'blob'
    });

    const url = URL.createObjectURL(data);
    
    if (intervalId) {
      clearInterval(intervalId);
    }

    update((state) => {
      if (state.isPlaying && state.audioElement) {
        state.audioElement.pause();
        state.audioElement.remove();
      }

      return {
        ...defaultAudioState,
        trackSequence: state.trackSequence,
        volume: state.volume
      };
    });

    const storeAudioElement = get(audioStore).audioElement;

    if (!!storeAudioElement) {
      storeAudioElement.pause();
      storeAudioElement.remove();
    }

    const audioElement = new Audio(url);

    audioElement.addEventListener('timeupdate', () => {
      if (get(audioStore).duration === audioElement.currentTime) {
        handleNextTrack();
      }

      update((state) => { 
        return {...state, currentTime: audioElement.currentTime } 
      });
    })

    audioElement.play();

    audioElement.volume = get(audioStore).volume;

    intervalId = setInterval(() => {
      update((state) => ({ ...state, duration: audioElement.duration }))
    })

    update((state) => ({ ...state, audioElement, song, album, isPlaying: true }));
  };

  const pauseAudio = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    update((state) => {
      console.log("Should be stopping the audio");

      if (state.audioElement) {
        state.audioElement.pause();
      }
      return { ...state, isPlaying: false }
    });
  };

  const resumeAudio = () => {
    audioStore.update((state) => {
      if (state.audioElement && !state.isPlaying) {
        state.audioElement.play();
        const intervalId = setInterval(() => {
          audioStore.update((state) => {
            if (state.audioElement) {
              state.currentTime = state.audioElement.currentTime;
            }
            return state;
          });
        }, 1000);
        return { ...state, isPlaying: true, intervalId };
      }
      return state;
    });
  };

  const setVolume = (value: number) => {
    update((state) => {
      if (state.audioElement) {
        state.audioElement.volume = value;
      }
      return { ...state, volume: value }
    });
  };

  const seek = (seconds: number) => {
    update((state) => {
      if(state.audioElement) {
        state.audioElement.currentTime = seconds;
      }

      return state;
    })
  };

  const changeTrackSequence = () => update((state) => ({...state, trackSequence: TrackSequenceOrder[state.trackSequence] }))

  return {
    subscribe,
    update,
    set,
    playAudio,
    pauseAudio,
    resumeAudio,
    setVolume,
    seek,
    changeTrackSequence
  };
};

export const audioStore = createAudioStore();

