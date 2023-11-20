<template>
  <span>
    <h1 class="form__title">
      {{ title }}
    </h1>
    <div class="form__error">
      <span v-if="error">
        {{ error }}
      </span>
    </div>
  </span>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="postcss">
.form__title {
  @apply text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white;
}
.form__error {
  @apply text-red-600 mt-2 h-4;
}
</style>