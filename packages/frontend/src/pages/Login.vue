<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h5 text-center">登录</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div class="row">
              <div class="col-12 col-md-6">
                <q-input label="手机" name="phone" v-model="phone" />
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  label="密码"
                  name="password"
                  v-model="password"
                  type="password"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions vertical>
            <q-btn unelevated color="primary" label="登录" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const phone = ref('')
const password = ref('')
</script>
