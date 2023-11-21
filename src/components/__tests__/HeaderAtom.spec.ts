import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HeaderAtom from '@/components/atoms/HeaderAtom.vue'

describe('HeaderAtom', () => {
  it('renders properly', () => {
    const wrapper = mount(HeaderAtom, { props: { title: 'Ngodingbentar' } })
    expect(wrapper.text()).toContain('Ngodingbentar')
  })
})
