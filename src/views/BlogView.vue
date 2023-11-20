<template>
  <div class="">
    <div class="w-full flex justify-center">
      Header
    </div>
    <div class="mt-4 px-4">
      <PostsLists />
    </div>
  </div>
</template>

<script setup lang="ts">
import PostsLists from '@/components/organisms/PostsLists.vue'
</script>


<style scoped lang="postcss">
.wrapper {
  @apply h-screen bg-slate-900 flex justify-center items-center text-white;
}
</style>