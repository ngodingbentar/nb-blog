import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import PostItem from '@/components/molecules/PostItem.vue'

describe('PostItem', () => {
  it('renders properly', () => {
    const wrapper = mount(PostItem, {
      props: {
        post: {
          name: 'name',
          description: 'description',
          id: 'id',
        }
      },
      setup(props: { post: any }, {emit}: any) {
        const show = ref(true)
        function deletePost() {
          emit('delete', 'id')
        }
        function updatePost() {
          show.value = false
          emit('show', props.post)
        }
        return { show, deletePost, updatePost }
      }
    })
    expect(wrapper.text()).toContain('name')
    expect(wrapper.vm.post.id).toBe('id')
    expect(wrapper.vm.post.name).toBe('name')
    expect(wrapper.vm.post.description).toBe('description')
    wrapper.find('.update').trigger('click')
    wrapper.find('.delete').trigger('click')
    wrapper.find('.action').trigger('click')
    expect(wrapper.classes()).toContain('post__item')
    wrapper.vm.$emit('delete', 'id')
    wrapper.vm.$emit('show', 'post')
    expect(wrapper.emitted()).toHaveProperty('delete')
  })
})
