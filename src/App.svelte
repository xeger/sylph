<script>
  import * as browser from "./browser";
  import * as log from "./log";
  import Oops from "./Oops.svelte";
  import Splash from "./Splash.svelte";

  export let allowReset = false;
  export let application = {};
  export let author;
  export let description;
  export let onDone = () => true;

  let err = null;
  let insecure = false;

  function handleException(exception) {
    const id = log.fatal(exception);
    if (id) err = `Reference ID ${id}`;
    else err = exception.message;
  }

  // Async helper that tries to load one file from one base.
  function tryFileBase(i, j) {
    if (j < bases.length) {
      let loc = browser.joinPath(root, bases[j], files[i]);
      const description = `${bases[j]}/${files[i]}`;
      if (assetQuery) loc = `${loc}?${assetQuery}`;
      log.debug("try", description);
      return browser.loadContent(loc).catch(err => {
        if (err.message) {
          log.error(`rejection (${err.__proto__})`, description, err.message);
        } else if (err.error) {
          log.error(
            `rejection (${err.__proto__} > ${err.error.__proto__})`,
            description,
            err.error.message
          );
        } else {
          const { type, eventPhase } = err;
          log.info("rejection (CORS-blinded Error, likely 4xx)", description);
        }
        return tryFileBase(i, j + 1);
      });
    } else {
      log.debug(`give up ${files[i]} after ${bases.length} tries`);
      if (!browser.isStylesheet(files[i]))
        return Promise.reject(Error(`cannot locate ${files[i]}`));
    }
  }

  const {
    assetQuery,
    bases,
    contactEmail,
    contactPhone,
    errorImage,
    debug,
    files,
    root,
    splashImage,
    transportSecurity
  } = application;

  log.setDebug(debug);

  // Ensure browser is complying with transport security policy.
  if (transportSecurity === "strict" && !browser.hasSecureTransport())
    browser.reloadSecurely();

  // Load the files one at a time, in order, trying every base for
  // every file.
  let promise = Promise.resolve(true);
  let loaded = 0;
  for (let i in files) {
    promise = promise
      .then(() => tryFileBase(i, 0))
      .then(() => (loaded += 1))
      .catch(handleException);
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
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
</style>

{#if err}
  <Oops
    {allowReset}
    {contactEmail}
    {contactPhone}
    errorMessage={err}
    imgSrc={errorImage} />
{:else}
  <Splash {author} {description} imgSrc={splashImage} />
{/if}
