import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import InputAtom from '@/components/atoms/InputAtom.vue'

describe('InputAtom', () => {
  it('renders properly', () => {
    const wrapper = mount(InputAtom, { props: { type: 'text', modelValue: 'test', disabled: false, placeholder: 'input name' } })
    expect(wrapper.vm.type).toBe('text')
    expect(wrapper.vm.disabled).toBe(false)
    expect(wrapper.vm.modelValue).toBe('test')
    expect(wrapper.vm.placeholder).toBe('input name')
  })
})
