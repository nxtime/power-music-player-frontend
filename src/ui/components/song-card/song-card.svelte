<script lang="ts">
  import { playTrackIcon } from "$lib/icons/soundbar";
    import { albumStore } from "$lib/store/album.store";
  import { audioStore } from "$lib/store/create-audio.store";

  export let name: string;
  export let cover: string;
  export let defaultCover: string;
  export let album: string;
  export let index: number = 0;

  const startSong = () => {
    albumStore.update((state) => ({ ...state, album, currentSongName: name, currentSongIndex: index }));
    audioStore.playAudio(album, name);
  }
</script>
<li class="song-card">
  <button type="button" class="play-action" on:click={startSong}>
    {@html playTrackIcon}
  </button>
  {@html `<img src="${cover}" alt="${name}" onerror="this.onerror=null;this.src='${defaultCover}';" />`}
  <div class="song-card-info">
    <h3 class="title">{name}</h3>
    <h5 class="subtitle">{album}</h5>
  </div>
</li>
<style>
  .song-card {
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    position: relative;
    border-radius: var(--rounded-md);
    overflow: hidden;

    & .play-action {
      position: absolute;
      z-index: 10;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-origin: center;
      transform: scale(0);

      font-size: var(--spacing-2xl);
      transition: all ease 0.2s;
    }

    &:hover .play-action {
      transform: scale(1);
    }

    & img {
      aspect-ratio: 1/1;
      max-width: 100%;
      transition: all ease 0.2s;
    }

    &:hover img {
      transform: scale(1.5);
      filter: brightness(0.5);
    }

    & .song-card-info {
      position: absolute;
      width: 100%;
      bottom: 0;
      overflow: hidden;
      padding: var(--spacing-sm);
      background-color: hsl(var(--crust) / 0.4);
      backdrop-filter: blur(4px);

      & .title {
        font-size: clamp(0.75rem, calc(1vw + 0.25rem), 1.5rem);
        line-height: calc(0.75em + 0.25vw);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      & .subtitle {
        font-size: clamp(0.4125rem, calc(1vw + 0.125rem), 1rem);
        line-height: calc(0.75em + 0.33vw);
        color: hsl(var(--subtext-1));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
