<template>
  <div
    class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
    @click="$emit('view', product.id)"
  >
    <!-- Product Image -->
    <div class="relative w-full h-48 overflow-hidden">
      <img
        :src="product.thumbnail"
        alt="product.title"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
      <span
        v-if="product.stock === 0"
        class="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full"
      >
        Out of Stock
      </span>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <h3 class="font-bold text-lg text-gray-800 truncate">{{ product.title }}</h3>
      <p class="text-gray-500 text-sm mt-1 line-clamp-3">{{ product.description }}</p>

      <div class="mt-4 flex justify-between items-center">
        <span class="bg-primary text-white px-3 py-1 rounded-full font-semibold text-sm">
          ${{ product.price }}
        </span>
        <span
          class="text-gray-600 text-sm"
          :class="{'text-red-500': product.stock === 0}"
        >
          {{ product.stock }} in stock
        </span>
      </div>

      <p class="mt-1 text-gray-400 text-xs uppercase">{{ product.category }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: Object,
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
