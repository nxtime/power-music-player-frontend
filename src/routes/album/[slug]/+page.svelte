<script lang="ts">
	import type { Album } from "../../../interfaces/music";
  import { playTrackIcon } from "$lib/icons/soundbar";
  import { audioStore } from '$lib/store/create-audio.store';


  const { isPlaying } = $audioStore;

  console.log({ isPlaying });

  export let data: Album;

  const { cover, name, songs } = data;

  const album = name;

</script>

<div class="album-container">
  <div class="album-banner-container">
    <header class="album-banner-header">
      <div class="header-navigation">
        <button type="button">
          {"<"}
        </button>
        <button type="button">
          {">"}
        </button>
      </div>
    </header>
    <div class="album-banner">
      <img src="data:image/jpeg;base64,{cover}" alt={name} />
      <div class="album-banner-info">
        <span class="subtitle">Playlist</span>
        <h2 class="title">Mix de {album}</h2>
        <span>{songs.length} songs</span>
      </div>
    </div>
  </div>
  <div class="container">
    <ul class="songs-container">
      {#each songs as { name, cover }}
        <li class="song-item">
          <img src={cover} alt={name} width={64} />
          <div class="song-info">
            <span>{name}</span>
          </div>
          <div class="song-control">
            <button type="button" on:click={() => audioStore.playAudio(album, name)}>
              {@html playTrackIcon}
            </button>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .album-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    background-image: linear-gradient(hsl(var(--accent)) 0%, transparent 60%);

    & .album-banner-container {
      display: flex;
      flex-direction: column;
      padding: var(--spacing-md);
      height: 30vh;
      overflow: hidden;
      justify-content: space-between;
      padding-block: var(--spacing-md);

      & .album-banner-header {
        display: flex;
      }

      & .album-banner {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);

        & img {
          --size:  15vh;
          width: var(--size);
          height: var(--size);
          object-fit: cover;
          border-radius: var(--rounded-md);
        }
      }
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    backdrop-filter: blur(5px);
    padding: var(--spacing-md);
    background-color: hsl(var(--base) / 0.5);
    flex: 1;

    & header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & span {
        color: hsl(var(--subtext-0));
      }
    }

    & .songs-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);

      & .song-item {
        position: relative;
        display: flex;
        align-items:center;
        gap: var(--spacing-md);

        & img {
          border-radius: var(--rounded-md);
        }

        & .song-info > span {
          font-weight: var(--font-bold);
        }

        & .song-control {
          position: absolute;
          left: 0.75rem;

          &:hover svg {
            color: hsl(var(--subtext-1));
          }

          & svg {
            font-size: var(--font-2xl)
          }
        }
      }
    }
  }
</style>
