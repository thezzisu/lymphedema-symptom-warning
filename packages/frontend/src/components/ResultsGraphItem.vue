<template>
  <q-btn
    v-for="(info, i) of infos"
    flat
    class="q-pa-none"
    size="lg"
    :key="i"
    :color="info.color"
    :icon="info.icon"
  >
    <q-popup-proxy>
      <q-banner v-if="info.target">
        <result-embed :record="info.target" />
      </q-banner>
      <q-banner v-else>
        <template v-slot:avatar>
          <q-icon name="mdi-help" color="grey" />
        </template>
        无记录
      </q-banner>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import { prettierProb } from '@/core/utils'
import { models } from '@/core/model'
import { IPredictRecord } from '@/db'
import ResultEmbed from './ResultEmbed.vue'

const { records } = defineProps<{ records: IPredictRecord[] }>()
const infos = Object.entries(models).map(([id, model]) => {
  const target = records
    .filter((record) => record.modelId === id)
    .sort((a, b) => b.result[0] - a.result[0])[0]
  if (!target)
    return {
      name: model.name,
      label: '无记录',
      color: 'grey',
      icon: 'mdi-help'
    }
  const category = model.getCategory(target.result)
  return {
    name: model.name,
    label: category.label,
    color: category.color,
    icon: category.icon,
    target
  }
})
</script>
