<script>
	import Sidebar from "../ui/sidebar/sidebar.svelte";
	import Soundbar from "../ui/soundbar/soundbar.svelte";
</script>
<div class="main">
  <main class="page">
    <Sidebar />
    <slot />
  </main>
  <Soundbar />
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    & .page {
      display: flex;
      overflow: hidden;
      flex: 1;
    }
  }
</style>
