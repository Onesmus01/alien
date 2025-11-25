<template>
  <div class="min-h-screen bg-gray-100 p-8 flex justify-center">
    <div v-if="product && product.id" class="max-w-6xl w-full bg-white rounded-xl shadow-lg p-8">

      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">{{ product.title }}</h1>
          <p class="text-gray-500 mt-1">Brand: <span class="font-medium">{{ product.brand }}</span></p>
        </div>

        <div class="mt-4 md:mt-0 flex items-center gap-4">
          <span class="bg-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full capitalize">
            {{ product.category }}
          </span>
          <div class="flex items-center gap-1 text-yellow-500 font-semibold">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path
                d="M12 .587l3.668 7.568L24 9.75l-6 5.847 1.416 8.26L12 19.77 4.584 23.857 6 15.597 0 9.75l8.332-1.595z"
              />
            </svg>
            {{ product.rating ?? 'N/A' }}
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="flex flex-col md:flex-row gap-8">

        <!-- Images -->
        <div class="md:w-1/3 flex flex-col gap-4">
          <img
            :src="product.thumbnail"
            alt="Main Thumbnail"
            class="w-full h-72 object-cover rounded-lg shadow-sm border"
          />
          <div class="flex gap-2">
            <img
              v-for="(img, index) in product.images"
              :key="index"
              :src="img"
              alt="Product Image"
              class="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:ring-2 hover:ring-indigo-500"
              @click="selectedImage = img"
            />
          </div>
        </div>

        <!-- Details -->
        <div class="md:flex-1 flex flex-col justify-between">

          <!-- Description -->
          <p class="text-gray-700 mb-6">{{ product.description }}</p>

          <!-- Price & Discount -->
          <div class="flex items-center gap-4 mb-4">
            <span class="text-3xl font-bold text-gray-900">
              ${{ product.price?.toFixed(2) ?? '0.00' }}
            </span>
            <span v-if="product.discountPercentage" class="text-sm text-red-500 line-through">
              ${{ ((product.price || 0) * (1 + product.discountPercentage / 100)).toFixed(2) }}
            </span>
            <span v-if="product.discountPercentage" class="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">
              -{{ product.discountPercentage.toFixed(0) }}%
            </span>
          </div>

          <!-- Stock -->
          <p class="text-gray-600 mb-6">
            Stock:
            <span :class="product.stock === 0 ? 'text-red-500' : 'text-green-600'">
              {{ product.stock === 0 ? 'Out of Stock' : product.stock + ' available' }}
            </span>
          </p>

          <div class="flex gap-4 mt-auto">
            <button
              @click="$router.back()"
              class="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition font-medium"
            >
              Back
            </button>
            <button
              :disabled="product.stock === 0"
              class="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium disabled:opacity-50"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-else class="text-gray-500 text-center text-lg">
      Loading product...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../../stores/products'

const route = useRoute()
const store = useProductStore()
const product = ref(null)
const selectedImage = ref(null)

onMounted(async () => {
  const id = route.params.id
  let found = store.products.find(p => p.id == id)
  if (found) {
    product.value = found
    selectedImage.value = found.thumbnail
  } else {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`)
      const data = await res.json()
      product.value = data
      selectedImage.value = data.thumbnail
    } catch (err) {
      console.error('Failed to fetch product:', err)
    }
  }
})
</script>

<style scoped>
img:hover {
  transition: all 0.2s;
  transform: scale(1.05);
}
</style>
