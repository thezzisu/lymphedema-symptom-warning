import { useLocalStorage } from '@vueuse/core'
import axios from 'axios'
import { computed, watch } from 'vue'

const BASE: string = (import.meta.env.VITE_API_BASE as string) || '/api'

interface IUser {
  id: number
  tel: string
  nickname: string
  realname: string
  age: number
  admin: boolean
}

export const apiToken = useLocalStorage('token', '')
export const apiUser = useLocalStorage<IUser>('user', {} as IUser, {
  deep: true
})
export const isLoggedIn = computed(() => !!apiToken.value)
watch(
  () => apiToken,
  (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  },
  { immediate: true }
)

axios.defaults.baseURL = BASE

export async function verify(tel: string, response: string) {
  await axios.post('/verify', { tel, response })
}

export async function login(tel: string, code: string) {
  const res = await axios.post('/login', { tel, code })
  const { user, jwt } = res.data
  apiUser.value = user
  apiToken.value = jwt
}

export async function logout() {
  apiToken.value = ''
}

export async function myProfile() {
  const res = await axios.get('/user/profile', {
    params: { userId: apiUser.value.id }
  })
  apiUser.value = res.data
  return res.data
}
