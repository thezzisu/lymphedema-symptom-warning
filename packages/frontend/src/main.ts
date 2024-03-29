import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Dialog } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'
import quasarIconSet from 'quasar/icon-set/mdi-v6'
import '@quasar/extras/mdi-v6/mdi-v6.css'
import 'quasar/src/css/index.sass'
import App from '@/App.vue'
import router from '@/routes'
import { isWx } from '@/core/utils'
import LeaveWx from '@/components/LeaveWx.vue'
import { useLocalStorage } from '@vueuse/core'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(Quasar, {
  plugins: { Notify, Dialog },
  lang: quasarLang,
  iconSet: quasarIconSet
})

app.mount('#app')

if (isWx()) {
  const stay = useLocalStorage('stayInWx', false)
  if (!stay.value) {
    Dialog.create({
      component: LeaveWx
    })
  }
}
