<template>
    <div v-if="active" class="flex justify-center items-center w-32 h-32 text-7xl font-bold text-base-content">
      <slot></slot>
    </div>
    <div v-else class="flex justify-center items-center w-24 h-24 text-3xl text-base-content opacity-75">
      <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>