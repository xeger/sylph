<script>
  export let author;
  export let description;
</script>

<style>
  svg * {
    fill: none;
  }

  svg *.stroke-primary {
    stroke: #0c99db;
    stroke-width: 3;
  }

  svg *.stroke-muted {
    stroke: #bfe8fb;
    stroke-width: 3;
  }

  .msg {
    padding: 0.5rem 0;
  }
</style>

<div id="sylph">
  <svg
    width="8em"
    height="8em"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    style="background: none;">
    <circle class="stroke-primary" cx="50" cy="50" r="35" />
    <circle
      class="stroke-muted"
      cx="50"
      cy="50"
      r="35"
      stroke-dasharray="80% 0% 80%">
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="-90 50 50;0 50 50;90 50 50;180 50 50;270 50 50"
        keyTimes="0;0.5;0.7;0.85;1"
        dur="1.0s"
        begin="0s"
        repeatCount="indefinite" />
    </circle>
  </svg>
  {#if description}
    <div class="msg">{description}</div>
  {/if}
</div>
