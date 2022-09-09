<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="mdi-menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>淋巴水肿筛查工具</q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab
          v-for="(item, i) in navItems"
          :key="i"
          :label="item.label"
          :to="item.to"
        />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" elevated>
      <q-list>
        <q-item
          clickable
          v-ripple
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <div class="row justify-center">
        <div>&copy; thezzisu 2022</div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const navItems = [
  { to: '/', label: '记录', icon: 'mdi-history' },
  { to: '/tasks', label: '打卡', icon: 'mdi-calendar-check' },
  // { to: '/predict', label: '预测', icon: 'mdi-calculator' },
  { to: '/articles', label: '知识', icon: 'mdi-book-open-page-variant' },
  { to: '/account', label: '账户', icon: 'mdi-account' }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
