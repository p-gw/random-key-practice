<template>
  <div id="welcome-modal" class="modal" :class="{ 'modal-open': isOpened }">
    <div class="modal-box">
      <h1 class="text-3xl font-bold mb-4">Welcome!</h1>
      <p>This application is a tool for instrument practice. Typically one practices scales and chords by going circling through them chromatically or along the circle of fourths/fifths. This can lead to repetetive practice patterns, which can be avoided by practicing in random keys. The application provides a way to do so.</p>
      <h2 class="text-xl font-bold mt-4">Usage</h2>
      <h3 class="text-lg font-bold mt-2">Settings</h3>
      <p>To access the application settings click the settings button at the top right. This will open a settings dialog where the following parameters can be adjusted:</p>
      <ul class="pl-4">
        <li>beats per minute: Set the tempo for the metronome.</li>
        <li>beats per measure: Set the number of beats in a measure.</li>
        <li>key settings: Set the keys in which to practice in.</li>
      </ul>
      <div class="modal-action">
        <a href="#" class="btn btn-primary" @click="closeModal">Got it!</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup() {
    const isOpened = ref(true)
    const closeModal = () => isOpened.value = false
    return { isOpened, closeModal }
  },
}
</script>
