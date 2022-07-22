<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h5">预测模型</div>
            <div>请选择一个预测模型以进行预测</div>
          </q-card-section>
          <q-separator />
          <q-list>
            <q-item
              v-for="(item, i) of items"
              :key="i"
              :to="`/predict/${item[0]}`"
            >
              <q-item-section>
                <q-item-label>{{ item[1].name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { models } from '@/core/model'

const items = Object.entries(models)
</script>
