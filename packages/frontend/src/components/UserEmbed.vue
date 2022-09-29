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
    <template v-if="apiUser.admin">
      <q-separator />
      <q-card-actions align="right">
        <q-btn outline label="发送高危通知" @click="notifyHighRisk" />
        <q-btn outline label="发送低危通知" @click="notifyLowRisk" />
        <q-btn outline label="导出用户" @click="doExportUsers" />
        <q-btn outline label="导出记录" @click="doExportRecords" />
      </q-card-actions>
    </template>
  </q-card>
</template>

<script lang="ts" setup>
import {
  apiUser,
  logout,
  updateProfile,
  exportUsers,
  exportRecords,
  notifyHighRisk,
  notifyLowRisk
} from '@/api'
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

function saveAsFile(content: string, type: string, name: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}

function doExportUsers() {
  exportUsers().then((data) => {
    saveAsFile(JSON.stringify(data), 'application/json', 'users.json')
  })
}

function doExportRecords() {
  exportRecords().then((data) => {
    saveAsFile(JSON.stringify(data), 'application/json', 'records.json')
  })
}
</script>