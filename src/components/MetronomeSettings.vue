<template>
<div class="shadow drawer drawer-end w-full">
  <input id="settings-drawer" type="checkbox" class="drawer-toggle">
  <div class="flex flex-col justify-center drawer-content">
    <label for="settings-drawer" class="absolute top-0 left-0 m-6 btn btn-neutral drawer-button">
      <settings-button />
    </label>
    <slot></slot>
  </div>
  <div class="drawer-side">
    <label for="settings-drawer" class="drawer-overlay"></label>
    <ul class="menu p-8 overflow-y-auto w-96 min-h-screen bg-base-200">
      <li>
          <label class="label">
            <span class="label-text text-lg font-bold">Meter settings</span>
          </label>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Beats per minute</span>
          </label>
          <div class="flex items-center">
            <input type="range" :min="bpmRange.min" :max="bpmRange.max" v-model="bpm" class="range pr-4">
            <input v-model="bpm" type="number" placeholder="" class="input input-bordered w-24">
          </div>
        </div>
      </li>
      <li class="pt-8">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Bars per key</span>
          </label>
          <div class="flex items-center">
            <input v-model="bars" type="number" placeholder="" class="input input-bordered w-24">
          </div>
        </div>
      </li>
      <li class="pt-8">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Beats per measure</span>
          </label>
          <div class="flex items-center">
            <input v-model="beats" type="number" placeholder="" class="input input-bordered w-24">
          </div>
        </div>
      </li>
      <li class="pt-8">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-lg font-bold">Key settings</span>
          </label>
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Use flats</span>
              <input type="radio" name="opt" class="radio" checked="checked" v-model="keys" :value="1">
            </label>
          </div>
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Use sharps</span>
              <input type="radio" name="opt" class="radio" v-model="keys" :value="2">
            </label>
          </div>
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Use extended keys</span>
              <input type="radio" name="opt" class="radio" v-model="keys" :value="3">
            </label>
          </div>
        </div>
      </li>
      <li class="pt-8">
        <div class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Count in</span>
            <input type="checkbox" class="checkbox" v-model="countIn">
          </label>
        </div>
      </li>
    </ul>
  </div>
</div>

</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import SettingsButton from './SettingsButton.vue'

export default {
  components: { SettingsButton },
  emits: ["bpm", "keys", "key-beats", "key-bars", "count-in"],
  setup(props, { emit }) {
    // BPM Settings
    const bpm = ref(120)
    const bpmRange = { min: 30, max: 300 }
    watch(bpm, () => { emit('bpm', bpm.value) })

    // Key Settings
    const keys = ref(1)
    watch(keys, () => { emit('keys', keys.value) })

    // Metre settings
    const beats = ref(4)
    const bars = ref(1)
    const countIn = ref(false)

    watch(beats, () => { emit('key-beats', beats.value) })
    watch(bars, () => { emit('key-bars', bars.value) })
    watch(countIn, () => { emit('count-in', countIn.value) })

    return { bpm, bpmRange, keys, beats, bars, countIn }
  }
}
</script>
