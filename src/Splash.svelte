<script>
  export let author;
  export let description;
  export let imgSrc;
</script>

<style>
  img {
    margin-bottom: 1rem;
    max-width: 40vw;
    max-height: 40vh;
  }

  .msg {
    padding: 0.5rem 0;
  }
</style>

<div id="sylph">
  {#if imgSrc}
    <img alt="logo" {imgSrc} />
  {:else if description}
    <div class="msg">{description}</div>
  {/if}
</div>
