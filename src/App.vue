<template>
  <div class="wrapper h-screen bg-red-100">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterView } from 'vue-router'
import { doLogin } from '@/api/users'
async function test() {
  const payload = reactive({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  })
  await doLogin(payload)
    .then((res) => {
      console.log(res)
      localStorage.setItem('token', res.token)
    })
}
</script>