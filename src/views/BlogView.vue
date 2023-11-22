<template>
  <div class="mt-4">
    <div class="w-full flex justify-center text-xl font-bold ">
      Ngodingbentar - Posts
    </div>
    <div class="mt-4 px-4 md:px-8 lg:px-8">
      <PostsLists />
    </div>
  </div>
</template>

<script setup lang="ts">
import PostsLists from '@/components/organisms/PostsLists.vue'
</script>


<style scoped lang="postcss">
.wrapper {
  @apply h-screen flex justify-center items-center text-white;
}
</style>