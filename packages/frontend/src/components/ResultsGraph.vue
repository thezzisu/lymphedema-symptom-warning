<template>
  <div class="q-px-sm q-pb-md">
    <div class="row justify-between">
      <div class="text-subtitle1">
        7日总览：
        {{ days[0].getMonth() + 1 }}月{{ days[0].getDate() }}日 至
        {{ days[6].getMonth() + 1 }}月{{ days[6].getDate() }}日
      </div>
      <div>
        <q-btn color="primary" icon="mdi-help" outline round size="xs">
          <q-popup-proxy>
            <q-banner>
              <template v-slot:avatar>
                <q-icon name="mdi-help" color="primary" />
              </template>
              该图表基于您过去七日的数据，每天取发病概率最高的一次生成。
            </q-banner>
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col" v-for="(day, i) in days" :key="i">
        <div class="column items-center">
          <results-graph-item :records="recordsPerDay[i]" />
          <div class="text-subtitle2">
            {{ weekdays[i] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPredictRecord } from '@/db'
import ResultsGraphItem from './ResultsGraphItem.vue'
const MS_PER_DAY = 1000 * 60 * 60 * 24

const { records } = defineProps<{ records: IPredictRecord[] }>()

const now = new Date()
const dow = now.getDay()
const start = Math.floor(+now / MS_PER_DAY) * MS_PER_DAY - MS_PER_DAY * dow
const days = [...new Array(7)].map((_, i) => new Date(start + MS_PER_DAY * i))
const recordsPerDay = [...new Array(7)].map((_, i) => {
  const start = +days[i]
  const end = start + MS_PER_DAY
  return records.filter((r) => r.ts >= start && r.ts < end)
})
const weekdays = '日一二三四五六'
</script>
