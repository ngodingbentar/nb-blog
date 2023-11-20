<template>
  <div class="wrapper">
    <div class="login">
      <div class="login__main">
        <div class="login__title">
          Ngodingbentar    
        </div>
        <div class="login__card">
          <div class="login__form">
            <h1 class="form__title">
              Sign in to your account
            </h1>
            <div class="form__error">
              <span v-if="error">
                {{ error }}
              </span>
            </div>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input v-model="formLogin.email" type="email" name="email" id="email" class="form__input" placeholder="name@company.com">
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input v-model="formLogin.password" type="password" name="password" id="password" placeholder="••••••••" class="form__input">
              </div>
              <button type="button" @click="submit" class="btn__signin">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { doLogin } from '@/api/users'
import { useRouter } from 'vue-router';

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
.wrapper {
  @apply h-screen bg-slate-900 flex justify-center items-center;
}

.login {
  @apply bg-gray-50 dark:bg-gray-900 max-w-md w-full;
}

.login__main {
  @apply flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ;
}

.login__title {
  @apply flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white;
}

.login__card {
  @apply w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700;
}

.login__form {
  @apply p-6 space-y-4 md:space-y-6 sm:p-8;
}

.form__title {
  @apply text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white;
}

.form__error {
  @apply text-red-600 h-1;
}

.form__input {
  @apply bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.btn__signin {
  @apply w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
}
</style>