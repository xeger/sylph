<script>
  import Oops from "./Oops.svelte";
  import Splash from "./Splash.svelte";

  export let author;
  export let description;
  export let files = [];
  export let roots = [];

  let err = null;

  setTimeout(() => {
    err = "Oh no; something has gone very wrong!";
  }, 3000);
</script>

{#if err}
  <Oops message={err} />
{:else}
  <Splash {author} {description} />
{/if}
