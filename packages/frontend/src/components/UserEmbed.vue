<template>
  <q-card>
    <q-card-section>
      <div class="text-h5">{{ apiUser.nickname }}</div>
      <div class="text-subtitle1">{{ apiUser.age }}岁</div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn color="primary" label="用户设置" to="/profile" />
      <q-btn color="negative" label="退出登录" @click="doLogout" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { apiUser, logout, updateProfile } from '@/api'
import { useQuasar } from 'quasar'
import { nextTick } from 'vue'

const $q = useQuasar()

function doLogout() {
  logout()
  $q.notify({
    color: 'positive',
    message: '退出登录成功'
  })
}

nextTick(async () => {
  try {
    await updateProfile()
  } catch (e: any) {
    $q.notify({ color: 'negative', message: '获取最新用户数据失败' })
  }
})
</script>
