import { describe, expect, beforeEach, test } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMainStore } from '@/stores/main'

describe('MainStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('initial state', async () => {
    const mainStore = useMainStore()
    expect(mainStore.token).toBe('')
    expect(mainStore.loading).toBe(false)
    expect(mainStore.isToast).toBe(false)
    expect(mainStore.toastStore.type).toBe('')
    expect(mainStore.toastStore.title).toBe('')
    expect(mainStore.toastStore.content).toBe('')
  })

  test('setToken', async () => {
    const mainStore = useMainStore()
    mainStore.setToken('test')
    expect(mainStore.token).toBe('test')
  })

  test('setLoading', async () => {
    const mainStore = useMainStore()
    mainStore.setLoading(true)
    expect(mainStore.loading).toBe(true)
  })

  test('showToast', async () => {
    const mainStore = useMainStore()
    mainStore.showToast({
      type: 'success',
      title: 'Success',
      content: 'Success add data'
    })
    expect(mainStore.isToast).toBe(true)
    expect(mainStore.toastStore.type).toBe('success')
    expect(mainStore.toastStore.title).toBe('Success')
    expect(mainStore.toastStore.content).toBe('Success add data')
  })
})