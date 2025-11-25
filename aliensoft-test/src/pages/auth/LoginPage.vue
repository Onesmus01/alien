<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

      <!-- Heading -->
      <h1 class="text-3xl font-bold text-gray-900 text-center">Welcome Back</h1>
      <p class="text-gray-500 text-center mt-1">
        Sign in to manage your products
      </p>
 
      <!-- Error -->
      <p v-if="error" class="mt-4 bg-red-100 text-red-700 p-2 rounded text-sm text-center">
        {{ error }}
      </p>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="mt-6 space-y-4">

        <!-- Username -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Email or Username</label>
          <input
            v-model="username"
            type="text"
            class="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            placeholder="Enter your email or username"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-700 font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Remember & Forgot -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center space-x-2 cursor-pointer text-gray-700">
            <input type="checkbox" class="w-4 h-4" />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            class="text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <!-- Login Button -->
        <button
          :disabled="loading"
          class="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg text-lg font-medium transition disabled:opacity-50"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = null

  try {
    await auth.login({
      username: username.value,
      password: password.value,
    })

    router.push('/products')
  } catch (err) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
