import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

const BASE = import.meta.env.VITE_API_BASE || '/api'

export const token = useLocalStorage('token', '')
export const user = useLocalStorage('user', {})
export const isLoggedIn = computed(() => token.value !== '')

export async function verify(tel: string, response: string) {
  await fetch(`${BASE}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tel, response })
  })
}

export async function login(tel: string, code: string) {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tel, code })
  })
  const { user, jwt } = await res.json()
  user.value = user
  token.value = jwt
}

export async function logout() {
  token.value = ''
}
