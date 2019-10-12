<script>
  import * as browser from "./browser";
  import * as log from "./log";
  import Oops from "./Oops.svelte";
  import Splash from "./Splash.svelte";

  export let application = {};
  export let author;
  export let description;
  export let onDone = () => true;

  let err = null;

  function onError(event) {
    err = event.message;
  }
  function onErrorLog(event) {
    log.error(event);
    onError(event);
  }

  const { assetQuery, bases, debug, files, root, splashImage } = application;

  // Async helper that tries to load one file from one base.
  function tryFileBase(i, j) {
    if (j < bases.length) {
      let loc = browser.joinPath(root, bases[j], files[i]);
      if (assetQuery) loc = `${loc}?${assetQuery}`;
      log.debug("try", loc);
      return browser.loadContent(loc).catch(() => tryFileBase(i, j + 1));
    } else {
      log.debug(`give up ${files[i]} after ${bases.length} tries`);
      if (!files[i].endsWith(".css"))
        throw new Error(`cannot locate ${files[i]}`);
    }
  }

  // Load the files one at a time, in order, trying every base for
  // every file.
  log.setDebug(debug);
  let promise = Promise.resolve(true);
  let loaded = 0;
  for (let i in files) {
    promise = promise
      .then(() => tryFileBase(i, 0))
      .then(() => (loaded += 1))
      .catch(err => {
        onError({ message: err.message });
        log.error(err);
      });
  }
  promise.then(() => {
    if (loaded >= files.length) onDone();
  });
</script>

<style>
  :global(#sylph) {
    align-items: center;
    display: flex;
    flex-direction: column;
    font-family: sans-serif;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    text-align: center;
  }
</style>

{#if err}
  <Oops message={err} />
{:else}
  <Splash {author} {description} src={splashImage} />
{/if}
