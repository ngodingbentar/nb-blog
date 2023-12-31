<template>
  <transition name="modal" mode="out-in">
    <div v-if="show" class="modal__overlay">
      <div class="modal__wrapper">
        <div class="login__card">
          <div class="login__form">
            <InputMolecule label="Name" type="text" v-model="postForm.name" placeholder="Name..." />
            <InputMolecule label="Description" type="text" v-model="postForm.description" placeholder="Description..." />
            <div class="modal__footer">
              <div class="flex">
                <ButtonAtom @click="$emit('close')" variant="secondary" label="Close" />
              </div>
              <div class="flex">
                <ButtonAtom @click="submit" variant="primary" :label="isNew ? 'Add' : 'Update'" />
              </div>
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
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'

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

<style lang="postcss" scoped>
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
  @apply w-[90%] bg-gray-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 ;
}

.login__form {
  @apply p-6;
}

.modal__footer {
  @apply flex w-full justify-between mt-8;
}
</style>