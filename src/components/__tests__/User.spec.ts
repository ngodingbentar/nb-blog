import { vi, test, expect } from 'vitest'
import axios from 'axios'
import { doLogin, doRegister } from '@/api/users'

vi.mock('axios')

test('login', async () => {
  const newUserPayload = {
    email: 'eve.holt@reqres.in',
    password: '12345'
  }

  const newUserMock = {
    data: {
      token: 'token1234'
    }
  }

  vi.mocked(axios.post).mockResolvedValue({
    data: newUserMock,
  })

  const res = await doLogin(newUserPayload)
  expect(res.data.token).toBe('token1234')
})


test('register', async () => {
  const newUserPayload = {
    email: 'eve.holt@reqres.in',
    password: '12345'
  }

  const registerMock = {
    data: {
      id: '123',
      token: '12345'
    }
  }

  vi.mocked(axios.post).mockResolvedValue({
    data: registerMock,
  })

  const res = await doRegister(newUserPayload)
  expect(res.data.token).toBe('12345')
})