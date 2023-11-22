import { describe, expect, beforeEach, test } from 'vitest'

import { mount } from '@vue/test-utils'
import PostsLists from '@/components/organisms/PostsLists.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('PostsLists', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('renders properly', async () => {
    const wrapper = mount(PostsLists, {
      data() {
        return {
          show: true,
          posts: [],
        }
      }
    })
  
    expect(wrapper.html()).toContain('Add post')
    expect(wrapper.classes()).toContain('posts')
    wrapper.find('.btn__signin').trigger('click')
    await wrapper.setData({ show: true})
    wrapper.find('.btn__add').trigger('click', { isNew: true, id: '' })
    wrapper.find('.btn__close').trigger('click')
    // expect(wrapper.vm.posts).toHaveLength(0)
    // console.log(wrapper.html())
  })
})
