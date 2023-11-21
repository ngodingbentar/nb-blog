import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'

describe('ButtonAtom', () => {
  it('renders properly', () => {
    const wrapper = mount(ButtonAtom, { props: { label: 'Submit', variant: 'primary' } })
    expect(wrapper.text()).toContain('Submit')
    expect(wrapper.classes()).toContain('primary')
  })
})
