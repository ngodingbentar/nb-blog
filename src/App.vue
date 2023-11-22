<template>
  <div class="wrapper h-screen">
    <NavbarComp v-if="route.path != '/login'" />
    <LoaderComp :show="loading" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useMainStore } from '@/stores/main'
import NavbarComp from '@/components/organisms/NavbarComp.vue'
import LoaderComp from './components/molecules/LoaderComp.vue';
import { storeToRefs } from 'pinia';

const route = useRoute()
const mainStore  = useMainStore()
const tokenLocal = localStorage.getItem('token')

const { loading } = storeToRefs(mainStore)

if(tokenLocal) {
  mainStore.setToken(tokenLocal)
}
</script>