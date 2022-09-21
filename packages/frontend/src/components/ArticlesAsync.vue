<template>
  <div class="row justify-center">
    <div class="col-12">
      <q-card>
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            v-for="c of categories"
            expand-separator
            :label="c.name"
            class="text-h6"
          >
            <q-card>
              <q-list>
                <q-item v-for="a of c.articles" :to="`/article/${a.id}`">
                  <q-item-section>
                    <q-item-label class="q-pl-lg text-subtitle1">
                      {{ a.title }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getArticles } from '@/core/articles'
import { useRouter } from 'vue-router'

const articles = await getArticles()
const categories = [
  '了解淋巴水肿',
  '居家自我监测',
  '基础预防管理',
  '高危预防管理',
  '治疗资源及途径'
].map((name, index) => ({
  name,
  articles: articles.filter((article) => article.id.startsWith(`${index + 1}_`))
}))
const router = useRouter()

function gotoArticle(articleId: string) {
  router.push({ name: 'article', params: { articleId } })
}
</script>
