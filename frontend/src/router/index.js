import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'
import AccountPage from '@/pages/AccountPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
