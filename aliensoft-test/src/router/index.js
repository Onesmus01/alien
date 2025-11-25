import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/auth/LoginPage.vue'
import ProductsPage from '../pages/products/ProductsPage.vue'
import ProductView from '../pages/products/ProductView.vue'
import AddProduct from '../pages/products/AddProduct.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/', redirect: '/products' },
  { path: '/products', component: ProductsPage },
  { path: '/products/new', component: AddProduct },
  { path: '/products/:id', component: ProductView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 🔒 Route guard for auth
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  auth.restoreSession()

  if (to.path !== '/login' && !auth.isAuthenticated) {
    next('/login') // redirect to login if not logged in
  } else if (to.path === '/login' && auth.isAuthenticated) {
    next('/products') // redirect to products if already logged in
  } else {
    next() // allow access
  }
})

export default router
