<template>
  <q-card>
    <q-card-section>
      <div class="row">{{ apiUser.nickname }}</div>
      <div class="row">{{ apiUser.age }}岁</div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn color="negative" label="退出登录" @click="doLogout" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { apiUser, logout } from '@/api'
import { useQuasar } from 'quasar'

const $q = useQuasar()

function doLogout() {
  logout()
  $q.notify({
    color: 'positive',
    message: '退出登录成功'
  })
}
</script>
