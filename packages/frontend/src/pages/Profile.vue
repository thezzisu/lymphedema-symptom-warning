<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h5">用户设置</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div class="text-subtitle1">基本信息</div>
            <q-input label="用户ID" v-model="apiUser.id" readonly disable />
            <q-input label="手机号" v-model="apiUser.tel" readonly disable />
            <q-input label="昵称" v-model="copy.nickname" />
            <q-input label="姓名" v-model="copy.realname" />
            <q-input label="年龄" v-model="copy.age" type="number" />
            <q-toggle label="高风险" v-model="copy.isHighRisk" />
            <q-toggle label="高风险" v-model="copy.noNotification" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" label="取消修改" @click="discard" />
            <q-btn
              color="primary"
              label="保存"
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
import { apiUser, setProfile } from '@/api'
import { useAsyncTask } from '@/composables/async'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

function getCopy() {
  const clone = JSON.parse(JSON.stringify(apiUser.value))
  const { nickname, realname, age, isHighRisk, noNotification } = clone
  return { nickname, realname, age, isHighRisk, noNotification }
}

const copy = ref(getCopy())
function discard() {
  copy.value = getCopy()
}

const $q = useQuasar()

const { run, loading } = useAsyncTask(async () => {
  try {
    await setProfile(copy.value)
    $q.notify({ color: 'positive', message: '保存成功' })
  } catch {
    $q.notify({ color: 'negative', message: '保存失败' })
  }
})
</script>
