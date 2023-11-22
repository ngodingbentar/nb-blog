import { describe, expect, beforeEach, test } from 'vitest'

import { mount } from '@vue/test-utils'
import PostsLists from '@/components/organisms/PostsLists.vue'
import PostItem from '@/components/molecules/PostItem.vue'
import HeaderList from '@/components/molecules/HeaderList.vue'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import ModalPost from '@/components/organisms/ModalPost.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useMainStore } from '@/stores/main'
import { ref } from 'vue'
import type { IPost } from '@/types/posts'

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
    expect(wrapper.vm.posts).toHaveLength(0)
    // console.log(wrapper.html())
  })
})
