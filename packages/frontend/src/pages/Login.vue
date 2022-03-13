<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h5 text-center">注册/登录</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div class="row">
              <div class="col-12 col-md-6">
                <q-input label="手机" name="phone" type="tel" v-model="tel" />
              </div>
              <div class="col-12 col-md-6">
                <div class="row items-end">
                  <div class="col">
                    <q-input label="验证码" name="code" v-model="code" />
                  </div>
                  <div class="col-auto">
                    <q-btn
                      outline
                      label="发送验证码"
                      @click="send"
                      :loading="sendLoading"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions vertical>
            <q-btn
              unelevated
              color="primary"
              label="登录"
              @click="run"
              :loading="loading"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { login, verify } from '@/api'
import { useAsyncTask } from '@/composables/async'
import { useQuasar } from 'quasar'
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'

const tel = ref('')
const code = ref('')
const $q = useQuasar()
const router = useRouter()

const { run: send, loading: sendLoading } = useAsyncTask(async () => {
  await verify(tel.value)
})

const { run, loading } = useAsyncTask(async () => {
  await login(tel.value, code.value)
  $q.notify({
    color: 'positive',
    message: '登录成功'
  })
  nextTick(() => router.push('/account'))
})
</script>
