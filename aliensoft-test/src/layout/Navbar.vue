<template>
  <nav class="bg-primary text-white shadow-md">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- Logo -->
      <h1 @click="goHome"
        class="text-2xl font-bold cursor-pointer hover:text-gray-200 transition">
        AlienSoft
      </h1>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex space-x-8 text-lg">
        <li><RouterLink to="/" class="nav-item">Home</RouterLink></li>
        <li><RouterLink to="/products" class="nav-item">Products</RouterLink></li>
        <li><RouterLink to="/products/new" class="nav-item">Add Product</RouterLink></li>
      </ul>

      <!-- Mobile Menu Icon -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile Dropdown -->
    <div v-if="isOpen" class="md:hidden bg-primary px-6 pb-4">
      <RouterLink to="/" class="mobile-item">Home</RouterLink>
      <RouterLink to="/products" class="mobile-item">Products</RouterLink>
      <RouterLink to="/products/new" class="mobile-item">Add Product</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const goHome = () => router.push('/')
</script>

<style scoped>
.nav-item {
  @apply hover:text-gray-300 transition duration-200;
}

.mobile-item {
  @apply block py-2 text-lg text-white border-b border-white/20 hover:text-gray-200 transition;
}
</style>
