<script lang="ts">
  import { searchIcon } from "$lib/icons/generic";
</script>

<div class="search-container">
  <label class="search-label" for="search">
    {@html searchIcon}
  </label>
  <input id="search" type="search" placeholder="Search" />
  <button type="submit"></button>
</div>

<style>
  .search-container {
    position: relative;
    display: flex;
    align-items: center;

    & .search-label {
      display: flex;
      align-items: center;
      position: absolute;
      left: var(--spacing-sm);
    }

    & input {
      ---transition-properties: background-color;
      height: var(--spacing-2xl);
      padding-inline: var(--spacing-md);
      background-color: hsl(var(--mantle));
      border-radius: var(--rounded-md);
      transition: --transition;
      text-indent: var(--spacing-lg);

      &:hover {
        background-color: hsl(var(--crust) / 0.8);
      }
    }
  }

  @media (max-width: 30rem) {
    .search-container {
      margin-left: auto;
    }
  }
</style>
