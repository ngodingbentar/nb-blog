<template>
  <h1 class="form__title">
    {{ title }}
  </h1>
</template>

<script setup lang="ts">
import ErrorAtom from '@/components/atoms/ErrorAtom.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
})
</script>

<style scoped lang="postcss">
.form__title {
  @apply text-xl font-bold leading-tight tracking-tight md:text-2xl;
}
</style>