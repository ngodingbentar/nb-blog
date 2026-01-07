<template>
  <div class="posts">
    <div>
      <div class="max-w-[100px]">
        <ButtonAtom @click="showModal({ isNew: true, id: '' })" variant="primary" label="Add post" />
      </div>
      <ModalPost :show="show" @close="show = false" @submit="submit" :isNew="isNew" :post="post" />
    </div>
    <div class="mt-8">
      <HeaderList />
      <div v-for="(item, index) in posts" :key="index" class="">
        <PostItem :post="item" @show="showModal" @delete="deletePost" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import type { IPost } from '@/types/posts'
import { db } from '@/utils/fire'
import { useMainStore } from '@/stores/main'

import PostItem from '@/components/molecules/PostItem.vue'
import HeaderList from '@/components/molecules/HeaderList.vue'
import ModalPost from '@/components/organisms/ModalPost.vue'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'

const mainStore = useMainStore()
const show = ref(false)
const isNew = ref(true)
const posts = ref([] as IPost[])
const post = ref({} as IPost)

import { auth } from '@/utils/fire'
import { onAuthStateChanged } from 'firebase/auth'

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      init()
    } else {
      mainStore.setLoading(false)
      // Optional: redirect to login if needed
    }
  })
})

async function init() {
  posts.value = []

  let postCollection = await getDocs(collection(db, 'posts'))
  postCollection.forEach((doc) => {
    posts.value.push({ ...doc.data(), id: doc.id })
  })
  mainStore.setLoading(false)
}

function showModal(data: IPost) {
  show.value = true
  isNew.value = data.isNew as boolean
  post.value = data
}

async function submit(payload: IPost) {
  mainStore.setLoading(true)
  show.value = false
  if (payload.isNew) {
    await addDoc(collection(db, 'posts'), {
      name: payload.name,
      description: payload.description
    }).then(() => {
      show.value = false
      mainStore.showToast({ type: 'success', title: 'Success', content: 'Post added successfully' })
      init()
    }).catch(() => {
      mainStore.showToast({ type: 'error', title: 'Error', content: 'Something went wrong' })
    })
  } else {
    if (payload.id) {
      await updateDoc(doc(db, 'posts', payload.id || ''), {
        name: payload.name,
        description: payload.description
      }).then(() => {
        show.value = false
        mainStore.showToast({ type: 'success', title: 'Success', content: 'Post updated successfully' })
        init()
      }).catch(() => {
        mainStore.showToast({ type: 'error', title: 'Error', content: 'Something went wrong' })
      })
    }
  }
}

async function deletePost(id: string) {
  mainStore.setLoading(true)
  await deleteDoc(doc(db, 'posts', id))
    .then(() => {
      mainStore.showToast({ type: 'success', title: 'Success', content: 'Post deleted successfully' })
      init()
    }).catch(() => {
      mainStore.showToast({ type: 'error', title: 'Error', content: 'Something went wrong' })
    })
}
</script>

<style scoped lang="postcss">
.posts {
  @apply flex flex-col bg-white;
}
</style>