import { defineStore } from 'pinia'
import { fetchProductsAPI, fetchProductByIdAPI, addProductAPI } from '../services/productService'
import { useAuthStore } from './auth'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true
      this.error = null
      const auth = useAuthStore()
      try {
        this.products = await fetchProductsAPI(auth.token)
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    async fetchProductById(id) {
      const auth = useAuthStore()
      try {
        return await fetchProductByIdAPI(id, auth.token)
      } catch (err) {
        this.error = err.message
      }
    },
    async addProduct(product) {
      const auth = useAuthStore()
      try {
        const newProduct = await addProductAPI(product, auth.token)
        this.products.push(newProduct)
        return newProduct
      } catch (err) {
        this.error = err.message
        throw err
      }
    },
  },
})
