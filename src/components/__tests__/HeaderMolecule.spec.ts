import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HeaderMolecule from '@/components/molecules/HeaderMolecule.vue'
import HeaderAtom from '@/components/atoms/HeaderAtom.vue'
import ErrorAtom from '@/components/atoms/ErrorAtom.vue'

it('should rendered properly with any props', () => {
  const screen = mount(HeaderMolecule, {
    components: {HeaderAtom, ErrorAtom },
    props     : {
      title: 'Login',
      error: 'Email or password is wrong',
    },
  })

  expect(screen.classes()).toContain('form__wrapper')
  expect(screen.vm.title).toBe('Login')
  expect(screen.html()).toBe('<span class="form__wrapper"><h1 data-v-1b52c0be="" class="form__title">Login</h1><div data-v-65d5e1b1="" class="form__error"><span data-v-65d5e1b1="">Email or password is wrong</span></div></span>')
})