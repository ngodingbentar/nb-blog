import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ErrorAtom from '@/components/atoms/ErrorAtom.vue'

describe('ErrorAtom', () => {
  it('renders properly', () => {
    const wrapper = mount(ErrorAtom, { props: { error: 'Email or password is wrong' } })
    expect(wrapper.text()).toContain('Email or password is wrong')
  })
})
