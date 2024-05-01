<script lang="ts">
  import { NAVIGATION } from "../../constants/sidebar"
</script>

<ul class="navigation-container">
  {#each NAVIGATION as { url, name, icon, title }}
    <li class="navigation-item">
      <a class={url === "/" ? "active" : ""} href={url} {title}>
        {@html icon} <span>{name}</span>
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
      height: var(--spacing-2xl);
      gap: var(--spacing-sm);
      padding-left: calc(var(--spacing-md) * 0.75);

      & > * {
        position: relative;
      }

      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: hsl(var(--mantle));
        border-radius: var(--rounded-md);
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
