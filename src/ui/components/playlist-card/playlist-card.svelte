<script lang="ts">
  import { playTrackIcon } from "$lib/icons/soundbar";

  export let name: string;
  export let cover: string;
  export let songs: string[];

</script>
<div class="playlist-card-container" style="--image: url({cover})">
  <a class="album-link" href="/album/{name}"></a>
  <div class="playlist-info">
    <button class="playlist-play-action" type="button">
      {@html playTrackIcon}
    </button>
    <span class="subtitle">New Song</span>
    <span class="title">{name} ({songs.length})</span>
    <p>{songs.join(", ")}</p>
  </div>
</div>

<style>
  .playlist-card-container {
    position: relative;
    border-radius: var(--rounded-md);
    height: 20rem;
    display: flex;
    flex-direction: column;
    background-image: var(--image);
    background-position: center;
    background-size: 150%;
    transition: all ease-in-out 0.2s;
    overflow: hidden;
    background-color: hsl(0deg 0% 0% / 0);
    background-blend-mode: color;

    & .album-link {
      position: absolute;
      height: 100%;
      width: 100%;
    }

    & .playlist-play-action {
      --size: 2.5rem;
      position: absolute;
      right: calc(var(--size) / 2);
      top: calc(var(--size) / -2);
      height: var(--size);
      width: var(--size);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--rounded-full);
      background-color: hsl(var(--text));
      transition: all ease 0.2s;

      &:hover {
        background-color: hsl(var(--subtext-1));
      }

      &:active {
        transform: scale(0.9);
      }

      & svg {
        font-size: var(--size);
        color: hsl(var(--crust));
      }

    }

    &:hover {
      background-size: 200%;
      background-color: hsl(0deg 0% 0% / 0.5);
    }

    & .playlist-info {
      padding: var(--spacing-sm);
      display: flex;
      flex-direction: column;
      margin-top: auto;
      height: 6rem;
      backdrop-filter: blur(8px) brightness(0.7);

      & .subtitle {
        color: hsl(var(--accent));
        font-size: var(--font-xs);
        text-transform: uppercase;
      }

      & .title {
        font-weight: var(--font-bold);
      }

      & p {
        font-size: var(--font-xs);
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 2rem;
      }
    }
  }
</style>
