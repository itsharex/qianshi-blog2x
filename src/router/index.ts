import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { useStore } from '@/store'

// const moduleFiles = import.meta.glob('../views/*/*.vue')
const routes: Array<RouteRecordRaw> = [
  { path: '/:catchAll(.*)', 
    // component: moduleFiles['../views/statePage/404.vue']
    component: () => import('@/views/statePage/404.vue')
  },
  {
    path: '/index',
    component: () => import('@/views/index.vue'),
    redirect: '/',
    children: [
      {
        name: 'home',
        path: '/',
        // component: defineAsyncComponent(() => import('@/views/home/index.vue')),
        component: () => import('@/views/home/index.vue'),
        children: [],
        meta: { 
          title: '首页',
          description: '首页'
        }
      },
      {
        name: 'demo',
        path: '/demo',
        // component: moduleFiles['../views/demo/index.vue'],
        component: () => import('@/views/demo/index.vue'),
        children: []
      },
      {
        name: 'artDetail',
        path: '/artDetail',
        // component: moduleFiles['../views/artDetail/index.vue']
        component: () => import('@/views/artDetail/index.vue'),
        meta: { 
          title: '文章详情',
          description: '当前文章详细内容'
        }
      },
      {
        name: 'friendshipChain',
        path: '/friendshipChain',
        // component: moduleFiles['../views/friendshipChain/index.vue']
        component: () => import('@/views/friendshipChain/index.vue'),
        meta: { 
          title: '友链',
          description: '友情链接'
        }
      },
      {
        name: 'log',
        path: '/log',
        // component: moduleFiles['../views/log/index.vue']
        component: () => import('@/views/log/index.vue'),
        meta: { 
          title: '更新日志',
          description: '更新日志'
        }
      },
      {
        name: 'about',
        path: '/about',
        // component: moduleFiles['../views/about/index.vue']
        component: () => import('@/views/about/index.vue'),
        meta: { 
          title: '关于',
          description: '关于'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    (document as any).title = to.meta.title;
  }
  

  console.log(document.head) 
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description as string)
  } else {
    const routerMeta = document.createElement('meta')
    routerMeta.setAttribute('name', 'description')
    routerMeta.setAttribute('content', to.meta.description as string)
    document.head.appendChild(routerMeta)
  }
  next()
})

export default router