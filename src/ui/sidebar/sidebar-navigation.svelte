<script lang="ts">
  import { NAVIGATION } from "../../constants/sidebar"
</script>

<ul class="navigation-container">
  {#each NAVIGATION as { url, name, title }}
    <li class="navigation-item">
      <a class={url === "/" ? "active" : ""} href={url} {title}>
        {name}
      </a>
    </li>
  {/each}
</ul>

<style>
  .navigation-container {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing-xs) / 2);

    & .navigation-item a {
      position: relative;
      display: flex;
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
