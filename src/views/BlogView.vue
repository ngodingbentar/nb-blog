<template>
  <div class="wrapper2">
    <div>
      Header
    </div>
    <div>
      <PostsLists />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/utils/firebase'
import { getDocs, collection } from 'firebase/firestore'
import PostsLists from '@/components/organisms/PostsLists.vue'

const posts = ref([])

// onMounted(() => {
//   cek()
// })

async function cek () {
  console.log('db', db)
  let postCollection = await getDocs(collection(db, 'posts'))
  postCollection.forEach((doc) => {
    console.log(doc.data(), doc.id)
    posts.value.push({...doc.data(), id: doc.id})
  })

  console.log('posts', posts.value)
}
</script>


<style scoped lang="postcss">
.wrapper {
  @apply h-screen bg-slate-900 flex justify-center items-center text-white;
}

.login {
  @apply bg-gray-50 dark:bg-gray-900 max-w-md w-full;
}

.login__main {
  @apply flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ;
}

.login__title {
  @apply flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white;
}
</style>