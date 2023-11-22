import { nextTick } from "vue";
import { describe, it, expect, beforeEach, vi, test, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'

import { mount } from '@vue/test-utils'
import CardLogin from '@/components/organisms/CardLogin.vue'
import InputMolecule from '@/components/molecules/InputMolecule.vue'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import HeaderMolecule from '@/components/molecules/HeaderMolecule.vue'

import { doLogin, doRegister } from '@/api/users'
import { useMainStore } from '@/stores/main'

vi.mock('vue-router')
vi.mock('axios')

describe('CardLogin', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers({ shouldAdvanceTime: true });
  })

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

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

  test('Login', async () => {
    const wrapper = mount({
      props: {
        mode: '',
      },
      data: () => {
        return {
          error: '',
        }
      },
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
            <HeaderMolecule :title="mode === 'login' ? 'Sign in to your account' : 'Register for free'" :error="error" />
            <form class="space-y-4 md:space-y-6" action="#">
              <InputMolecule label="Email" type="email" v-model="email" placeholder="email@example.com" />
              <InputMolecule label="Password" type="password" v-model="password" placeholder="••••••••" />
              <ButtonAtom @click="submit" :label="mode === 'login' ? 'Login' : 'Register'" />
            </form>
            <div>
              <p class="text-sm font-light">
                {{ mode === 'login' ? 'Don’t have an account yet?' : 'Already have an account?' }}
                <RouterLink :to="mode === 'login' ? '/register' : '/login'">
                  <span class="font-medium text-primary hover:underline cursor-pointer">
                    {{ mode === 'login' ? 'Register' : 'Login' }}
                  </span>
                </RouterLink>
              </p>
            </div>
          </div>
        </div>
      </CardLogin>
      `,
    })
  
    const newUserMock = {
      token: 'token1234'
    }
  
    vi.mocked(axios.post).mockResolvedValue({
      data: newUserMock,
    })
    
    wrapper.setProps({
      mode: 'login',
    })
    await nextTick()
    wrapper.find('.btn__login').trigger('click')
    wrapper.setData({
      error: 'Something went wrong',
    })
    vi.advanceTimersByTime(3000)
    wrapper.setData({
      error: '',
    })
    expect(wrapper.vm.mode).toBe('login')
  })
})
