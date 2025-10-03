import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
// import EditorPage from '../views/EditorPage.vue'
import EditorPage from '../views/editorPage/EditorPage.vue'
import TemplatesPage from '../views/TemplatesPage.vue'

// 從環境變數獲取 base URL
const baseUrl = import.meta.env.VITE_BASE_URL || '/'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: '首頁 - Email Builder'
    }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: EditorPage,
    meta: {
      title: '郵件編輯器 - Email Builder'
    }
  },
  {
    path: '/templates',
    name: 'Templates', 
    component: TemplatesPage,
    meta: {
      title: '模板庫 - Email Builder'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守衛 - 設置頁面標題
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router