<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo" class="logo-img" />
        <h2 class="logo-text">Bear<span class="logo-highlight">Art</span></h2>
      </div>

      <nav class="nav">
        <router-link to="/" class="nav-link" active-class="active">TRANG CHỦ</router-link>
        <router-link to="/course" class="nav-link" active-class="active">KHÓA HỌC</router-link>
        <router-link to="/workshop" class="nav-link" active-class="active">WORKSHOP</router-link>
        <router-link to="/blog" class="nav-link" active-class="active">BLOG</router-link>
        <router-link to="/contact" class="nav-link" active-class="active">LIÊN HỆ</router-link>
      </nav>

      <div class="auth-buttons">
        <!-- ✅ Chỉ một nút Quản Lý duy nhất -->
        <router-link to="/admin" class="btn-admin">📊 Quản Lý</router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { RouterLink } from 'vue-router'
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    height: 70px;
    position: sticky;
    top: 0;
    z-index: 9999;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    display: flex;
    align-items: center;
  }

  .header-content {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo-img {
    width: 45px;
    height: 45px;
    object-fit: contain;
  }

  .logo-highlight {
    color: #ffcc00;
    position: relative;
  }

    .logo-highlight::after {
      content: '';
      position: absolute;
      bottom: -3px;
      left: 0;
      right: 0;
      height: 2px;
      background: #ffcc00;
    }

  .logo-text {
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    line-height: 1;
  }

  .nav {
    display: flex;
    gap: 15px;
  }

  .nav-link {
    color: #fff;
    text-decoration: none;
    padding: 6px 12px;
    font-weight: 500;
    font-size: 14px;
    transition: 0.3s;
    border-radius: 5px;
    white-space: nowrap;
  }

    .nav-link:hover {
      background-color: #ffcc00;
      color: #1a1a2e;
    }

    .nav-link.active {
      background-color: #e74c3c;
      color: white;
    }

  .auth-buttons {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .btn-admin {
    background: transparent;
    border: 2px solid #ffcc00;
    color: #ffcc00;
    padding: 6px 18px;
    border-radius: 25px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    text-decoration: none;
    display: inline-block;
  }

    .btn-admin:hover {
      background: #ffcc00;
      color: #1a1a2e;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 204, 0, 0.3);
    }

  @media (max-width: 768px) {
    .nav {
      display: none;
    }

    .btn-admin {
      padding: 5px 12px;
      font-size: 11px;
    }
  }
</style>
