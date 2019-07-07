<script>
  import * as browser from "./browser";
  import * as log from "./log";
  import Oops from "./Oops.svelte";
  import Splash from "./Splash.svelte";

  export let author;
  export let description;
  export let files = [];
  export let roots = [];

  let loaded = 0;
  let err = null;

  files.forEach(file => {
    const tryLoad = i => {
      if (i < roots.length) {
        browser
          .loadContent(`${roots[i]}/${file}`)
          .then(() => {
            loaded += 1;
          })
          .catch(() => {
            log.info(`no '${file}' at ${roots[i]}`);
            tryLoad(i + 1);
          });
      } else {
        log.error(`failed to load '${file}' from any root`);
        err = "Sorry, something went wrong.";
      }
    };
    tryLoad(0);
  });
</script>

{#if err}
  <Oops message={err} />
{:else if loaded < files.length}
  <Splash {author} {description} />
{/if}
