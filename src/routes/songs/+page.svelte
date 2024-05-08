<script lang="ts">
  import { onMount } from "svelte";
  import SongCard from "../../ui/components/song-card/song-card.svelte";
  import { albumStore } from "$lib/store/album.store";
  import { gridIcon, listIcon } from "$lib/icons/generic";

  export let data: { songs: any[], albums: any[] };

  enum LayoutType {
    Grid = "grid",
    List = "list"
  }

  const layoutIcons: Record<LayoutType, string> = {
    [LayoutType.Grid]: gridIcon,
    [LayoutType.List]: listIcon
  }

  const layoutOrder: Record<LayoutType, LayoutType> = {
    [LayoutType.Grid]: LayoutType.List,
    [LayoutType.List]: LayoutType.Grid
  } 

  let currentLayout = LayoutType.Grid;
  
  let currentLayoutIcon = layoutIcons[currentLayout];

  const toggleCurrentLayout = () => {
    currentLayout = layoutOrder[currentLayout];

    currentLayoutIcon = layoutIcons[currentLayout];
  };

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
    <button class="layout-toggle" on:click={toggleCurrentLayout}>
      {@html currentLayoutIcon}
    </button>
  </header>
  <div class="songs-container">
    <ul class="song-card-container {currentLayout}">
      {#each currentSongs as song, index}
        <SongCard {...song} index={(pagination - 1) * maxItemsPerPage + index} />
      {/each}
    </ul>
  </div>
  {#if maxPage > 1}
    <div class="pagination-container">
      <button class="pagination-action previous" on:click={handlePrevPage}>
        {"<"}
      </button>
      <span>Current page: <span class="number">{String(pagination).padStart(2, "0")}</span></span>
      <button class="pagination-action next" on:click={handleNextPage}>
        {">"}
      </button>
    </div>
  {/if}
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
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);

    & .layout-toggle {
      --size: var(--spacing-2xl);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: var(--size);
      min-width: var(--size);
      font-size: var(--spacing-lg);
      background-color: hsl(var(--surface-0) / 0);
      border-radius: var(--rounded-full);
      transition: all ease 0.2s;

      &:hover {
        color: hsl(var(--subtext-1));
        background-color: hsl(var(--surface-0));
      }
    }
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
      gap: var(--spacing-xs);

      & .song-card {
        display: flex;
        aspect-ratio: unset;
        height: 4rem;
        max-height: 4rem;
        overflow: hidden;

        & .play-action {
          left: calc(var(--spacing-xs) / 2);
          width: unset;
          height: unset;
        }

        & img {
          aspect-ratio: 1/1;
          height: inherit;

        }

        & .song-card-info {
          position: unset;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-block: 0;
          padding-inline: var(--spacing-md);
          height: inherit;
          background-color: hsl(var(--mantle));
        }
      }
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

    .songs-header {
      margin-left: auto;
    }
  }

</style>
