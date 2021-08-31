<template>
  <div class="flex">
    <span v-for="(beat, index) in beats" :key="`beat-${index}`">
      <metronome-beat :highlighted="index <= active - 1" :active="index == active - 1"/>
    </span>
  </div>
  <br/>
</template>

<script>
import MetronomeBeat from "./MetronomeBeat.vue"

export default {
  props: {
    n_beats: {
      default: 4,
      type: Number
    },
    active: {
      type: Number
    }
  },
  computed: {
    beats() {
      let beats = [];
      for (let i = 0; i < this.n_beats; i++) {
        beats.push(i)
      }
      return beats;
    },
  },
  components: {
    MetronomeBeat
  }
}
</script>

<style>

</style>