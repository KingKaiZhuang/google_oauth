import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/api/v3/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/api/v3/registtion',
    name: 'registtion',
    component: () => import('../views/Registion.vue')
  },
  {
    path: '/shop',
    component: () => import('../views/StoreView.vue'),
    children: [
      {
        path: 'create',
        component: () => import('../components/CreateShop.vue'),
      },
      {
        path: 'list',
        component: () => import('../components/ShopList.vue'),
      }
    ]
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/CalendarView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
