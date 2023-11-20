<template>
  <div class="wrapper h-screen">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useMainStore } from '@/stores/main'

const mainStore      = useMainStore()
const tokenLocal = localStorage.getItem('token')

if(tokenLocal) {
  mainStore.setToken(tokenLocal)
}
</script>