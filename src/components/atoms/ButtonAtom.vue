<template>
  <button type="button" @click="submit" class="btn__signin">{{ label }}</button>
</template>

<script setup>
const emit = defineEmits(['submit'])
const submit = () => {
  emit('submit')
}

const props = defineProps({
  label: {
    type: String,
    required: true,
    default: 'Sign in',
  }
})
</script>

<style lang="postcss">
.btn__signin {
  @apply w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
}
</style>