<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">预测历史</div>
              </div>
              <div class="col-auto">
                <q-btn
                  color="primary"
                  icon="mdi-plus"
                  label="开始预测"
                  to="/predict"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator inset />
          <q-card-section v-if="records.length">
            <predict-graph :records="records" />
            <v-divider />
            <v-list dense>
              <predict-record
                v-for="(record, i) in records"
                :key="i"
                :record="record"
              />
            </v-list>
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
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const records = ref([])
</script>
