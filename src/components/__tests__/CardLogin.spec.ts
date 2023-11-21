import { describe, it, expect, beforeEach } from 'vitest'
import { reactive, ref } from "vue";
import { setActivePinia, createPinia } from 'pinia'
import { useMainStore } from '@/stores/main'

import { mount } from '@vue/test-utils'
import CardLogin from '@/components/organisms/CardLogin.vue'
import InputMolecule from '@/components/molecules/InputMolecule.vue'
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import HeaderMolecule from '@/components/molecules/HeaderMolecule.vue'
import { doLogin } from '@/api/users';
import { useRouter } from 'vue-router';

describe('CardLogin', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })
  it('renders properly', () => {
    const mainStore = useMainStore()

    const error = ref('')
    const email = ref('')
    const password = ref('')

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
      setup() {
        const router = useRouter()
        async function submit() {
          const formLogin = ({
            email: email.value,
            password: password.value,
          })
          await doLogin(formLogin)
            .then((res) => {
              console.log('res.token', res.token)
              localStorage.setItem('token', res.token)
              mainStore.setToken(res.token)
              error.value = ''
              router.push('/blog')
            })
            .catch((err) => {
              console.log('error', err.message)
              error.value = 'Email or password is wrong'
              setTimeout(() => {
                error.value = ''
              }, 3000)
            })
        }
        return { error, email, password, router, submit }
      }
    })
    expect(wrapper.classes()).toContain('login__card')
    wrapper.find('.input-email').setValue('test@gmail.com')
    wrapper.find('.input-password').setValue('test@gmail.com')
    // console.log('wrapper.html()', wrapper.html())
    wrapper.find('button').trigger('click')
  })
})
