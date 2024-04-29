<script lang="ts">
  import { sortRandomIcon, nextTrackIcon, repeatTrackIcon, previousTrackIcon, playTrackIcon, pauseTrackIcon } from "$lib/icons/soundbar";
  import { formatTime } from "$lib/utils/format-number";

  import { audioStore, type AudioState } from '$lib/store/create-audio.store';
  

  const { isPlaying, currentTime, duration, volume, song, album } = $audioStore;

  /* const song = {
    name: "Angels",
    cover: "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_album-cover-art-73ab5b3d9b81f442cb2288630ab63acf.jpg?ts%20=%201698245952",
    artist: {
      name: "The XX",
      id: "1232323213",
    },
    playlist: {
      name: "COEXIST",
      id: "123232323"
    },
    time: 124,
    isFav: true
  } */

   const cover = "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_album-cover-art-73ab5b3d9b81f442cb2288630ab63acf.jpg?ts%20=%201698245952";

  let progress = 0;

  audioStore.subscribe(({ currentTime, duration }) => progress = currentTime * 100 / duration)

  const isFav = false;


</script>

{#if $audioStore.song}
<div class="soundbar-container">
  <div class="soundbar-info">
    <img class="cover-image" src={cover} alt={song} title={song} width={52} />
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
      <button type="button" title="Enable random tracks" disabled>
        {@html sortRandomIcon}
      </button>
      <button type="button" title="Previous track">
        {@html previousTrackIcon}
      </button>
      <button type="button" title={$audioStore.isPlaying ? 'Pause' : 'Play'} on:click={$audioStore.isPlaying ? audioStore.pauseAudio : audioStore.resumeAudio}>
        {#if $audioStore.isPlaying}
          {@html pauseTrackIcon}
        {:else}
          {@html playTrackIcon}
        {/if}
      </button>
      <button type="button" title="Next track">
        {@html nextTrackIcon}
      </button>
      <button type="button" title="Repeat track" disabled>
        {@html repeatTrackIcon}
      </button>
    </div>
    <div class="soundbar-controls-inferior">
      <span class="time song-time-elapsed">{formatTime($audioStore.currentTime)}</span>
      <div class="progress-bar" style="--progress: {progress}%"/>
      <span class="time song-time">{formatTime($audioStore.duration)}</span>
    </div>
  </div>
  <div class="soundbar-actions">
    
  </div>
</div>
{/if}

<style>
  .soundbar-container {
    font-size: var(--font-sm);
    height: 5rem;
    padding: var(--spacing-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    
    border-top: solid 1px hsl(var(--surface-0));

    & .soundbar-info {
      display: flex;
      gap: var(--spacing-xs);

      & .cover-image {
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
  }
</style>
