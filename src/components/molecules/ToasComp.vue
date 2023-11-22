<template>
  <div v-if="show" class="justify-end min-w-[250px] flex absolute top-4 bg-transparent right-0 text-white text-sm ">
    <div
      class="max-w-sm w-full mr-4 px-4 py-2 rounded-xl"
      :class="variantClass"
    >
      <div class="justify-end absolute right-8">
        <button @click="close">
          <i class="pi pi-times" style="font-size: 1rem"></i>
        </button>
      </div>
      <div class="bg-transparent mr-6">{{ toastStore.title }}</div>
      <div class="bg-transparent ">{{ toastStore.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia';

defineProps({
  show: {
    type: Boolean,
    default: false
  },
})

const mainStore = useMainStore()
const { toastStore } = storeToRefs(mainStore)

function close () {
  mainStore.resetToast()
}

const variantClass = computed(() => {
  let style = ''
  const variant = toastStore.value.type.toLowerCase()
  if (variant === 'success')
    style = 'bg-green-400'
  else if (variant === 'error')
    style = 'bg-red-400'
  else style = 'bg-blue-400'

  return style
})

</script>