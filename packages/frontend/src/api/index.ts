import { db, getPredictRecord } from '@/db'
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
    if (token.value) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
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

export async function updateProfile() {
  const res = await axios.get('/user/profile', {
    params: { userId: apiUser.value.id }
  })
  apiUser.value = res.data
  return res.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function setProfile(profile: any) {
  const res = await axios.patch('/user/profile', profile)
  if (res.data === 1) {
    const { nickname, realname, age } = profile
    if (nickname) {
      apiUser.value.nickname = nickname
    }
    if (realname) {
      apiUser.value.realname = realname
    }
    if (age) {
      apiUser.value.age = age
    }
  }
}

export async function addRecord(recordId: number) {
  const record = await getPredictRecord(recordId)
  const { modelId, answer, result, ts } = record
  const res = await axios.post('/user/record', {
    userId: apiUser.value.id,
    data: JSON.stringify({
      modelId,
      answer,
      result,
      ts
    })
  })
  await db.predictRecords.update(record.localId, { id: res.data, synced: true })
}
