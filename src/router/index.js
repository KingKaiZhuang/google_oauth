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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // 如果是訪問根路徑'/'，則直接放行
  if (to.fullPath === '/') {
    next();
    return;
  }

  // 如果無token且試圖訪問非登錄頁面，則重定向到登錄頁面
  if (!token && to.path !== '/api/v3/login') {
    next('/api/v3/login');
  } else {
    // 有token或訪問的是登錄頁面，則正常放行
    next();
  }
});


export default router
