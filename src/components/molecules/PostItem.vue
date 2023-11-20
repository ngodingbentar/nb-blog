<template>
  <div class="post__item">
      <!-- <div class="w-2/12 sm:w-1/12 md:w-1/12 lg:w-1/12 px-1 text-ellipsis overflow-hidden ...">
        {{ post.id }}
      </div> -->
    <div class="w-5/12 items-center flex m-auto text-ellipsis overflow-hidden ...">
      {{ post.name }}
    </div>
    <div class="w-5/12 px-1 ">
      {{ post.name }}
    </div>
    <div class="w-2/12 px-1 justify-end items-end flex">
      <button @click="show = !show" class="cursor-pointer text-end justify-end ">x</button>
      <div class="relative">
        <div v-if="show" class="options absolute bg-white shadow-lg p-4 rounded-md right-0 mt-1 z-10">
          <button class="mb-1 pb-1 border-b-2">Delete</button>
          <button>Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    default: () => ({
      name: 'name',
      description: 'description',
    })
  }
})

const show = ref(false)

</script>

<style scoped lang="postcss">
.posts {
  @apply flex flex-col bg-white;
}

.post__item {
  @apply flex p-2 mx-2 my-1 rounded-lg border;
}
</style>