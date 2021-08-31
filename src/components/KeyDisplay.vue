<template>
  <div class="flex gap-1 items-center">
    <key-item>{{ prev }}</key-item>
    <key-item active>{{ active }}</key-item>
    <key-item>{{ next }}</key-item>
  </div>
</template>

<script>
import KeyItem from "./KeyItem.vue"

export default {
  props: {
    prev: {
      type: String
    },
    next: {
      type: String
    },
    active: {
      type: String
    }
  },
  components: {
    KeyItem
  }
}
</script>

<style>

</style>