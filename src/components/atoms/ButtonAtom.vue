<template>
  <button type="button" @click="submit" class="btn__signin" :class="`btn__${label.toLowerCase()} ${variant}`">{{ label }}</button>
</template>

<script setup lang="ts">
const emit = defineEmits(['submit'])
const submit = () => {
  emit('submit')
}

const props = defineProps({
  label: {
    type: String,
    required: true,
    default: 'Sign in',
  },
  variant: {
    type: String,
    required: false,
    default: 'primary',
  }
})
</script>

<style lang="postcss">
.btn__signin {
  @apply w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ;
}

.danger {
  @apply bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 ;
}

.primary {
  @apply bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 ;
}

.secondary {
  @apply bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 ;
}
</style>