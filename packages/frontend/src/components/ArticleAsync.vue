<template>
  <div class="row">
    <div class="col-12">
      <q-card>
        <q-card-section>
          <div class="text-h5">{{ article.title }}</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section v-html="article.html" />
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticle } from '@/core/articles'

const props = defineProps<{
  articleId: string
}>()

const article = await getArticle(props.articleId)
</script>
