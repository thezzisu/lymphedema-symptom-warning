import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import Models from '@/pages/Models.vue'
import Predict from '@/pages/Predict.vue'
import Result from '@/pages/Result.vue'
import Articles from '@/pages/Articles.vue'
import Article from '@/pages/Article.vue'
import Account from '@/pages/Account.vue'
import Login from '@/pages/Login.vue'
import Profile from '@/pages/Profile.vue'
import NotFound from '@/pages/NotFound.vue'
import Tasks from '@/pages/Tasks.vue'
import Eula from '@/pages/Eula.vue'
import { isLoggedIn } from '@/api'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'index',
      path: '/',
      component: Index
    },
    {
      name: 'tasks',
      path: '/tasks',
      component: Tasks
    },
    {
      name: 'models',
      path: '/predict',
      component: Models
    },
    {
      name: 'predict',
      path: '/predict/:modelId',
      component: Predict,
      props: true
    },
    {
      name: 'result',
      path: '/result/:resultId',
      component: Result,
      props: true
    },
    {
      name: 'articles',
      path: '/articles',
      component: Articles
    },
    {
      name: 'article',
      path: '/article/:articleId',
      component: Article,
      props: true
    },
    {
      name: 'account',
      path: '/account',
      component: Account
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'profile',
      path: '/profile',
      component: Profile
    },
    {
      name: 'eula',
      path: '/eula',
      component: Eula
    },
    {
      name: 'notFound',
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (isLoggedIn.value) {
    return next()
  }
  if (to.name === 'login') {
    return next()
  }
  return next({ name: 'login' })
})

export default router
