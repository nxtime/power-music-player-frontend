<script lang="ts">
  import { randomTrackIcon, sequenceTrackIcon, repeatTrackIcon, nextTrackIcon, previousTrackIcon, playTrackIcon, pauseTrackIcon } from "$lib/icons/soundbar";
  import { formatTime } from "$lib/utils/format-number";

  import { audioStore, type AudioState } from '$lib/store/create-audio.store';
	import { albumStore, handleNextTrack, handlePreviousTrack } from "$lib/store/album.store";
  import { TrackSequence } from "../../interfaces/music";

  const trackSequenceIcons: Record<TrackSequence, string> = {
    [TrackSequence.Random]: randomTrackIcon,
    [TrackSequence.Sequence]: sequenceTrackIcon,
    [TrackSequence.Repeat]: repeatTrackIcon,
  }

  const { song } = $audioStore;
  
  const handleChange = (event: any) => {
    audioStore.setVolume(Number(event.target.value) / 100);
  }

  const handleSeekChange = (event: any) => {
    audioStore.seek(Number(event.target.value));
  }

  let image = "";
  let defaultImage = "";
  let currentVolume = 0;

  let progress = 0;

  let currentTrackSequenceIcon = "";

  audioStore.subscribe(({ currentTime, duration, song, album, volume, trackSequence }) => {
    progress = currentTime * 100 / duration;

    currentVolume = volume * 100;

    if (trackSequence !== currentTrackSequenceIcon) {
      currentTrackSequenceIcon = trackSequenceIcons[trackSequence];
    }

    if (song && album) {
      const normalizedAlbum = album.replaceAll(" ", "-").toLowerCase();
      const normalizedSong = song.replaceAll(" ", "-").toLowerCase();
      
      image = `https://s3.marcospaulo.dev.br/${normalizedAlbum}/${normalizedSong}.jpg`;
      defaultImage = `https://s3.marcospaulo.dev.br/${normalizedAlbum}/${normalizedAlbum}.jpg`;
    }
  });
 
  albumStore.subscribe(console.log);
  
  const isFav = false;
</script>

