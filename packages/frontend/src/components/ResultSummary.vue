<template>
  <q-banner v-if="!bcrl" class="text-white bg-negative" inline-actions>
    <template v-slot:avatar>
      <q-icon name="mdi-information" />
    </template>
    请先完成风险预测
    <template v-slot:action>
      <q-btn flat color="white" label="开始预测" to="/predict/bcrl" />
    </template>
  </q-banner>
  <q-separator />
  <div class="q-px-sm q-pb-md row justify-evenly">
    <div class="text-center col-6">
      <div class="text-h6">风险预测</div>
      <div class="font-bold">当前</div>
      <result-summary-item v-if="bcrl" :record="bcrl" />
      <div v-else class="column items-center">
        <q-icon name="mdi-information" color="grey" size="xl" />
        <div>无数据</div>
      </div>
    </div>
    <div class="text-center col-6">
      <div class="text-h6">症状预警</div>
      <div class="font-bold">
        {{
          `${start.getMonth() + 1}月${start.getDate()}日至` +
          `${end.getMonth() + 1}月${end.getDate()}日`
        }}
      </div>
      <result-summary-item v-if="weekRange" :record="weekRange" />
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
import { apiUser } from '@/api'

const msPerDay = 24 * 60 * 60 * 1000
const now = new Date()
now.setHours(0, 0, 0, 0)
const weekStart = new Date(now.getTime() - now.getDay() * msPerDay)
const weekEnd = new Date(weekStart.getTime() + 7 * msPerDay)
const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
const [start, end] = apiUser.value.isHighRisk
  ? [weekStart, weekEnd]
  : [monthStart, monthEnd]
const weekRange = await db.predictRecords
  .where('ts')
  .between(+start, +end, true, false)
  .and((record) => record.modelId === 'symptom')
  .last()

const bcrl = await db.predictRecords.where('modelId').equals('bcrl').last()
</script>
