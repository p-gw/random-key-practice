<template>
  <div class="flex h-3 w-3 m-1">
    <span class="absolute w-3 h-3 rounded-full bg-base-300" :class="{ animate: active }"></span>
    <span class="relative w-3 h-3 rounded-full bg-base-300" :class="{ highlighted }"></span>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      default: false,
      type: Boolean
    },
    highlighted: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style scoped>
.highlighted {
  @apply bg-primary-focus
}

.animate-once {
  animation-iteration-count: 1;
}

.animate {
  @apply animate-ping animate-once bg-primary-focus;
}
</style>