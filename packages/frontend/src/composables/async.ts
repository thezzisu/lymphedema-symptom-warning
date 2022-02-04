import { ref } from 'vue'

export function useAsyncTask<A extends unknown[], T>(
  cb: (...args: A) => Promise<T>
) {
  const loading = ref(false)
  const error = ref<unknown>(null)
  const run = async (...args: A) => {
    loading.value = true
    error.value = null
    try {
      return await cb(...args)
    } catch (e) {
      console.log(e)
      error.value = e
    } finally {
      loading.value = false
    }
  }
  return { loading, error, run }
}
