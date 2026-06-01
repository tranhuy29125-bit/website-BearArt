<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import { RouterView } from 'vue-router'
</script>

<style>
  /* Reset toàn cục - KHÔNG giới hạn #app */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%; /* Đảm bảo full width */
    max-width: 100%; /* Ghi đè max-width nếu có */
    margin: 0; /* Xóa margin */
    padding: 0; /* Xóa padding */
  }

  .main-content {
    flex: 1;
    width: 100%;
  }

  /* Nếu bạn muốn nội dung bên trong có giới hạn và căn giữa, hãy tạo class container riêng */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }
</style>
