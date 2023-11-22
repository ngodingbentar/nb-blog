import { ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia'

interface IPayload {
  type: string
  title: string
  content: string
}

export const useMainStore = defineStore('main', () => {
  const token = ref('')
  const loading = ref(false)

  function setToken(payload: string) {
    token.value = payload
  }

  function setLoading(payload: boolean) {
    loading.value = payload
  }

  const isToast = ref(false)
  const toastStore = reactive({
    type: '',
    title: '',
    content: '',
  })

  watch(isToast, (value) => {
    if (value) {
      setTimeout(() => {
        toastStore.title = ''
        toastStore.content = ''
        isToast.value = false
      }, 3000)
    }
  })

  function resetToast () {
    isToast.value = false
    toastStore.type = ''
    toastStore.title = ''
    toastStore.content = ''
  }

  function showToast (payload: IPayload) {
    isToast.value = true
    toastStore.type = payload.type
    toastStore.title = payload.title
    toastStore.content = payload.content
  }

  return {
    loading,
    token,
    isToast,
    toastStore,
    setToken,
    setLoading,
    resetToast,
    showToast,
  }
})
