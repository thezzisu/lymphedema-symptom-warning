<template>
  <q-card>
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h5">预测历史</div>
        </div>
        <div class="col-auto">
          <q-btn color="primary" icon="mdi-plus" label="开始预测" to="/tasks" />
        </div>
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-section v-if="records.length">
      <result-summary />
      <q-separator />
      <q-list separator>
        <result-embed
          v-for="(record, i) in records"
          :key="i"
          :record="record"
        />
      </q-list>
    </q-card-section>
    <q-card-section v-else>
      <div class="row justify-center">
        <div class="column items-center">
          <div>
            <q-icon name="mdi-alert-circle-outline" size="4rem" />
          </div>
          <div>无记录</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { getPredictRecords } from '@/db'
import ResultEmbed from './ResultEmbed.vue'
import ResultSummary from './ResultSummary.vue'

const records = await getPredictRecords()
</script>
