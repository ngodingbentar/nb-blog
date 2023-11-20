<template>
  <div class="posts">
    <div>
      <button @click="showModal({ isNew: true, id: null })">show</button>
      <ModalPost :show="show" @close="show = false" @submit="submit" :isNew="isNew" :post="post" />
    </div>
    <HeaderList />
    <div v-for="post in posts" :key="post.id" class="">
      <PostItem :post="post" @show="showModal" @delete="deletePost" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/utils/firebase'
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

import PostItem from '@/components/molecules/PostItem.vue'
import HeaderList from '@/components/molecules/HeaderList.vue'
import ModalPost from '@/components/organisms/ModalPost.vue'

const show = ref(false)
const isNew = ref(true)
const posts = ref([])
const post = ref({})

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

function showModal(data) {
  show.value = true
  isNew.value = data.isNew
  post.value = data
}

async function submit (payload) {
  if(payload.isNew) {
    await addDoc(collection(db, 'posts'), {
      name: payload.name,
      description: payload.description
    }).then(() => {
      show.value = false
      init()
    })
  } else {
    await updateDoc(doc(db, 'posts', payload.id), {
      name: payload.name,
      description: payload.description
    }).then(() => {
      show.value = false
      init()
    })
  }
}

async function deletePost(id) {
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