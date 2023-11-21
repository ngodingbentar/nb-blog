import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PostsLists from '@/components/organisms/PostsLists.vue'

describe('PostsLists', () => {
  it('renders properly', () => {
    const wrapper = mount(PostsLists)
    wrapper.find('button').trigger('click')
    expect(wrapper.classes()).toContain('posts')
  })
})
