<script lang="ts">
    import PlaylistCard from "../../ui/components/playlist-card/playlist-card.svelte";
    import SongCard from "../../ui/components/song-card/song-card.svelte";

  export let data: { songs: any[] };

  let currentLayout = "grid";

  const toggleCurrentLayout = () => currentLayout === "grid" ? "list" : "grid"

</script>
<div class="songs-page">
  <header class="songs-header">
    <h2>Songs ({data.songs.length} songs)</h2>
  </header>
  <ul class="song-card-container {currentLayout}">
    {#each data.songs as song}
      <SongCard {...song} />
    {/each}
  </ul>
</div>
<style>
  .songs-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    width: 100%;
    flex: 1;
    padding: var(--spacing-md);
  }

  .songs-header {
    display: flex;
    justify-content: space-between;
  }

  .song-card-container {
    width: 100%;
    gap: var(--spacing-md);

    &.grid {
      display: grid;
      grid-template-rows: repeat(auto-fit, minmax(5rem, auto));
      grid-template-columns: repeat(auto-fit, minmax(5rem, auto));
    }

    &.list {
      display: flex;
      flex-direction: column;
    }
  }
</style>
