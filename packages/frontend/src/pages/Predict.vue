<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">发病率预测</div>
            <div>请按照您最近的真实情况作答，以提高预测结果的可靠性</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section
            v-for="(value, key, i) of variables"
            :key="i"
            class="d-flex flex-column px-4"
          >
            <div>{{ value.text }}</div>
            <div class="q-gutter-sm">
              <q-radio v-model="result[key]" :val="0" label="不符合" />
              <q-radio v-model="result[key]" :val="1" label="符合" />
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-actions>
            <q-btn flat :loading="predictLoading" @click="predictRun">
              预测
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAsyncTask } from '@/composables/async'
import { Answer, predict, variables } from '@/core/predict'
import { wait } from '@/core/utils'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const $q = useQuasar()

const result = ref<Answer>(
  Object.fromEntries(
    Object.entries(variables).map(([key, value]) => [key, 0])
  ) as any
)

const { loading: predictLoading, run: predictRun } = useAsyncTask(async () => {
  await wait(1000)
  $q.notify({
    color: 'positive',
    message: '预测结果：' + (await predict(result.value)).toString(),
    timeout: 2000
  })
})
</script>
