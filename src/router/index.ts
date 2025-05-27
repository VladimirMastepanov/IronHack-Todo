import { createRouter, createWebHistory } from 'vue-router'
import { useUser } from '../store/user'
import { supabase } from '../store/supabase'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'AuthComponent',
    component: () => import('../pages/AuthComponent.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/LoginForm.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../pages/SignUpForm.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue'),
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: () => import('../pages/ForgotPasswordForm.vue'),
  },
  {
    path: '/newpassword',
    name: 'NewPassword',
    component: () => import('../pages/NewPasswordForm.vue'),
  },
  {
    path: '/taskform',
    name: 'TaskForm',
    component: () => import('../pages/TaskForm.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const store = useUser()

  await store.getUser()

  if (to.meta.requiresAuth && !store.isAuth) {
    return { name: 'AuthComponent' }
  }

  if (
    store.isAuth &&
    to.name &&
    [
      'AuthComponent',
      'Login',
      'Signup',
      'ForgotPassword',
      // 'NewPassword',
    ].includes(to.name as string)
  ) {
    return { name: 'Dashboard' }
  }

  return true
})

router.isReady().then(() => {
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY') {
      router.push({ name: 'NewPassword' })
    }
  })
})

export default router
