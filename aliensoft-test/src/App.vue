<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import ProductsPage from './pages/products/ProductsPage.vue';
import AddProduct from './pages/products/AddProduct.vue';
import ProductView from './pages/products/ProductView.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- GLOBAL NAVBAR -->
    <Navbar />

    <!-- PAGE CONTENT -->
    <main class="flex-1">
      <RouterView />
    </main>

    <!-- GLOBAL FOOTER -->
    <Footer />
  </div>
</template>

<style scoped>
/* Optional */
</style>
