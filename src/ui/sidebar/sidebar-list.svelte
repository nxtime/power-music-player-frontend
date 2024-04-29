<script lang="ts">
  import type { SidebarList } from "../../interfaces/sidebar"

  export let list: SidebarList[]; 
  export let title: string;
</script>

<main>
  <h4 class="list-title">{title}</h4>
  <ul class="list-container">
    {#each list as { url, name, title, icon }}
      <li class="list-item">
        <a class={url === "/" ? "active" : ""} href={url} {title}>
          {@html icon}
          <span>{name}</span>
        </a>
      </li>
    {/each}
  </ul>
</main>

<style>
  .list-title {
    text-transform: uppercase;
    font-size: var(--font-sm);
    color: hsl(var(--subtext-0));
    margin-bottom: var(--spacing-xs);
  }

  .list-container {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing-xs) / 2);

    & .list-item a {
      position: relative;
      display: flex;
      gap: var(--spacing-xs);
      align-items: center;
      padding: var(--spacing-xs) var(--spacing-md);

      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: hsl(var(--mantle));
        border-radius: var(--rounded-md);
        z-index: -1;
        transition: width ease-in-out 0.2s;
      }

      &:hover::before {
        width: 100%;
      }

      &.active {
        color: hsl(var(--accent));
      }
    }
  }

</style>
