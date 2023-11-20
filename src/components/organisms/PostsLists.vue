<template>
  <div class="posts">
    <div>
      <button @click="showModal({ isNew: true, id: '' })">show</button>
      <ModalPost :show="show" @close="show = false" @submit="submit" :isNew="isNew" :post="post" />
    </div>
    <HeaderList />
    <div v-for="(item ,index) in posts" :key="index" class="">
      <PostItem :post="item" @show="showModal" @delete="deletePost" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import type { IPost } from '@/types/posts'
import { db } from '@/utils/fire'

import PostItem from '@/components/molecules/PostItem.vue'
import HeaderList from '@/components/molecules/HeaderList.vue'
import ModalPost from '@/components/organisms/ModalPost.vue'

const show = ref(false)
const isNew = ref(true)
const posts = ref([] as IPost[])
const post = ref({} as IPost)

onMounted(() => {
  init()
})

async function init() {
  posts.value = []

  let postCollection = await getDocs(collection(db, 'posts'))
  postCollection.forEach((doc) => {
    posts.value.push({...doc.data(), id: doc.id})
  })
}

function showModal(data: IPost) {
  show.value = true
  if(data.isNew)
    isNew.value = data.isNew
  post.value = data
}

async function submit (payload: IPost) {
  if(payload.isNew) {
    await addDoc(collection(db, 'posts'), {
      name: payload.name,
      description: payload.description
    }).then(() => {
      show.value = false
      init()
    })
  } else {
    if (payload.id) {
      await updateDoc(doc(db, 'posts', payload.id || ''), {
        name: payload.name,
        description: payload.description
      }).then(() => {
        show.value = false
        init()
      })
    }
  }
}

async function deletePost(id: string) {
  await deleteDoc(doc(db, 'posts', id)).then(() => {
    init()
  })
}
</script>

<style scoped lang="postcss">
.posts {
  @apply flex flex-col bg-white;
}
</style>