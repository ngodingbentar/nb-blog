<template>
  <label :for="type" class="block mb-2 text-sm font-medium">
    {{ label }}
  </label>
</template>


<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
})
</script>