<template>
  <div class="posts">
    <HeaderList />
    <div v-for="post in posts" :key="post.id" class="">
      <PostItem :post="post" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/utils/firebase'
import { getDocs, collection } from 'firebase/firestore'
import PostItem from '@/components/molecules/PostItem.vue'
import HeaderList from '@/components/molecules/HeaderList.vue'

const show = ref(false)

const posts = ref([
  {
    id: '123123123',
    name: 'test lorem asda asdasd asd',
    description: 'test'
  },
  {
    id: '1234213123',
    name: 'test 12',
    description: 'test 23'
  }
])

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
.posts {
  @apply flex flex-col bg-white;
}
</style>