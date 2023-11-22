<template>
  <div class="login__card">
    <div class="login__form">
      <HeaderMolecule :title="mode === 'login' ? 'Sign in to your account' : 'Register for free'" :error="error" />
      <form class="space-y-4 md:space-y-6" action="#">
        <InputMolecule label="Email" type="email" v-model="email" placeholder="email@example.com" />
        <InputMolecule label="Password" type="password" v-model="password" placeholder="••••••••" />
        <ButtonAtom @click="submit" :label="mode === 'login' ? 'Login' : 'Register'" />
      </form>
      <div>
        <p class="text-sm font-light">
          {{ mode === 'login' ? 'Don’t have an account yet?' : 'Already have an account?' }}
          <RouterLink :to="mode === 'login' ? '/register' : '/login'">
            <span class="font-medium text-primary hover:underline cursor-pointer">
              {{ mode === 'login' ? 'Register' : 'Login' }}
            </span>
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { doLogin, doRegister } from '@/api/users'
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores/main'
import InputMolecule from '@/components/molecules/InputMolecule.vue'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import HeaderMolecule from '@/components/molecules/HeaderMolecule.vue'

const props = defineProps({
  mode: {
    type: String,
    default: 'login'
  }
})
const mainStore = useMainStore()
const router = useRouter()

const error = ref('')
const email = ref('')
const password = ref('')

async function submit() {
  const formLogin = ({
    email: email.value,
    password: password.value,
  })
  if(props.mode === 'login') {
    await doLogin(formLogin)
      .then((res) => {
        localStorage.setItem('token', res.token)
        mainStore.setToken(res.token)
        error.value = ''
        router.push('/blog')
      })
      .catch((err) => {
        console.log('error', err.message)
        error.value = 'Email or password is wrong'
        setTimeout(() => {
          error.value = ''
        }, 3000)
      })
  } else {
    await doRegister(formLogin)
      .then((res) => {
        localStorage.setItem('token', res.token)
        mainStore.setToken(res.token)
        error.value = ''
        router.push('/blog')
      })
      .catch(() => {
        // console.log('error', err.response?.data?.error)
        error.value = 'Something went wrong'
        setTimeout(() => {
          error.value = ''
        }, 3000)
      })
  }
}
</script>

<style scoped lang="postcss">
.login__card {
  @apply w-[90%] bg-gray-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-gray-300;
}

.login__form {
  @apply p-6 space-y-4 md:space-y-6 sm:p-8;
}
</style>