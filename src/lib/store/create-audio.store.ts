import { api } from '$lib/api';
import { get, writable, type Writable } from 'svelte/store';

export interface AudioState {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
  album?: string;
  song?: string;
  artist?: string;
  currentTime: number;
  duration: number;
  volume: number;
}

interface AudioStore extends Writable<AudioState> {
  playAudio: (album: string, song: string) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  setVolume: (value: number) => void;
  seek: (seconds: number) => void;
}
const defaultAudioState = {
    audioElement: null,
    song: undefined,
    album: undefined,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1
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
        state.audioElement.remove();
      }

      return defaultAudioState;
    });

    const audioElement = new Audio(url);

    audioElement.addEventListener('timeupdate', () => {
      update((state) => ({ ...state, currentTime: audioElement.currentTime }));
    })

    audioElement.play();

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
        state.audioElement.pause();
      }
      return { ...state, volume: value }
    });
  };

  const seek = (seconds: number) => {
    update((state) => {
      if(state.audioElement) {
        state.audioElement.currentTime += seconds;
      }

      return state;
    })
  };

  return {
    subscribe,
    update,
    set,
    playAudio,
    pauseAudio,
    resumeAudio,
    setVolume,
    seek
  };
};

export const audioStore = createAudioStore();

