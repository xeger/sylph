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
  function tryFile(file) {
    let loc = browser.joinPath(root, base, file);
    if (assetQuery) loc = `${loc}?${assetQuery}`;
    log.debug("try", loc);
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
      if (!browser.isStylesheet(file))
        return Promise.reject(Error(`cannot locate ${file}`));
    });
  }

  const {
    assetQuery,
    base,
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

  const fileRequests = files.map(f => tryFile(f));
  fileRequests.forEach(request => request.catch(handleException));
  Promise.all(fileRequests)
    .then(onDone)
    .catch(() => {});
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
