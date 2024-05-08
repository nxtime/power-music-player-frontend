<script lang="ts">
	import type { Album } from "../interfaces/music";
	import Search from "../ui/search/search.svelte";
	import Showcase from "../ui/showcase/showcase.svelte";

  export let data: { albums: Album[] };

</script>
<div class="page">
  <Search />
  <Showcase albums={data.albums} />
</div>

<style>
  .page {
    padding: var(--spacing-md);
    display: flex;
    gap: var(--spacing-md);
    flex-direction: column;
  }
</style>

