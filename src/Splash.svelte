<script>
  export let author;
  export let color1 = "#0c99db";
  export let color2 = "#bfe8fb";
  export let description;
  export let width = 3;
</script>

<style>
  .splash {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    text-align: center;
  }
</style>

<div class="splash">
  <svg
    width="8em"
    height="8em"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    style="background: none;">
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke={color1}
      stroke-width={width}
      r="35" />
    <circle
      cx="50"
      cy="50"
      fill="none"
      stroke={color2}
      stroke-width={width}
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
    <div> {description} </div>
  {/if}
</div>
