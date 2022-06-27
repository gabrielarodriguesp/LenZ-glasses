import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
  },  
  {
    path: '/glasses',
    name: 'glasses',
    component: () => import('../views/glasses.vue')
  },
  {
    path: '/sunglasses',
    name: 'sunglasses',
    component: () => import('../views/sunglasses.vue')
  },
  {
    path: '/lens',
    name: 'lens',
    component: () => import('../views/lens.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/product.vue'),
    props: true
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('../views/payment.vue')
  },

  {
    path: '/client',
    name: 'client',
    component: () => import('../views/client.vue')
  },  
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue')
  },
  /*
  {
    path: '/client_info',
    name: 'client_info',
    component: () => import('../views/client/info.vue')
  },
  {
    path: '/client_historic',
    name: 'client_historic',
    component: () => import('../views/client/historic.vue')
  },
  {
    path: '/client_agend',
    name: 'client_agend',
    component: () => import('../views/client/client_agend.vue')
  },

  {
    path: '/admin_info',
    name: 'admin_info',
    component: () => import('../views/admin/info.vue')
  },
  {
    path: '/admin_edit',
    name: 'admin_edit',
    component: () => import('../views/admin/edit.vue')
  },
  {
    path: '/admin_addProduct',
    name: 'admin_addProduct',
    component: () => import('../views/admin/addProduct.vue')
  }
  */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
