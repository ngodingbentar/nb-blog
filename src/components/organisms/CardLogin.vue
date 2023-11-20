<template>
  <div class="login__card">
    <div class="login__form">
      <HeaderMolecule title="Sign in to your account" :error="error" />
      <form class="space-y-4 md:space-y-6" action="#">
        <InputMolecule label="Email" type="email" v-model="formLogin.email" placeholder="email@example.com" />
        <InputMolecule label="Password" type="password" v-model="formLogin.password" placeholder="••••••••" />
        <ButtonAtom @click="submit" label="Sign in" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { doLogin } from '@/api/users'
import { useRouter } from 'vue-router';
import InputMolecule from '@/components/molecules/InputMolecule.vue'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import HeaderMolecule from '@/components/molecules/HeaderMolecule.vue'

const router = useRouter()
const formLogin = reactive({
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
})

const error = ref('')

async function submit() {
  await doLogin(formLogin)
    .then((res) => {
      localStorage.setItem('token', res.token)
      error.value = ''
      router.push('/')
    })
    .catch((err) => {
      console.log('error', err.message)
      error.value = 'Email or password is wrong'
      setTimeout(() => {
        error.value = ''
      }, 3000)
    })
}
</script>

<style scoped lang="postcss">
.login__card {
  @apply w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700;
}

.login__form {
  @apply p-6 space-y-4 md:space-y-6 sm:p-8;
}
</style>