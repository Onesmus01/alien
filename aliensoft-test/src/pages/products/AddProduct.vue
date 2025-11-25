<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    <!-- Heading -->
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
      <h1 class="text-3xl font-bold mb-2 text-gray-900">Add New Product</h1>
      <p class="text-gray-600 mb-6">Enter the details below to add a new item to your inventory</p>

      <!-- Form -->
      <form @submit.prevent="submitProduct" class="space-y-6">

        <!-- Product Title -->
        <div>
          <label class="block text-gray-700 font-semibold mb-1">Product Title</label>
          <input
            v-model="product.title"
            type="text"
            placeholder="Enter product title"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none text-gray-900 placeholder-gray-400"
            required
          />
        </div>

        <!-- Product Description -->
        <div>
          <label class="block text-gray-700 font-semibold mb-1">Product Description</label>
          <textarea
            v-model="product.description"
            placeholder="Enter product description"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none text-gray-900 placeholder-gray-400"
            rows="4"
            required
          ></textarea>
        </div>

        <!-- Pricing & Inventory -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Price ($)</label>
            <input
              v-model.number="product.price"
              type="number"
              placeholder="0.00"
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none text-gray-900 placeholder-gray-400"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-1">Stock Quantity</label>
            <input
              v-model.number="product.stock"
              type="number"
              placeholder="0"
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none text-gray-900 placeholder-gray-400"
              required
            />
          </div>
        </div>

        <!-- Category -->
        <div>
          <label class="block text-gray-700 font-semibold mb-1">Category</label>
          <select
            v-model="product.category"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-indigo-200 focus:outline-none text-gray-900"
            required
          >
            <option value="" disabled>Select category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <!-- Media Upload -->
        <div>
          <label class="block text-gray-700 font-semibold mb-1">Media</label>
          <div
            @drop.prevent="handleDrop"
            @dragover.prevent
            class="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-32 cursor-pointer hover:border-indigo-400 transition-colors"
            @click="$refs.fileInput.click()"
          >
            <p class="text-gray-500">Click to upload or drag and drop</p>
            <input
              ref="fileInput"
              type="file"
              multiple
              class="hidden"
              @change="handleFiles"
            />
          </div>
          <div class="flex flex-wrap mt-2 gap-2">
            <div
              v-for="(file, index) in product.media"
              :key="index"
              class="bg-gray-200 px-3 py-1 rounded-md text-sm"
            >
              {{ file.name }}
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-4 mt-6">
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-900 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        title: '',
        description: '',
        price: null,
        stock: null,
        category: '',
        media: []
      },
      categories: ['Electronics', 'Clothing', 'Books', 'Furniture']
    }
  },
  methods: {
    handleFiles(event) {
      const files = event.target.files;
      this.product.media = Array.from(files);
    },
    handleDrop(event) {
      const files = event.dataTransfer.files;
      this.product.media = Array.from(files);
    },
    resetForm() {
      this.product = {
        title: '',
        description: '',
        price: null,
        stock: null,
        category: '',
        media: []
      };
    },
    submitProduct() {
      console.log('Product submitted:', this.product);
      alert('Product saved successfully!');
      this.resetForm();
    }
  }
}
</script>
