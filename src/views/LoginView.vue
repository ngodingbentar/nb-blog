<template>
  <div class="wrapper">
    <div class="login">
      <div class="login__main">
        <div class="login__title">
          Ngodingbentar    
        </div>
        <CardLogin />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardLogin from '@/components/organisms/CardLogin.vue'
</script>

<style scoped lang="postcss">
.wrapper {
  @apply h-screen flex justify-center items-center;
}

.login {
  @apply  max-w-md w-full;
}

.login__main {
  @apply flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ;
}

.login__title {
  @apply flex items-center mb-6 text-2xl font-semibold;
}
</style>