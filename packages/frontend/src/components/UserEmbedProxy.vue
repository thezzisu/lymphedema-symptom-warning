<template>
  <user-embed v-if="isLoggedIn" />
  <login-embed v-else />
</template>

<script setup lang="ts">
import { isLoggedIn } from '@/api'
import LoginEmbed from '@/components/LoginEmbed.vue'
import UserEmbed from '@/components/UserEmbed.vue'
</script>
