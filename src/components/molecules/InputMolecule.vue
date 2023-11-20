<template>
  <div class="input__molecule">
    <div>
      <LabelAtom :label="label" :type="type" />
      <InputAtom :modelValue="modelValue" :type="type" :disabled="disabled" :placeholder="placeholder" @update:modelValue="$emit('update:modelValue', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LabelAtom from '@/components/atoms/LabelAtom.vue'
import InputAtom from '@/components/atoms/InputAtom.vue'

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

<style scoped lang="postcss">
.input__molecule:first-child {
  @apply mb-8;
}
</style>