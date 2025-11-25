<template>
  <nav class="bg-primary text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo / Brand -->
        <div class="flex-shrink-0 cursor-pointer" @click="$router.push('/products')">
          <h1 class="font-bold text-2xl">AlienSoft</h1>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex md:items-center md:space-x-6">
          <router-link
            to="/products"
            class="hover:text-gray-300 font-medium"
            active-class="underline"
          >
            Products
          </router-link>
          <router-link
            to="/products/new"
            class="hover:text-gray-300 font-medium"
            active-class="underline"
          >
            Add Product
          </router-link>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-4">
          <!-- Search (desktop) -->
          <input
            type="text"
            placeholder="Search..."
            v-model="search"
            class="hidden md:block p-2 rounded text-gray-800 focus:outline-none"
          />

          <!-- Logout -->
          <button
            v-if="auth.isAuthenticated"
            @click="logoutUser"
            class="bg-white text-primary px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>

          <!-- Mobile menu button -->
          <button
            @click="isOpen = !isOpen"
            class="md:hidden inline-flex items-center justify-center p-2 rounded hover:bg-blue-700 transition"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!isOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-primary px-4 pt-2 pb-4 space-y-2">
      <router-link to="/products" class="block text-white font-medium">Products</router-link>
      <router-link to="/products/new" class="block text-white font-medium">Add Product</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth.js'

const isOpen = ref(false)
const search = ref('')
const auth = useAuthStore()

const logoutUser = () => {
  auth.logout()
}
</script>

<style>
/* Optional: Smooth underline animation for active links */
.router-link-active {
  text-decoration: underline;
}
</style>
