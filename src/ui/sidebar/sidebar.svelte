<script>
	import User from "../user/user.svelte";
  import { menuIcon } from "$lib/icons/generic";
	import SidebarList from "./sidebar-list.svelte";
	import SidebarNavigation from "./sidebar-navigation.svelte";
  import { TRACK_LIST } from "../../constants/sidebar";

  let collapsedMenu = true;

  const toggleMenu = () => collapsedMenu = !collapsedMenu;

</script>
<aside class="sidebar {collapsedMenu ? 'collapsed' : ''}">
  <button class="menu-action" type="button" on:click={toggleMenu}>
    {@html menuIcon}
  </button>
  <User />
  <SidebarNavigation />
  <SidebarList list={TRACK_LIST} title="MY COLLECTION" />
</aside>

<style>
  .sidebar {
    --background: hsl(var(--base));

    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    flex: 1;

    min-width: 16rem;
    width: 100%;
    max-width: 20%;

    background-color: var(--background);

    padding: var(--spacing-md);

    border-right: 1px solid hsl(var(--surface-0)) ;

    transition: all ease 0.2s;

    overflow: hidden;

    &.collapsed .navigation-container a {
      height: var(--spacing-xl);

       & span {
        display: none;
      }
    }

    & .menu-action {
      --size: var(--spacing-xl);
      
      min-width: var(--size);
      min-height: var(--size);
      
      width: var(--size);
      height: var(--size);

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--rounded-full);
      transition: all ease 0.2s;

      &:hover {
        transform: scale(1.05);
        background-color: hsl(var(--mantle));
      }

      & svg {
        font-size: var(--spacing-lg);
      }
    }

    &.collapsed {
      --width-size: 4rem;
      min-width: var(--width-size);
      width: var(--width-size);
      max-width: var(--width-size);
    }
  }

  @media (max-width: 50rem) {
    .sidebar {
      z-index: 1;
      height: calc(100vh);
      position: fixed;
    }

    .sidebar.collapsed {
      position: initial;
    }
  }

  @media (max-width: 30rem) {
    .sidebar {
      position: fixed;
      width: 100%;
      max-width: 100%;
      border: none;
      background-color: var(--background);
    }

    .sidebar.collapsed {
      background-color: transparent;
      position: fixed;
      height: 4rem;
      overflow: hidden;
      gap: 2rem;
    }
  }
</style>
