import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LabelAtom from '@/components/atoms/LabelAtom.vue'

describe('LabelAtom', () => {
  it('renders properly', () => {
    const wrapper = mount(LabelAtom, { props: { label: 'Email', type: 'text' } })
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.vm.type).toBe('text')
  })
})
