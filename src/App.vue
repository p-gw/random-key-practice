<template>
  <div data-theme="bumblebee">
  <welcome-modal />
    <div class="flex min-w-screen min-h-screen bg-base-100">
      <metronome-settings class="absolute top-0 right-0 h-fill" v-on:bpm="setBpm" v-on:keys="setKeys" v-on:key-beats="setBeats" v-on:key-bars="setBars">
        <div class="flex flex-col items-center justify-center w-96 h-96 rounded-full border-2 border-base-content m-auto">
          <div class="h-24"></div>
          <div class="h-12 w-48">
            <bar-display v-if="nBars > 1" :n_bars="nBars" :current="bar" />
          </div>
          <key-display :prev="keys[0]" :active="keys[1]" :next="keys[2]"/>

          <div class="flex items-center h-12">
            <metronome-display :n_beats="nBeats" :active="step"/>
          </div>
          <div class="flex items-center h-24">
            <button class="btn btn-primary" role="button" @click="toggle">
              <stop-button v-if="playing"/>
              <play-button v-else />
            </button>
          </div>
        </div>
      </metronome-settings>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import KeyDisplay from "./components/KeyDisplay.vue"
import MetronomeDisplay from "./components/MetronomeDisplay.vue"
import MetronomeSettings from "./components/MetronomeSettings.vue"
import { start, Transport, Synth } from 'tone'
import PlayButton from "./components/PlayButton.vue"
import StopButton from "./components/StopButton.vue"
import WelcomeModal from "./components/WelcomeModal.vue"
import BarDisplay from "./components/BarDisplay.vue"

const baseKeys = ["C", "D", "E", "F", "G", "A", "B"]
const flatKeys = ["B♭", "E♭", "A♭", "D♭", "G♭"]
const sharpKeys = ["F♯", "C♯", "G♯", "D♯", "A♯"]

const randomKey = (arr) => arr[Math.floor(Math.random() * arr.length)]
const nextKey = (arr, source) => {
  arr.shift()
  arr.push(randomKey(source))
}

export default {
  name: 'App',
  setup() {
    const playing = ref(false)
    const step = ref(0)
    const bar = ref(1)
    const keySource = ref([baseKeys, flatKeys].flat())
    const keys = ref([randomKey(keySource.value), randomKey(keySource.value), randomKey(keySource.value)])
    const bpm = ref(120)
    const nBeats = ref(4)
    const nBars = ref(1)

    const synthOpts = {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 0.005 }
    }

    const synth = new Synth(synthOpts).toDestination()

    Transport.scheduleRepeat((time) => {
      if (step.value == nBeats.value) {
        step.value = 1
        if (bar.value == nBars.value) {
          bar.value = 1
          nextKey(keys.value, keySource.value)
        } else {
          bar.value += 1
        }
      } else {
        step.value += 1
      }
      synth.triggerAttackRelease(step.value == 1 ? "G4" : "C#4", "32n", time)
    }, "4n")

    const toggle = () => {
      if (playing.value) {
        Transport.stop()
        step.value = 0
      } else {
        start()
        Transport.bpm.value = bpm.value
        Transport.timeSignature = nBeats.value
        Transport.start()
      }

      playing.value = !playing.value
    }

    onMounted(() => {
      window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          toggle()
        }
      })
    })

    const playButtonText = computed(() => playing.value ? "stop" : "play")

    // settings
    const setBpm = (v) => {
      bpm.value = v
      Transport.bpm.value = v
    }
    const setKeys = (v) => {
      if (v == 1) {
        keySource.value = [baseKeys, flatKeys].flat()
      } else if (v == 2) {
        keySource.value = [baseKeys, sharpKeys].flat()
      } else if (v == 3) {
        keySource.value = [baseKeys, flatKeys, sharpKeys].flat()
      }
    }

    const setBeats = (v) => {
      nBeats.value = +v
      Transport.timeSignature = +v
    }

    const setBars = (v) => {
      nBars.value = +v
    }

    return { playing, toggle, playButtonText, keys, step, bar, setBpm, setKeys, nBeats, nBars, setBeats, setBars }
  },
  components: {
    KeyDisplay, MetronomeDisplay, MetronomeSettings, PlayButton, StopButton, WelcomeModal, BarDisplay
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed');

html, body {
  font-family: "Roboto", sans-serif;
}

#app {
  font-family: "Roboto", sans-serif;
}
</style>