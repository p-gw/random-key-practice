<template>
  <progress class="progress progress-success" :value="current" :max="n_bars"></progress>
</template>

<script>
export default {
  props: ["current", "n_bars"]
}
</script>