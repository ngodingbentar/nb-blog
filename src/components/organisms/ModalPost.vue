<template>
  <transition name="modal" mode="out-in">
    <div v-if="show" class="modal__overlay">
      <div class="modal__wrapper">
        <div class="login__card">
          <div class="login__form">
            <InputMolecule label="Name" type="text" v-model="postForm.name" placeholder="Name..." />
            <InputMolecule label="Description" type="text" v-model="postForm.description" placeholder="Description..." />
            <div class="modal__footer">
              <button @click="$emit('close')">close</button>
              <button @click="submit()">{{ isNew ? 'Add' : 'Update' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import InputMolecule from '@/components/molecules/InputMolecule.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: true,
  },
  post: {
    type: Object,
    default: () => ({
      name: '',
      description: ''
    })
  }
})

const emit = defineEmits(['close', 'submit'])

const postForm = reactive({
  name: '',
  description: '',
  id: ''
})

watch(() => props.post, (post) => {
  postForm.name = post.name
  postForm.description = post.description
  postForm.id = post.id
}, { deep: true })

async function submit() {
  emit('submit', { ...postForm, isNew: props.isNew })
}
</script>

<style lang="postcss">
.modal__overlay {
  @apply flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black bg-opacity-50;
}

.modal__wrapper {
  @apply flex w-full h-full justify-center items-center ;
}

.modal__container {
  @apply w-1/3 h-1/3 bg-white rounded-lg;
}

.login__card {
  @apply w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700;
}

.login__form {
  @apply p-6;
}

.modal__footer {
  @apply flex text-white w-full justify-between mt-8;
}
</style>