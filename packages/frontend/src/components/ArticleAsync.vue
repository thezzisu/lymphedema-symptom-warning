<template>
  <div class="row">
    <div class="col-12">
      <q-card>
        <q-img height="144px" :src="article.cover" />
        <q-card-section>
          <div class="text-h5">{{ article.title }}</div>
          <div>{{ article.summary }}</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section v-html="contentHTML" />
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticle } from '@/core/api'
import { marked } from 'marked'

const props = defineProps<{
  articleId: string
}>()

const article = await getArticle(props.articleId)
const contentHTML = marked.parse(article.content)
</script>
