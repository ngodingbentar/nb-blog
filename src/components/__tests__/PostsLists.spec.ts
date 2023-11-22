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
    console.log(wrapper.html())
  })

  test("init", async() => {
    const mainStore = useMainStore()
    const wrapper = mount({
      components: {
        PostsLists,
        PostItem,
        HeaderList,
        ButtonAtom,
        ModalPost
      },
      data() {
        const posts = ref([
          {
            name: 'test',
            description: 'test',
          }
        ] as IPost[])
        return {
          show: false,
          posts,
        }
      },
      template: `
      <PostsLists>
        <div class="posts">
          <div>
            <div class="max-w-[100px]">
              <ButtonAtom @click="showModal({ isNew: true, id: '' })" variant="primary" label="Add post" />
            </div>
            <ModalPost :show="show" @close="show = false" @submit="submit" :isNew="isNew" :post="post" />
          </div>
          <div class="mt-8">
            <!-- <HeaderList /> -->
            <div>- hah</div>
            <div v-for="(item ,index) in posts" :key="index" class="apa-1121212">
              <div>{{ index  }} - hah</div>
              <!-- <PostItem :post="item" @show="showModal" @delete="deletePost" /> -->
            </div>
          </div>
        </div>
      </PostsLists>
      `
    });
    await wrapper.setData({ posts: []})
    const postCollection = [
      {
        id: '123',
        name: 'test 2',
        description: 'test 2',
      },
      {
        id: '1234',
        name: 'test 3',
        description: 'test 3',
      }
    ]
    postCollection.forEach((doc) => {
      wrapper.vm.posts.push({...doc, id: doc.id})
    })
    mainStore.setLoading(true)
    expect(wrapper.vm.posts).toHaveLength(2)
  });
})
