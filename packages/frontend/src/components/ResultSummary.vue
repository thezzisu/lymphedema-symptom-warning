<template>
  <div class="q-px-sm q-pb-md row justify-evenly">
    <div class="text-center col-6">
      <div class="text-h6">风险预测</div>
      <div class="font-bold">
        {{
          `${weekStart.getMonth() + 1}月${weekStart.getDate() + 1}日` +
          `${weekEnd.getMonth() + 1}月${weekEnd.getDate() + 1}日`
        }}
      </div>
      <result-summary-item v-if="weekRange" :record="weekRange" />
      <div v-else class="column items-center">
        <q-icon name="mdi-information" color="grey" size="xl" />
        <div>无数据</div>
      </div>
    </div>
    <div class="text-center col-6">
      <div class="text-h6">症状预警</div>
      <div class="font-bold">{{ monthText }}月</div>
      <result-summary-item v-if="monthRange" :record="monthRange" />
      <div v-else class="column items-center">
        <q-icon name="mdi-information" color="grey" size="xl" />
        <div>无数据</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ResultSummaryItem from './ResultSummaryItem.vue'
import { db } from '@/db'

const msPerDay = 24 * 60 * 60 * 1000
const now = new Date()
now.setHours(0, 0, 0, 0)
const weekStart = new Date(now.getTime() - now.getDay() * msPerDay)
const weekEnd = new Date(weekStart.getTime() + 6 * msPerDay)
const weekRange = await db.predictRecords
  .where('ts')
  .between(+weekStart, +weekEnd + msPerDay, true, false)
  .and((record) => record.modelId === 'bcrl')
  .last()

const month = [12, 6, 3, 1].find((m) => now.getMonth() + 1 >= m)! - 1
const monthStart = new Date(now.getFullYear(), month)
const monthEnd = new Date(now.getFullYear(), month + 1)
const monthText = '一|二|三|四|五|六|七|八|九|十|十一|十二'.split('|')[month]
const monthRange = await db.predictRecords
  .where('ts')
  .between(+monthStart, +monthEnd, true, false)
  .and((record) => record.modelId === 'symptom')
  .last()
</script>
