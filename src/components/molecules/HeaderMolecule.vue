<template>
  <span>
    <HeaderAtom :title="title" />
    <ErrorAtom :error="error" />
  </span>
</template>

<script setup>
import HeaderAtom from '@/components/atoms/HeaderAtom.vue'
import ErrorAtom from '@/components/atoms/ErrorAtom.vue'

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