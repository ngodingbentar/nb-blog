<template>
  <div class="post__item">
    <div class="w-5/12 truncate ...">
      {{ post.name }}
    </div>
    <div class="w-5/12 px-1 truncate ...">
      {{ post.description }}
    </div>
    <div class="w-2/12 px-1 justify-end items-end flex">
      <div class="h-full">
        <button @click="show = !show" class="action cursor-pointer text-end justify-end ">
          <i class="pi pi-bars" style="font-size: 1rem"></i>
        </button>
      </div>
      <div class="relative">
        <div v-if="show" class="options absolute bg-white shadow-lg p-4 rounded-md right-0 mt-1 z-10">
          <button
            class="delete mb-1 pb-1 border-b-2"
            @click="deletePost(post.id)">
            <i class="pi pi-trash" style="font-size: 1rem; color: red;"></i>
            <span class="ml-2">Delete</span>
          </button>
          <button
            class="update flex justify-center m-auto text-center items-center"
            @click="updatePost({ ...post, isNew: false })">
            <i class="pi pi-pencil" style="font-size: 1rem; color: blue;"></i>
            <span class="ml-2">Update</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IPost } from '@/types/posts'

defineProps({
  post: {
    type: Object,
    default: () => ({
      name: 'name',
      description: 'description',
      id: 'id'
    })
  }
})

const show = ref(false)

const emit = defineEmits(['show', 'delete'])

function updatePost(data: IPost) {
  show.value = false
  emit('show', data)
}

function deletePost(id: string) {
  emit('delete', id)
}

</script>

<style scoped lang="postcss">
.posts {
  @apply flex flex-col bg-white;
}

.post__item {
  @apply flex p-2 my-2 rounded-lg border;
}

.btn {
  @apply bg-gray-100 p-2 rounded-lg shadow-md;
}
</style>