<script>
  import * as browser from "./browser";
  import * as log from "./log";
  import * as path from "./path";
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

  // First things first: never let an error go unreported!
  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onErrorLog);

  // Async helper that tries to load one file from one base.
  const { root, bases, files } = application;
  function tryFileBase(i, j) {
    if (j < bases.length) {
      log.info("try", path.join(root, bases[j], files[i]));
      return browser
        .loadContent(path.join(root, bases[j], files[i]))
        .catch(() => tryFileBase(i, j + 1));
    } else {
      log.info("give up after", i, j, "; bases.length =", bases.length);
      throw new Error(`cannot locate ${files[i]}`);
    }
  }

  // Load the files one at a time, in order, trying every base for
  // every file.
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
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onErrorLog);
  });
</script>

{#if err}
  <Oops message={err} />
{:else if !done}
  <Splash {author} {description} />
{/if}
