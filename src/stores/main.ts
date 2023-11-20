import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const token = ref('')

  function setToken(payload: string) {
    token.value = payload
  }

  return { token, setToken }
})
