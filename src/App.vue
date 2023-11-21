<template>
  <div class="wrapper h-screen">
    <NavbarComp v-if="route.path != '/login'" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useMainStore } from '@/stores/main'
import NavbarComp from '@/components/organisms/NavbarComp.vue'

const route = useRoute()
const mainStore      = useMainStore()
const tokenLocal = localStorage.getItem('token')

if(tokenLocal) {
  mainStore.setToken(tokenLocal)
}
</script>