<template>
  <input
    :value="modelValue"
    @input="myEmit($event)"
    :type="type"
    :name="type"
    :placeholder="placeholder"
    class="form__input"
    :class="`input-${type}`"
  >
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
function myEmit(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
const props = defineProps({
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
  @apply bg-gray-200  border border-gray-300  sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-3;
}
</style>