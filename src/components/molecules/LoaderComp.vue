<template>
  <transition name="loader" mode="out-in">
    <div v-if="show" class="loader__overlay">
      <div class="loader__wrapper">
        <div class="text-white">
          Loading ...
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">

defineProps({
  show: {
    type: Boolean,
    default: false
  },
})
</script>

<style lang="postcss" scoped>
.loader__overlay {
  @apply flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10;
}

.loader__wrapper {
  @apply flex w-full h-full justify-center items-center ;
}
</style>