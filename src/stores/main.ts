import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const token = ref('')
  const loading = ref(false)

  function setToken(payload: string) {
    token.value = payload
  }

  function setLoading(payload: boolean) {
    console.log('loading', payload)
    loading.value = payload
  }

  return {
    loading,
    token,
    setToken,
    setLoading
  }
})
