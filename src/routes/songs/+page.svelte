<script lang="ts">
  import { onMount } from "svelte";
  import SongCard from "../../ui/components/song-card/song-card.svelte";
  import { albumStore } from "$lib/store/album.store";

  export let data: { songs: any[], albums: any[] };

  let currentLayout = "grid";

  const toggleCurrentLayout = () => currentLayout === "grid" ? "list" : "grid";

  const songsQty = data.songs.length

  let pagination = 1;
  let maxItemsPerPage = 30;
  const maxPage = Math.ceil(songsQty / maxItemsPerPage);

  const handleNextPage = () => {
    if (pagination === maxPage) return;

    pagination += 1;
  }

  const handlePrevPage = () => {
    if (pagination === 1) return;

    pagination -= 1;
  }
  let currentSongs = [] as any;

  $: {
    currentSongs = data.songs.filter((_, i) => i >= (pagination - 1) * maxItemsPerPage && i < pagination * maxItemsPerPage)
  }

  onMount(() => {
    albumStore.set({
      albums: data.albums,
      songs: data.songs.map(({ name, album }) => ({ name, album }))
    });
  })
</script>
<div class="songs-page">
  <header class="songs-header">
    <h2>Songs ({data.songs.length} songs)</h2>
  </header>
  <div class="songs-container">
    <ul class="song-card-container {currentLayout}">
      {#each currentSongs as song, index}
        <SongCard {...song} index={(pagination - 1) * maxItemsPerPage + index} />
      {/each}
    </ul>
  </div>
  <div class="pagination-container">
    <button class="pagination-action previous" on:click={handlePrevPage}>
      {"<"}
    </button>
    <span>Current page: <span class="number">{String(pagination).padStart(2, "0")}</span></span>
    <button class="pagination-action next" on:click={handleNextPage}>
      {">"}
    </button>
  </div>
</div>
<style>
  .songs-page {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    width: 100%;
    flex: 1;
    height: 100%;
    padding: var(--spacing-md);
    overflow: hidden;
  }

  .songs-header {
    display: flex;
    justify-content: space-between;
  }

  .song-card-container {
    width: 100%;
    flex: 1;
    overflow-y: auto;
    gap: var(--spacing-md);

    &.grid {
      display: grid;
      grid-template-rows: repeat(6, 1fr);
      grid-template-columns: repeat(5, 1fr);
    }

    &.list {
      display: flex;
      flex-direction: column;
    }
  }

  .songs-container {
    height: 100%;
    overflow-y: auto;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-md);

    & .number {
      font-family: "Roboto Mono", sans-serif;
    }

    & .pagination-action {
      --size: var(--spacing-2xl);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: var(--size);
      min-width: var(--size);

      border-radius: var(--rounded-md);
      border: 1px solid hsl(var(--surface-0));

      font-size: var(--font-xl);
      transition: all ease 0.2s;
      &:hover {
        background-color: hsl(var(--surface-0));
      }
    }
  }

  @media (max-width: 50rem) {
    .song-card-container.grid {
      grid-template-rows: unset;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 30rem) {
    .song-card-container.grid {
      grid-template-rows: unset;
      grid-template-columns: repeat(2, 1fr);
    }
  }

</style>
