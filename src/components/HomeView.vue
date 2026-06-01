<template>
  <div class="home-page">
    <!-- Banner Slider với video -->
    <section class="banner-slider">
      <div v-for="(slide, index) in slides" :key="index" class="slide" :class="{ active: currentSlide === index }">
        <video autoplay muted loop playsinline>
          <source :src="slide.video" type="video/mp4">
        </video>
        <div class="banner-overlay-art"></div>
        <div class="banner-text">
          <span class="banner-subtitle">BearArt Studio</span>
          <h1>{{ slide.text }}</h1>
          <p class="banner-quote">Nghệ thuật không có giới hạn</p>
        </div>
      </div>
      <div class="slider-dots">
        <span v-for="(slide, index) in slides" :key="index"
              :class="['dot', { active: currentSlide === index }]"
              @click="currentSlide = index"></span>
      </div>
    </section>

    <!-- Khóa học nổi bật - style mỹ thuật -->
    <div class="container">
      <div class="section-header">
        <span class="section-tag">✨ Khám phá</span>
        <h2 class="section-title">Khóa học <span class="highlight">nổi bật</span></h2>
        <div class="section-divider">
          <span class="divider-line"></span>
          <span class="divider-icon">🎨</span>
          <span class="divider-line"></span>
        </div>
      </div>
      <div class="grid-container">
        <!-- ✅ Sửa: thêm @click để cuộn lên đầu -->
        <div class="course-card" v-for="course in featuredCourses" :key="course.title" @click="goToCourses">
          <div class="card-icon">{{ course.icon }}</div>
          <h3>{{ course.title }}</h3>
          <p>{{ course.desc }}</p>
          <div class="card-hover-effect">
            <span>Khám phá ngay →</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Slogan Parallax - style nghệ thuật -->
    <section class="slogan-section">
      <div class="slogan-overlay"></div>
      <div class="slogan-content">
        <div class="slogan-icon">🖌️</div>
        <h2>"Khơi nguồn sáng tạo – Vững bước tương lai"</h2>
        <p>Cùng BearArt phát triển kỹ năng nghệ thuật và tư duy thiết kế</p>
        <button class="btn-contact" @click="handleContact">
          <span>Liên hệ ngay</span>
          <span class="btn-arrow">→</span>
        </button>
      </div>
    </section>

    <!-- Nút xem tất cả khóa học -->
    <div class="center">
      <!-- ✅ Sửa: thêm @click để cuộn lên đầu -->
      <div class="btn-all" @click="goToCourses">
        <span>Xem tất cả khóa học</span>
        <span class="btn-icon">🎨</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import data from '../assets/data/home.json'

  const router = useRouter()

  const slides = ref([
    { video: '/videos/paint-video.mp4', text: 'SÁNG TẠO KHÔNG GIỚI HẠN' },
    { video: '/videos/abstract-art.mp4', text: 'HỌC VIỆN MỸ THUẬT BEARART' }
  ])

  const currentSlide = ref(0)
  const featuredCourses = ref([])

  let intervalId = null

  // ✅ Dùng tiếng Anh
  const goToCourses = async () => {
    await router.push('/course')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ✅ Dùng tiếng Anh
  const handleContact = async () => {
    await router.push('/contact')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const startAutoSlide = () => {
    intervalId = setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % slides.value.length
    }, 5000)
  }

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  onMounted(() => {
    startAutoSlide()
    featuredCourses.value = data.featuredCourses
  })
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .home-page {
    font-family: 'Poppins', 'Segoe UI', 'Roboto', sans-serif;
    background: linear-gradient(180deg, #fef9f1 0%, #fff5eb 100%);
    overflow-x: hidden;
  }

  /* ========== BANNER SLIDER ========== */
  .banner-slider {
    position: relative;
    width: 100%;
    height: 600px;
    overflow: hidden;
    background: #1a1a2e;
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

    .slide.active {
      opacity: 1;
      z-index: 1;
    }

    .slide video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.7) saturate(1.2);
    }

  .banner-overlay-art {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 50%, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
    z-index: 1;
  }

  .banner-text {
    position: absolute;
    z-index: 2;
    text-align: center;
    color: white;
    animation: fadeInUp 1s ease;
  }

  .banner-subtitle {
    font-size: 14px;
    letter-spacing: 4px;
    font-weight: 300;
    background: rgba(255,204,0,0.2);
    padding: 6px 18px;
    border-radius: 30px;
    backdrop-filter: blur(5px);
  }

  .banner-text h1 {
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 800;
    margin: 20px 0;
    text-shadow: 0 4px 20px rgba(0,0,0,0.3);
    background: linear-gradient(135deg, #fff, #ffcc00);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .banner-quote {
    font-size: 16px;
    opacity: 0.9;
    font-style: italic;
  }

  .slider-dots {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 10;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: all 0.3s;
  }

    .dot.active {
      width: 30px;
      border-radius: 10px;
      background: #ffcc00;
    }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ========== SECTION HEADER ========== */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 20px 60px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 50px;
  }

  .section-tag {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #ffcc00;
    font-weight: 600;
  }

  .section-title {
    font-size: 38px;
    font-weight: 800;
    color: #2d2d3a;
    margin: 15px 0 20px;
  }

    .section-title .highlight {
      color: #ffcc00;
      position: relative;
    }

      .section-title .highlight::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 3px;
        background: #ffcc00;
        border-radius: 3px;
      }

  .section-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .divider-line {
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ffcc00, transparent);
  }

  .divider-icon {
    font-size: 20px;
    color: #ffcc00;
  }

  /* ========== GRID KHÓA HỌC ========== */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 35px;
  }

  .course-card {
    background: white;
    border-radius: 24px;
    padding: 35px 25px;
    text-align: center;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 204, 0, 0.1);
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

    .course-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #ffcc00, #ffb347);
      transition: left 0.4s ease;
      z-index: -1;
    }

    .course-card:hover::before {
      left: 0;
    }

    .course-card:hover {
      transform: translateY(-12px);
      box-shadow: 0 25px 40px rgba(255, 204, 0, 0.2);
      border-color: #ffcc00;
    }

      .course-card:hover .card-icon {
        transform: scale(1.1) rotate(5deg);
      }

      .course-card:hover h3,
      .course-card:hover p {
        color: white;
      }

  .card-icon {
    font-size: 56px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
    display: inline-block;
  }

  .course-card h3 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 12px;
    color: #2d2d3a;
    transition: color 0.3s;
  }

  .course-card p {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
    transition: color 0.3s;
  }

  .card-hover-effect {
    margin-top: 20px;
    font-size: 13px;
    font-weight: 600;
    color: #ffcc00;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s;
  }

  .course-card:hover .card-hover-effect {
    opacity: 1;
    transform: translateY(0);
    color: white;
  }

  /* ========== SLOGAN PARALLAX ========== */
  .slogan-section {
    position: relative;
    min-height: 450px;
    width: 100%;
    background: url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1500&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 60px 0;
  }

  .slogan-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.85), rgba(22, 33, 62, 0.9));
  }

  .slogan-content {
    position: relative;
    max-width: 800px;
    padding: 0 20px;
    z-index: 2;
    animation: fadeInUp 0.8s ease;
  }

  .slogan-icon {
    font-size: 48px;
    margin-bottom: 20px;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-10px);
    }
  }

  .slogan-content h2 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    margin-bottom: 20px;
    text-shadow: 0 2px 15px rgba(0,0,0,0.3);
    color: white;
  }

  .slogan-content p {
    font-size: 1.1rem;
    margin-bottom: 30px;
    opacity: 0.9;
    color: #f0f0f0;
  }

  .btn-contact {
    background: #ffcc00;
    color: #1a1a2e;
    border: none;
    padding: 14px 35px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    display: inline-flex;
    align-items: center;
    gap: 12px;
  }

    .btn-contact:hover {
      background: white;
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      gap: 15px;
    }

  .btn-arrow {
    transition: transform 0.3s;
  }

  .btn-contact:hover .btn-arrow {
    transform: translateX(5px);
  }

  /* ========== NÚT XEM TẤT CẢ ========== */
  .center {
    text-align: center;
    margin: 50px 0 80px;
  }

  .btn-all {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    color: white;
    padding: 16px 42px;
    border-radius: 50px;
    font-weight: 700;
    transition: all 0.3s;
    font-size: 16px;
    border: 1px solid rgba(255,204,0,0.3);
    cursor: pointer;
  }

    .btn-all:hover {
      background: linear-gradient(135deg, #ffcc00, #ffb347);
      color: #1a1a2e;
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(255, 204, 0, 0.3);
      gap: 15px;
    }

  .btn-icon {
    font-size: 18px;
    transition: transform 0.3s;
  }

  .btn-all:hover .btn-icon {
    transform: rotate(15deg);
  }

  /* ========== RESPONSIVE ========== */
  @media (max-width: 768px) {
    .banner-slider {
      height: 450px;
    }

    .container {
      padding: 50px 20px;
    }

    .section-title {
      font-size: 28px;
    }

    .grid-container {
      grid-template-columns: 1fr;
      gap: 25px;
    }

    .slogan-section {
      min-height: 350px;
      background-attachment: scroll;
    }

    .slogan-content h2 {
      font-size: 1.6rem;
    }

    .btn-all {
      padding: 12px 28px;
      font-size: 14px;
    }
  }
</style>
