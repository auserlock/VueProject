// 路由配置
import { useUserStore } from '@/stores'
import {
  createRouter,
  createWebHistory
  // createWebHashHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/order/list',
      children: [
        {
          path: '/order/cart',
          component: () => import('@/views/order/OrderCart.vue')
        },
        {
          path: '/order/manage',
          component: () => import('@/views/order/OrderManage.vue')
        },
        {
          path: '/order/list/',
          component: () => import('@/views/order/OrderList.vue')
        },
        {
          path: '/order/list/:id',
          component: () =>
            import('@/views/order/component/category/CategoryIndex.vue')
        },
        {
          path: '/order/list/:id/:listID',
          component: () => import('@/views/order/component/GoodsDetails.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        },
        {
          path: '/checkout',
          component: () => import('@/views/checkout/CheckoutOrder.vue')
        },
        {
          path: '/payment',
          component: () => import('@/views/payment/PayOrder.vue')
        },
        {
          path: '/payment/success',
          component: () => import('@/views/payment/PaySuccess.vue')
        }
      ]
    }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

// 添加登陆访问拦截
router.beforeEach((to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
})

export default router