{#if $audioStore.song}
<div class="soundbar-container">
  <div class="soundbar-info">
    {@html `<img class="cover-image" src="${image}" alt="${song}" title="${song}" width="52px" height="52px" onerror="this.error=null;this.src='${defaultImage}'" />`}
    <div class="song-info">
      <div class="song-actions">
        <span class="song-name">{$audioStore.song}</span>
        <button type="button" class="song-favorite" title="Favorite">
          {#if isFav}
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" fill-rule="evenodd" d="M4.222 5.364A6.002 6.002 0 0 1 12 4.758a6.002 6.002 0 0 1 7.778 9.091l-5.657 5.657a3 3 0 0 1-4.242 0L4.222 13.85a6 6 0 0 1 0-8.485" clip-rule="evenodd" />
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19.071 13.142L13.414 18.8a2 2 0 0 1-2.828 0l-5.657-5.657A5 5 0 1 1 12 6.072a5 5 0 0 1 7.071 7.07" />
            </svg>
          {/if}
        </button>
        <button type="button" class="song-more-action">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
            <path fill="currentColor" d="M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3" />
          </svg>
        </button>
      </div>
      <a href={`/artists/${$audioStore.album}`} title="Check artist">
        {$audioStore.album}
      </a>
      <a href={`/playlists/${$audioStore.album}`} title="Check playlist">
        {$audioStore.album}
      </a>
    </div>
  </div>
  <div class="soundbar-controls">
    <div class="soundbar-controls-superior">
      <button type="button" title="Enable random tracks" on:click={audioStore.changeTrackSequence}>
        {@html currentTrackSequenceIcon}
      </button>
      <button 
        type="button" 
        title="Previous track" 
        on:click={handlePreviousTrack} 
      >
        {@html previousTrackIcon}
      </button>
      <button type="button" title={$audioStore.isPlaying ? 'Pause' : 'Play'} on:click={$audioStore.isPlaying ? audioStore.pauseAudio : audioStore.resumeAudio}>
        {#if $audioStore.isPlaying}
          {@html pauseTrackIcon}
        {:else}
          {@html playTrackIcon}
        {/if}
      </button>
      <button type="button" title="Next track" on:click={handleNextTrack}>
        {@html nextTrackIcon}
      </button>
      <button type="button" title="Repeat track" disabled>
        {@html repeatTrackIcon}
      </button>
    </div>
    <div class="soundbar-controls-inferior">
      <span class="time song-time-elapsed">{formatTime($audioStore.currentTime)}</span>
      <input
        class="progress"
        type="range"
        min="0"
        max={$audioStore.duration}
        step="1"
        bind:value={currentVolume}
        style={`--percentage: ${progress}`}
        on:input={handleSeekChange}
      />
      <span class="time song-time">{formatTime($audioStore.duration)}</span>
    </div>
  </div>
  <div class="soundbar-actions">
    <input
      class="progress"
      type="range"
      min="0"
      max="100"
      step="1"
      title={`Volume ${currentVolume}%`}
      bind:value={currentVolume}
      style={`--percentage: ${currentVolume}`}
      on:input={handleChange}
    />
  </div>
</div>
{/if}

<style>
  .progress {
    cursor: pointer;
    position: relative;
    height: 4px;
    appearance: none;
    width: 100%;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: none;
      height: 2px;
      width: 2px;
    }

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: hsl(var(--surface-0));
      border-radius: var(--rounded-full);
    }

    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      width: calc(var(--percentage) * 1%);
      height: 100%;
      background-color: hsl(var(--accent));
      border-radius: var(--rounded-full);
    }

    &:hover::after {
      background-color: hsl(var(--accent) / 0.75);
    }
  }

  .soundbar-container {
    font-size: var(--font-sm);
    height: 5rem;
    min-height: 5rem;
    padding: var(--spacing-sm);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    
    border-top: solid 1px hsl(var(--surface-0));

    & .soundbar-info {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      text-overflow: ellipsis;
      max-width: 15rem;
      overflow: hidden;

      & .cover-image {
        --size: 52px;
        width: var(--size);
        height: var(--size);
        object-fit: cover;
        border-radius: var(--rounded-md);

        &:hover {
          filter: brightness(0.7);
        }
      }

      & a {
        color: hsl(var(--subtext-1));
      }

      & .song-info {
        display: flex;
        flex-direction: column;
        text-overflow: ellipsis;
        white-space: nowrap;

        & .song-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);

          & button {
            display: flex;
            align-items: center;
          }

          & .song-name {
            margin-right: auto;
            font-weight: var(--font-bold);
          }
        }
      }
    }

    & .soundbar-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: var(--font-2xl);
      flex: 1;
      
      & .soundbar-controls-superior {
        display: flex;
        align-items: center;

        & button {
          height: 2.5rem;
          display: flex;
          align-items: center;

          &:disabled {
            cursor: unset;
            color: hsl(var(--surface-0));
          }
        }

        & button:hover:not(:disabled) svg {
            color: hsl(var(--subtext-1));
        }
      }

      & .soundbar-controls-inferior {
        width: 100%;
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding-inline: var(--spacing-xl);

        & .time {
          font-family: 'Roboto Mono';
          font-size: var(--font-sm);
        }

        & .progress-bar {
          --transition-properties: width;
          position: relative;
          height: 4px;
          background-color: hsl(var(--surface-0));
          border-radius: var(--rounded-full);
          overflow: hidden;
          width: 100%;

          &::before {
            content: "";
            position: absolute;
            height: 100%;
            width: var(--progress);
            background-color: hsl(var(--accent));
            transition: var(--transition);
          }
        }
      }
    }

    & .soundbar-actions {
      max-width: 200px;
    }
  }

  @media (max-width: 30rem) {
    .soundbar-container {
      flex-direction: column;
      height: 12rem;
      gap: 0.5rem;

    }

    .soundbar-container .soundbar-info,
    .soundbar-container .soundbar-controls {
      min-width: 100%;
    }

    .soundbar-container .soundbar-info .song-info {
      font-size: var(--font-md);
      width: 100%;
    }
  }
</style>
