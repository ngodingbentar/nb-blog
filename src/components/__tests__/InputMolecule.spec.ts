import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import InputMolecule from '@/components/molecules/InputMolecule.vue'
import LabelAtom from '@/components/atoms/LabelAtom.vue'
import InputAtom from '@/components/atoms/InputAtom.vue'

it('should rendered properly with any props', () => {
  const screen = mount(InputMolecule, {
    components: {LabelAtom, InputAtom },
    props     : {
      label     : 'Name',
      type      : 'text',
      modelValue: 'dewaqintoro',
      disabled  : false,
      placeholder: 'Input Name',
    },
  })

  const card = screen.find('.input__molecule')
  expect(card).toBeDefined()
  expect(screen.vm.label).toBe('Name')
  expect(screen.vm.type).toBe('text')
  expect(screen.vm.modelValue).toBe('dewaqintoro')
  expect(screen.vm.disabled).toBe(false)
  expect(screen.vm.placeholder).toBe('Input Name')
  card.find('input').setValue('test')
})