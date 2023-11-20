<template>
  <div class="form__error">
    <span>
      {{ error }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="postcss">
.form__error {
  @apply text-red-600 mt-2 h-4;
}
</style>