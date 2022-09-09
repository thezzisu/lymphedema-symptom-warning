<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <user-embed-proxy />
      </div>
      <div class="col-12">
        <q-card>
          <q-list bordered padding>
            <q-item-label header>基本</q-item-label>

            <q-item tag="label" clickable to="/eula">
              <q-item-section>
                <q-item-label>用户协议</q-item-label>
              </q-item-section>
            </q-item>

            <q-item tag="label">
              <q-item-section>
                <q-item-label>关于</q-item-label>
                <q-item-label caption>
                  淋巴水肿筛查工具 {{ version }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { version } from '@/../package.json'
import UserEmbedProxy from '@/components/UserEmbedProxy.vue'
</script>
