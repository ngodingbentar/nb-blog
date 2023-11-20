<template>
  <input
    :value="modelValue"
    @input="myEmit($event)"
    :type="type"
    :name="type"
    :placeholder="placeholder"
    class="form__input"
  >
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
function myEmit(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  }
})
</script>

<style lang="postcss" scoped>
.form__input {
  @apply bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}
</style>