<script>
  import * as browser from "./browser";
  import * as log from "./log";
  import Oops from "./Oops.svelte";
  import Splash from "./Splash.svelte";

  export let application = {};
  export let author;
  export let description;

  let done = false;
  let err = null;

  function onError(event) {
    err = event.message;
  }
  function onErrorLog(event) {
    log.error(event);
    onError(event);
  }

  // Async helper that tries to load one file from one base.
  const { assetQuery, bases, debug, files, root } = application;

  function tryFileBase(i, j) {
    if (j < bases.length) {
      let loc = browser.joinPath(root, bases[j], files[i]);
      if (assetQuery) loc = `${loc}?${assetQuery}`;
      log.debug("try", loc);
      return browser.loadContent(loc).catch(() => tryFileBase(i, j + 1));
    } else {
      log.debug(`give up ${files[i]} after ${bases.length} tries`);
      throw new Error(`cannot locate ${files[i]}`);
    }
  }

  // Load the files one at a time, in order, trying every base for
  // every file.
  log.setDebug(debug);
  let promise = Promise.resolve(true);
  for (let i in files) {
    promise = promise
      .then(() => tryFileBase(i, 0))
      .catch(err => {
        onError({ message: err.message });
        log.error(err);
      });
  }
  promise.then(() => {
    done = true;
  });
</script>

{#if err}
  <Oops message={err} />
{:else if !done}
  <Splash {author} {description} />
{/if}
