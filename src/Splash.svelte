<script>
  export let author;
  export let description;
  export let src;
</script>

<style>
  .msg {
    padding: 0.5rem 0;
  }
</style>

<div id="sylph">
  {#if src}
    <img alt="splash screen" {src} />
  {:else if description}
    <div class="msg">{description}</div>
  {/if}
</div>
