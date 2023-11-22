import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from "vue";
import { setActivePinia, createPinia } from 'pinia'

import { mount } from '@vue/test-utils'
import CardLogin from '@/components/organisms/CardLogin.vue'
import InputMolecule from '@/components/molecules/InputMolecule.vue'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import HeaderMolecule from '@/components/molecules/HeaderMolecule.vue'

vi.mock('vue-router')

describe('CardLogin', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', async () => {
    const wrapper = mount({
      components: {
        CardLogin,
        InputMolecule,
        ButtonAtom,
        HeaderMolecule,
      },
      template: `
      <CardLogin>
        <div class="login__card">
          <div class="login__form">
            <HeaderMolecule title="Sign in to your account" :error="error" />
            <form class="space-y-4 md:space-y-6" action="#">
              <InputMolecule label="Email" type="email" v-model="email" placeholder="email@example.com" />
              <InputMolecule label="Password" type="password" v-model="password" placeholder="••••••••" />
              <ButtonAtom @click="submit" label="Sign in" />
            </form>
          </div>
        </div>
      </CardLogin>
      `,
    })
    expect(wrapper.classes()).toContain('login__card')
    wrapper.find('.input-email').setValue('eve.holt@reqres.in')
    wrapper.find('.input-password').setValue('123456')
    // console.log('wrapper.html()', wrapper.html())
    await nextTick()
    wrapper.find('button').trigger('click')
  })
})
