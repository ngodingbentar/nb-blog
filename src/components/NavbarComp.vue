<template>
  <div class="flex bg-gray-200 justify-between p-4 ">
    <div class="flex space-x-4">
      <RouterLink to="/blog">Blog</RouterLink>
      <RouterLink to="/filter">Filter</RouterLink>
    </div>
    <div>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/main'
import { useRouter } from 'vue-router';

const mainStore = useMainStore()
const router = useRouter()

function logout() {
  mainStore.setToken('')
  localStorage.removeItem('token')
  router.push('/login')
}
</script>