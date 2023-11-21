import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PostsLists from '@/components/organisms/PostsLists.vue'
import PostItem from '@/components/molecules/PostItem.vue'
import HeaderList from '@/components/molecules/HeaderList.vue'
import ModalPost from '@/components/organisms/ModalPost.vue'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import { ref } from 'vue'
import type { IPost } from '@/types/posts'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/utils/fire'

describe('PostsLists', () => {
  it('renders properly', async() => {
    const wrapper = mount({
      components: {
        PostsLists,
        PostItem,
        HeaderList,
        ModalPost,
        ButtonAtom
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
              <HeaderList />
              <div v-for="(item ,index) in posts" :key="index" class="">
                <PostItem :post="item" @show="showModal" @delete="deletePost" />
              </div>
            </div>
          </div>
        </PostsLists>
      `,
      setup(_: any, {emit}: any) {
        const posts = [
          {
            id: 1,
            name: 'test',
            description: 'test'
          }
        ]
        const isNew = ref(true)
        const post = ref({} as IPost)
        const show = ref(true)

        async function submit (payload: IPost) {
          if(payload.isNew) {
            await addDoc(collection(db, 'posts'), {
              name: payload.name,
              description: payload.description
            }).then(() => {
              show.value = false
              // init()
            })
          } else {
            if (payload.id) {
              await updateDoc(doc(db, 'posts', payload.id || ''), {
                name: payload.name,
                description: payload.description
              }).then(() => {
                show.value = false
                // init()
              })
            }
          }
        }

        function showModal(data: IPost) {
          show.value = true
          isNew.value = data.isNew as boolean
          post.value = data
        }

        return { posts, isNew, post, show, submit, showModal }
      },
    })
    expect(wrapper.classes()).toContain('posts')
    expect(wrapper.html()).toContain('Add post')
    wrapper.find('.btn__signin').trigger('click')
    wrapper.find('.btn__add').trigger('click', { isNew: true, id: '' })
    // console.log('wrapper.html()', wrapper.html())
    // wrapper.find('.btn__signin').trigger('click')
    // wrapper.find('.btn__close').trigger('click')
  })
})
