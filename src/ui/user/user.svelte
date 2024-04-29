<script lant="ts">
  const user = {
    id: "marcos.silva",
    name: "Marcos Paulo",
    avatarUrl: "https://media.vogue.fr/photos/5c45efa93b3b29cc4efaa0e1/master/pass/Benjamin-Olisah-2-Male-Models-to-Watch-Vogue-Int-16th-Jan-2019.jpg"
  }
</script>

<div class="user-container">
  <a target="_blank" href={`/profiles/${user.id}`}>
    <img class="user-profile-image" src={user.avatarUrl} alt={user.name} title={user.name} width="32" />
  </a>
  <button class="user-profile-options">
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
      <path fill="currentColor" d="M9.5 13a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0" />
    </svg>
  </button>
</div>

<style>
  .user-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-profile-image {
    object-fit: cover;
    background-position: center;
    aspect-ratio: 1/1;

    border-radius: var(--rounded-full);

    transition: filter ease 0.2s;

    &:hover {
      filter: blur(0.75px) brightness(0.7);
    }
  }

  .user-profile-options {
    --transition-properties: transform;
    display: flex;
    align-items: center;
    justify-content: center;

    height: var(--spacing-xl);
    width: var(--spacing-xl);
    transition: var(--transition);

    border-radius: var(--rounded-full);

    &:hover {
      background-color: hsl(var(--mantle));
    }

    &:active {
      transform: scale(0.9);
    }
  }
</style>
