<template>
  <div class="flex absolute top-0 left-0 w-full h-full bg-neutral-focus bg-opacity-40 z-50 items-center justify-center transition duration-200 ease-in-out" >
    <div class="text-9xl font-bold text-neutral-content border-primary-content">{{ step }}</div>
  </div>
</template>

<script>
export default {
  props: ["step", "show"]
}
</script>

<style>

</style>