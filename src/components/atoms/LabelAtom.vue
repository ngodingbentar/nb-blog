<template>
  <label :for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    {{ label }}
  </label>
</template>


<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  for: {
    type: String,
    default: 'text'
  },
})
</script>