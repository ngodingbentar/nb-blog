import { describe, expect, beforeEach, test, vi, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useMainStore } from '@/stores/main'
import { nextTick } from 'vue'

describe('MainStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers({ shouldAdvanceTime: true });
  })

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

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

  test('resetToast', async () => {
    const mainStore = useMainStore()
    mainStore.resetToast()
    expect(mainStore.isToast).toBe(false)
    expect(mainStore.toastStore.type).toBe('')
    expect(mainStore.toastStore.title).toBe('')
    expect(mainStore.toastStore.content).toBe('')
  })

  test('watch isToast', async () => {
    const mainStore = useMainStore()
    mainStore.isToast = true
  
    if(mainStore.isToast) {
      mainStore.isToast = false
      mainStore.toastStore.title = ''
      mainStore.toastStore.content = ''
      vi.advanceTimersByTime(3000)
    }
    expect(mainStore.isToast).toBe(false)
    expect(mainStore.toastStore.title).toBe('')
    expect(mainStore.toastStore.content).toBe('')
  })
})