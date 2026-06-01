<template>
  <section class="contact-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Liên hệ với chúng tôi</h2>
        <p class="section-subtitle">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
      </div>

      <div class="contact-wrapper">
        <!-- Thông tin bên trái - ĐÃ VIẾT LẠI -->
        <div class="contact-info">
          <div class="info-card">
            <h3 class="info-title">✨ Bear Art Studio ✨</h3>
            <div class="info-message">
              <p>
                Chào bạn,<br><br>
                <strong>Bear Art</strong> không chỉ là nơi dạy vẽ, mà còn là ngôi nhà chung của những tâm hồn yêu nghệ thuật.
                Ở đây, chúng tôi khơi dậy cảm hứng sáng tạo, nuôi dưỡng đam mê và đồng hành cùng bạn trên mọi bước đường hội họa.
              </p>
              <p>
                Bạn muốn tìm hiểu về khóa học? Cần tư vấn lộ trình? Hay chỉ đơn giản là muốn trò chuyện về nghệ thuật?
                Đừng ngần ngại, hãy để lại lời nhắn, đội ngũ Bear Art sẽ phản hồi trong vòng 24 giờ.
              </p>
              <!--<p>
                <strong>📞 Hotline:</strong> 090 123 4567<br>
                <strong>✉️ Email:</strong> info@bearart.vn<br>
                <strong>📍 Địa chỉ:</strong> Số 51/34 Cao Thắng, Phường 3, Quận 3, TP. HCM
              </p>-->
              <p style="margin-top: 15px;">
                💛 <em>“Nghệ thuật không có giới hạn – Hãy cùng Bear Art viết tiếp câu chuyện màu sắc của riêng bạn.”</em>
              </p>
            </div>
            <div class="social-links">
              <a href="#" class="social-link fb"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-link ig"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-link yt"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <!-- Form bên phải (giữ nguyên) -->
        <div class="contact-form">
          <form @submit.prevent="handleSubmit" class="form">
            <div class="form-group">
              <input type="text" v-model="formData.name" placeholder="Họ và tên *" required />
            </div>
            <div class="form-group">
              <input type="email" v-model="formData.email" placeholder="Email *" required />
            </div>
            <div class="form-group">
              <textarea v-model="formData.message" rows="5" placeholder="Nội dung cần tư vấn..."></textarea>
            </div>
            <button type="submit" class="submit-btn">
              Gửi tin nhắn <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref } from 'vue'

  const formData = ref({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = () => {
    if (!formData.value.name || !formData.value.email) {
      alert('Vui lòng nhập họ tên và email!')
      return
    }
    alert(`Cảm ơn ${formData.value.name}! Bear Art sẽ sớm liên hệ với bạn.`)
    formData.value = { name: '', email: '', message: '' }
  }
</script>

<style scoped>
  /* Giữ nguyên phần CSS như đã viết trước đó */
  .contact-section {
    padding: 80px 0;
    background: linear-gradient(135deg, #ffffff 0%, #c3cfe2 100%);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 50px;
  }

  .section-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 10px;
    position: relative;
    display: inline-block;
  }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: #ffcc00;
      border-radius: 2px;
    }

  .section-subtitle {
    font-size: 16px;
    color: #666;
    margin-top: 20px;
  }

  .contact-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }

  .contact-info {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    padding: 40px;
    color: white;
  }

  .info-title {
    font-size: 28px;
    font-weight: 800;
    margin-bottom: 20px;
  }

  .info-message p {
    color: rgba(255,255,255,0.85);
    line-height: 1.6;
    margin-bottom: 15px;
    font-size: 15px;
  }

  .social-links {
    display: flex;
    gap: 15px;
    margin-top: 25px;
  }

  .social-link {
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    transition: all 0.3s;
  }

    .social-link:hover {
      background: #ffcc00;
      color: #1a1a2e;
      transform: translateY(-3px);
    }

  .contact-form {
    padding: 40px;
    background: white;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 15px;
    transition: all 0.3s;
    font-family: inherit;
  }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #ffcc00;
      box-shadow: 0 0 0 3px rgba(255,204,0,0.2);
    }

  .submit-btn {
    background: #1a1a2e;
    color: white;
    border: none;
    padding: 14px 24px;
    border-radius: 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

    .submit-btn:hover {
      background: #ffcc00;
      color: #1a1a2e;
    }

    .submit-btn span {
      transition: transform 0.3s;
    }

    .submit-btn:hover span {
      transform: translateX(5px);
    }

  @media (max-width: 768px) {
    .contact-section {
      padding: 50px 0;
    }

    .contact-wrapper {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .contact-info, .contact-form {
      padding: 30px 20px;
    }

    .section-title {
      font-size: 28px;
    }
  }

</style>

