import { describe, expect, beforeEach, test } from 'vitest'

import { mount } from '@vue/test-utils'
import PostsLists from '@/components/organisms/PostsLists.vue'
import { createPinia, setActivePinia } from 'pinia'


describe('PostsLists', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('renders properly', () => {
    const wrapper = mount(PostsLists, {
      data() {
        return {
          show: true
        }
      }
    })
  
    expect(wrapper.html()).toContain('Add post')
    expect(wrapper.classes()).toContain('posts')
    wrapper.find('.btn__signin').trigger('click')
    wrapper.find('.btn__add').trigger('click', { isNew: true, id: '' })
  })
})
