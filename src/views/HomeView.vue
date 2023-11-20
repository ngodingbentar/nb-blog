<template>
  <div class="bg-red-200">hah</div>
  <button @click="test">tes</button>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { doLogin } from '@/api/users'
async function test() {
  const payload = reactive({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  })
  await doLogin(payload)
    .then((res) => {
      localStorage.setItem('token', res.token)
    })
}
</script>