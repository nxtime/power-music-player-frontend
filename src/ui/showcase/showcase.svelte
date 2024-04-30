<script lang="ts">
  import type { Album } from "../../interfaces/music";
	import PlaylistCard from "../components/playlist-card/playlist-card.svelte";
  export let albums: Album[];
  const title = "Recommendation"
</script>

<div class="showcase-container">
  <h2>{title}</h2>
  <div class="showcase-playlist-container">
    {#each albums as { name, cover, songs }}
      <PlaylistCard {name} {cover} {songs} />
    {/each}
  </div>
</div>

<style>
  .showcase-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    overflow-y: auto;

    & .showcase-playlist-container {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
      gap: var(--spacing-md);
    }
  }
</style>
