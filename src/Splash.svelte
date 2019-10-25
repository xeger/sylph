<script>
  export let author;
  export let description;
  export let imgSrc;
</script>

<style>
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
