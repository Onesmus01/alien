<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-800">

    <!-- SIDEBAR -->
    <aside class="w-64 bg-white border-r flex flex-col justify-between">
      <div>
        <!-- Logo -->
        <div class="p-6 flex items-center gap-3">
          <div class="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center text-white font-bold">E</div>
          <div>
            <h1 class="font-bold text-lg">E-Commerce</h1>
            <p class="text-sm text-gray-500">Admin Panel</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="mt-6">
          <RouterLink to="/dashboard" class="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
            Dashboard
          </RouterLink>

          <RouterLink to="/products" class="flex items-center gap-3 px-6 py-3 bg-blue-50 text-blue-700 font-medium rounded-r-full">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v2H3V3zm2 6h14v12H5V9z"/></svg>
            Products
          </RouterLink>

          <RouterLink to="/orders" class="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14l.74-2h8.2l.84 2H7.16zM3 3h2l3.6 7.59L8.24 13H19v-2H9.42l.6-1.5L7 4H3V3z"/></svg>
            Orders
          </RouterLink>

          <RouterLink to="/customers" class="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/></svg>
            Customers
          </RouterLink>
        </nav>
      </div>

      <!-- Logout -->
      <div class="p-6">
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 p-10">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold">Products</h1>
          <p class="text-gray-500 mt-1">Manage your inventory and view product performance.</p>
        </div>

        <RouterLink to="/products/new" class="inline-flex items-center gap-3 bg-blue-900 hover:bg-blue-950 text-white px-5 py-3 rounded-lg shadow">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z"/></svg>
          Add New Product
        </RouterLink>
      </div>

      <!-- Search & Filters -->
      <div class="mt-8 flex items-center gap-4">
        <div class="flex items-center bg-white border rounded-lg px-4 py-3 w-1/2 shadow-sm">
          <svg class="w-5 h-5 text-gray-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <input v-model="searchQuery" placeholder="Search by product name..." class="w-full focus:outline-none text-sm" />
        </div>

        <div class="ml-auto flex gap-3">
          <select v-model="filterCategory" class="bg-white border px-4 py-2 rounded-lg text-sm shadow-sm">
            <option value="">All Categories</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>

          <select v-model="filterStock" class="bg-white border px-4 py-2 rounded-lg text-sm shadow-sm">
            <option value="">All Stock</option>
            <option value="in">In Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      <!-- Product Table -->
      <div class="mt-6 bg-white rounded-lg shadow-sm border overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 text-left text-sm text-gray-600">
            <tr>
              <th class="p-4">Product</th>
              <th class="p-4">Category</th>
              <th class="p-4">Price</th>
              <th class="p-4">Stock</th>
              <th class="p-4"></th>
            </tr>
          </thead>
          <tbody>
            <ProductTableRow
              v-for="p in visibleProducts"
              :key="p.id"
              :product="p"
              @view="goToProduct"
            />
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-6 flex justify-between items-center text-sm text-gray-500">
        <p>Showing {{ startIndex }} to {{ endIndex }} of {{ filtered.length }} results</p>
        <div class="flex gap-2">
          <button @click="prevPage" :disabled="page===1" class="bg-white border px-3 py-2 rounded-lg disabled:opacity-50">‹</button>
          <button @click="nextPage" :disabled="endIndex>=filtered.length" class="bg-white border px-3 py-2 rounded-lg disabled:opacity-50">›</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../../stores/products'
import { useAuthStore } from '../../stores/auth'
import ProductTableRow from '../../components/product/ProductTableRow.vue'

const router = useRouter()
const store = useProductStore()
const auth = useAuthStore()

const searchQuery = ref('')
const filterCategory = ref('')
const filterStock = ref('')

const page = ref(1)
const perPage = 6

onMounted(() => store.fetchProducts())

const products = computed(() => store.products || [])

const categories = computed(() => [...new Set(products.value.map(p => p.category))])

const filtered = computed(() => products.value.filter(p => {
  const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  const matchesCategory = filterCategory.value ? p.category === filterCategory.value : true
  const matchesStock = filterStock.value
    ? (filterStock.value === 'in' && p.stock > 50) ||
      (filterStock.value === 'low' && p.stock > 0 && p.stock <= 50) ||
      (filterStock.value === 'out' && p.stock === 0)
    : true
  return matchesSearch && matchesCategory && matchesStock
}))

const visibleProducts = computed(() => {
  const start = (page.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

const startIndex = computed(() => filtered.value.length ? (page.value - 1) * perPage + 1 : 0)
const endIndex = computed(() => Math.min(page.value * perPage, filtered.value.length))

const prevPage = () => { if (page.value > 1) page.value-- }
const nextPage = () => { if (endIndex.value < filtered.value.length) page.value++ }

const goToProduct = (id) => router.push(`/products/${id}`)

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>
