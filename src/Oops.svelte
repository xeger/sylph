<script>
  import * as browser from "./browser";
  import * as log from "./log";

  export let color1 = "#ff0000";
  export let message = "Sorry, something went wrong. Try reloading.";

  function reload() {
    try {
      const storage = browser.getMeta("application-storage");
      if (storage) {
        localStorage.removeItem(`${storage}.queryBase`);
        localStorage.removeItem(`${storage}.root`);
      }
    } catch (err) {
      log.error(err);
    }
    window.location.reload();
  }
</script>

<style>
  button {
    color: #333;
    background-color: #f4f4f4;
    outline: none;
  }

  button:active {
    background-color: #ddd;
  }

  button:focus {
    border-color: #666;
  }

  .msg {
    padding: 0.5rem 0;
  }

  .msg tt {
    color: #7f7f7f;
  }

  .act {
    padding: 0.5rem 0;
  }

  svg * {
    fill: red;
    stroke: red;
    stroke-width: 3;
  }
</style>

<div id="sylph">
  <svg
    width="8em"
    height="8em"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill={color1}
      d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5-103 385.5-279.5
      279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5
      385.5-103zm128 1247v-190q0-14-9-23.5t-22-9.5h-192q-13 0-23 10t-10 23v190q0
      13 10 23t23 10h192q13 0
      22-9.5t9-23.5zm-2-344l18-621q0-12-10-18-10-8-24-8h-220q-14 0-24 8-10 6-10
      18l17 621q0 10 10 17.5t24 7.5h185q14 0 23.5-7.5t10.5-17.5z" />
  </svg>
  <div class="msg">
    Sorry; something went wrong trying to load this page.
    <br />
    <tt>{message}</tt>
  </div>
  <div class="act">
    <button on:click={reload}>Reload Page</button>
  </div>
</div>
