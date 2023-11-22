<template>
  <!-- <div class="flex bg-gray-200 justify-between py-4 px-4 md:px-8 lg:px-8 "> -->
  <div class="flex bg-gray-200 justify-between px-4 md:px-8 ">
    <div class="flex items-center">
      <div class="nav__item" :class="{ '--active': route.path === '/blog' || route.path === '/' }">
        <RouterLink to="/blog">Blog</RouterLink>
      </div>
      <div class="nav__item" :class="{ '--active': route.path === '/filter' }">
        <RouterLink to="/filter">Filter</RouterLink>
      </div>
    </div>
    <div class="py-2">
      <ButtonAtom @click="logout" variant="danger" label="Logout" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/main'
import { useRoute, useRouter } from 'vue-router'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'

const mainStore = useMainStore()
const router = useRouter()
const route = useRoute()

function logout() {
  mainStore.setToken('')
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped lang="postcss">
.nav__item {
  @apply cursor-pointer  h-full w-full flex items-center px-4;
}

.--active {
  @apply bg-gray-300;
}
</style>