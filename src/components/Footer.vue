<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Cột 1: Giới thiệu -->
        <div class="footer-col">
          <div class="footer-logo">
            <h2 class="logo-text">Bear<span class="logo-highlight">Art</span></h2>
            <p class="footer-desc">Nơi ươm mầm tài năng nghệ thuật, khơi dậy đam mê sáng tạo và phát triển kỹ năng tương lai.</p>
          </div>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>33 Vĩnh Viễn, Vườn Lài, TP. HCM</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone-alt"></i>
              <span>Hotline: 028 3833 0731</span>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <span>Email: cdkttphcm@kthcm.edu.vn</span>
            </div>
          </div>
        </div>

        <!-- Cột 2: Liên kết nhanh -->
        <div class="footer-col">
          <h3 class="footer-title">Liên kết nhanh</h3>
          <ul class="footer-links">
            <li><router-link to="/">Trang chủ</router-link></li>
            <li><router-link to="/khoa-hoc">Khóa học</router-link></li>
            <li><router-link to="/workshop">Workshop</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/lien-he">Liên hệ</router-link></li>
          </ul>
        </div>

        <!-- Cột 3: Kết nối xã hội -->
        <div class="footer-col">
          <h3 class="footer-title">Kết nối với chúng tôi</h3>
          <div class="social-links">
            <a href="#" class="social-icon facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-icon youtube">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="#" class="social-icon tiktok">
              <i class="fab fa-tiktok"></i>
            </a>
            <a href="#" class="social-icon zalo">
              <span>Zalo</span>
            </a>
          </div>
          <div class="newsletter">
            <h4>Đăng ký nhận tin</h4>
            <div class="newsletter-form">
              <input type="email" placeholder="Email của bạn">
              <button>Gửi</button>
            </div>
          </div>
        </div>

        <!-- Cột 4: Bản đồ -->
        <div class="footer-col">
          <h3 class="footer-title">Địa chỉ</h3>
          <div class="map-wrapper">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.425269638779!2d106.690235!3d10.776789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3c1f6a1e5d%3A0x5e5f5e5f5e5f5e5f!2zUXXhuq1uIDMsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                    width="100%"
                    height="180"
                    style="border:0; border-radius: 12px;"
                    allowfullscreen=""
                    loading="lazy">
            </iframe>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="bottom-left">
          <p>Mã số thuế: 0123456789</p>
          <p>© 2026 <strong>BearArt Project</strong>. All rights reserved.</p>
        </div>
        <div class="bottom-right">
          <router-link to="/">Trang chủ</router-link>
          <router-link to="/lien-he">Liên hệ</router-link>
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Điều khoản sử dụng</a>
        </div>
      </div>
    </div>
  </footer>
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

  .footer {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #fff;
    padding: 60px 0 20px;
    margin-top: 60px;
    width: 100%;
    position: relative;
    left: 0;
    right: 0;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
  }

  /* Logo */
  .footer-logo {
    margin-bottom: 20px;
  }

  .logo-img {
    width: 45px;
    height: 45px;
    object-fit: contain;
  }

  .logo-text {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 15px;
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

  .footer-desc {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    font-size: 14px;
  }

  /* Contact items */
  .contact-info {
    margin-top: 20px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
  }

    .contact-item i {
      width: 20px;
      color: #ffcc00;
    }

  /* Footer title */
  .footer-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
  }

    .footer-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: #ffcc00;
      border-radius: 2px;
    }

  /* Footer links */
  .footer-links {
    list-style: none;
  }

    .footer-links li {
      margin-bottom: 12px;
    }

    .footer-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s ease;
      font-size: 14px;
    }

      .footer-links a:hover {
        color: #ffcc00;
        padding-left: 5px;
      }

  /* Social links */
  .social-links {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    flex-wrap: wrap;
  }

  .social-icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
  }

    .social-icon:hover {
      transform: translateY(-3px);
    }

    .social-icon.facebook:hover {
      background: #1877f2;
    }

    .social-icon.instagram:hover {
      background: linear-gradient(45deg, #f09433, #d62976);
    }

    .social-icon.youtube:hover {
      background: #ff0000;
    }

    .social-icon.tiktok:hover {
      background: #000000;
    }

    .social-icon.zalo {
      background: #0068ff;
      width: auto;
      padding: 0 12px;
      border-radius: 20px;
    }

      .social-icon.zalo span {
        font-size: 14px;
      }

  /* Newsletter */
  .newsletter h4 {
    font-size: 14px;
    margin-bottom: 10px;
    color: rgba(255, 255, 255, 0.9);
  }

  .newsletter-form {
    display: flex;
    gap: 8px;
  }

    .newsletter-form input {
      flex: 1;
      padding: 10px 12px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      outline: none;
    }

      .newsletter-form input::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

    .newsletter-form button {
      padding: 10px 18px;
      background: #ffcc00;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      color: #1a1a2e;
      cursor: pointer;
      transition: all 0.3s ease;
    }

      .newsletter-form button:hover {
        background: #ffdd33;
        transform: translateY(-2px);
      }

  /* Map */
  .map-wrapper {
    border-radius: 12px;
    overflow: hidden;
  }

  /* Footer bottom */
  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
  }

  .bottom-left p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    margin-bottom: 5px;
  }

  .bottom-right {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

    .bottom-right a {
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 13px;
      transition: color 0.3s ease;
    }

      .bottom-right a:hover {
        color: #ffcc00;
      }

  /* Responsive */
  @media (max-width: 768px) {
    .footer {
      padding: 40px 0 20px;
    }

    .footer-grid {
      gap: 30px;
    }

    .footer-bottom {
      flex-direction: column;
      text-align: center;
    }

    .bottom-right {
      justify-content: center;
    }

    .footer-title::after {
      left: 50%;
      transform: translateX(-50%);
    }

    .footer-col {
      text-align: center;
    }

    .contact-item {
      justify-content: center;
    }

    .social-links {
      justify-content: center;
    }
  }



</style>

