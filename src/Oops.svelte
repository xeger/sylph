<script>
  import * as browser from "./browser";
  import * as log from "./log";
  import * as storage from "./storage";

  export let allowReset = false;
  export let contactEmail = null;
  export let contactPhone = null;
  export let errorMessage;
  export let imgSrc;

  function reset() {
    try {
      const key = browser.getMeta("sylph-storage");
      storage.reset(key);
    } catch (err) {
      log.fatal(err);
    }
    window.location.reload();
  }
</script>

<style>
  big {
    font-size: 1.5rem;
  }

  button {
    color: #333;
    background-color: #f4f4f4;
    border: 1px solid #333;
    border-radius: 0.25rem;
    font-weight: 400;
    font-size: 1rem;
    outline: none;
    padding: 0.2rem 0.75rem;
    vertical-align: middle;
  }

  button:active {
    background-color: #ddd;
  }

  button:focus {
    border-color: #666;
  }

  img {
    margin-bottom: 1rem;
  }
  .msg {
    line-height: 2rem;
    padding: 0.5rem 0;
  }

  .msg tt {
    color: #7f7f7f;
    display: block;
    margin-top: 1rem;
  }

  .act {
    padding: 0.5rem 0;
  }
</style>

<div id="sylph">
  {#if imgSrc}
    <img alt="error" src={imgSrc} />
  {/if}
  <div class="msg">
    <big>Sorry, something went wrong.</big>
    {#if contactEmail || contactPhone}
      <br />
      If this problem persists, please contact {[contactEmail, contactPhone].join(' or ')}.
    {/if}
    <tt>{errorMessage}</tt>
  </div>
  {#if allowReset}
    <div class="act">
      <button on:click={reset}>Reset Overrides</button>
    </div>
  {/if}
</div>
