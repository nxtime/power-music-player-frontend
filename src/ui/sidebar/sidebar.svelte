<script>
	import User from "../user/user.svelte";
	import SidebarList from "./sidebar-list.svelte";
	import SidebarNavigation from "./sidebar-navigation.svelte";
  import { TRACK_LIST } from "../../constants/sidebar";

</script>
<aside class="sidebar">
  <User />
  <SidebarNavigation />
  <SidebarList list={TRACK_LIST} title="MY COLLECTION" />
</aside>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    flex: 1;

    min-width: 16rem;
    width: 100%;
    max-width: 20%;

    padding: var(--spacing-md);

    border-right: 1px solid hsl(var(--surface-0)) ;
  }
</style>
