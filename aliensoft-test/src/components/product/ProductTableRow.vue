<template>
  <tr class="border-t hover:bg-gray-50">
    <!-- Product Info (Row Clickable) -->
    <td class="p-4 flex items-center gap-3 cursor-pointer" @click="viewProduct">
      <img
        :src="product.thumbnail"
        alt="Product thumbnail"
        class="w-12 h-12 rounded-full object-cover border"
      />
      <div>
        <div class="font-medium text-gray-800">{{ product.title }}</div>
        <div class="text-sm text-gray-500 truncate w-[36rem]">{{ product.description }}</div>
      </div>
    </td>

    <!-- Category Badge -->
    <td class="p-4">
      <span :class="badgeClass(product.category)" class="px-3 py-1 rounded-full text-sm">
        {{ product.category }}
      </span>
    </td>

    <!-- Price -->
    <td class="p-4">${{ product.price }}</td>

    <!-- Stock -->
    <td class="p-4 flex items-center gap-3">
      <span :class="stockDotClass(product.stock)" class="w-2 h-2 rounded-full"></span>
      <span class="text-sm">
        {{ product.stock === 0 ? 'Out of Stock' : product.stock + ' In Stock' }}
      </span>
    </td>

    <!-- Actions -->
    <td class="p-4 flex items-center gap-2">
      <!-- Menu Button (Edit/Delete) -->
      <button @click.stop="openMenu" class="p-2 rounded hover:bg-gray-100">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 8a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4zm0 6a2 2 0 100-4 2 2 0 000 4z"
          />
        </svg>
      </button>

      <!-- View Button -->
      <button
        @click.stop="$emit('view', product.id)"
        class="px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
      >
        View
      </button>
    </td>
  </tr>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  product: { type: Object, required: true }
})
const emit = defineEmits(['view'])

const badgeClass = (category) => {
  const map = {
    electronics: 'bg-blue-50 text-blue-700',
    laptops: 'bg-purple-50 text-purple-700',
    groceries: 'bg-pink-50 text-pink-700',
    headphones: 'bg-indigo-50 text-indigo-700',
    default: 'bg-gray-50 text-gray-700'
  }
  return map[category] || map.default
}

const stockDotClass = (stock) => {
  if (stock === 0) return 'bg-red-500'
  if (stock <= 50) return 'bg-yellow-500'
  return 'bg-green-500'
}

// Optional menu actions (edit/delete)
const openMenu = () => {
  console.log('Open menu for product', props.product.id)
}

// Emit view when row is clicked
const viewProduct = () => emit('view', props.product.id)
</script>

<style scoped>
/* truncate description width on smaller screens */
@media (max-width: 1280px) {
  .truncate {
    max-width: 28rem;
  }
}
</style>
