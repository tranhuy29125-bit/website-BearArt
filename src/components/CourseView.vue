<template>
  <div class="courses-page">
    <div class="container">
      <!-- PHẦN TIÊU ĐỀ -->
      <div class="page-header">
        <h1>🎨 KHÓA HỌC BEARART</h1>
        <p>Luyện thi Đại học khối V & H - Đam mê · Định hướng · Chinh phục</p>
      </div>

      <!-- THANH TÌM KIẾM VÀ BỘ LỌC -->
      <div class="tools">
        <input type="text"
               v-model="searchKeyword"
               @input="filterCourses"
               placeholder="🔍 Tìm khóa học..."
               class="search-input" />
        <div class="filter-buttons">
          <button v-for="level in allLevels"
                  :key="level"
                  :class="['filter-btn', { active: currentLevel === level }]"
                  @click="setFilter(level)">
            {{ level }}
          </button>
        </div>
      </div>

      <!-- DANH SÁCH KHÓA HỌC DẠNG GRID -->
      <div class="courses-grid">
        <div v-if="filteredCourses.length === 0" class="no-result">
          😢 Không tìm thấy khóa học nào
        </div>
        <div v-for="course in filteredCourses"
             :key="course.name"
             class="course-card">
          <div class="card-img">
            <img :src="course.image" :alt="course.name" loading="lazy" />
            <span v-if="course.hot" class="badge hot">🔥 Hot</span>
            <span v-if="course.new" class="badge new">✨ Mới</span>
          </div>
          <div class="card-info">
            <h3>{{ course.name }}</h3>
            <span class="level">{{ course.level }}</span>
            <p class="desc">{{ course.desc }}</p>
            <div class="details">
              <span><i class="far fa-clock"></i> {{ course.duration }}</span>
              <span><i class="fas fa-users"></i> {{ course.students }}</span>
            </div>
            <div class="price">{{ formatMoney(course.price) }}</div>
            <button class="btn-register" @click="openPaymentModal(course)">
              💳 Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal xác nhận thanh toán -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>💳 Xác nhận đăng ký khóa học</h3>
          <button class="close-modal" @click="closeModal">✕</button>
        </div>
        <div class="modal-body">
          <div class="course-info">
            <h4>{{ selectedCourse?.name }}</h4>
            <p class="course-desc">{{ selectedCourse?.desc }}</p>
            <div class="price-detail">
              <span class="label">Giá khóa học:</span>
              <span class="price">{{ formatMoney(selectedCourse?.price) }}</span>
            </div>
          </div>

          <div class="payment-methods">
            <h4>Chọn phương thức thanh toán:</h4>
            <button class="method-btn" @click="processPayment('momo')">
              <span>💜</span> Momo
            </button>
            <button class="method-btn" @click="processPayment('bank')">
              <span>🏦</span> Chuyển khoản ngân hàng
            </button>
            <button class="method-btn" @click="processPayment('cash')">
              <span>💵</span> Tiền mặt (tại trung tâm)
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import jsonData from '../assets/data/course.json'

  const router = useRouter()

  // ✅ Hàm kiểm tra đăng nhập từ localStorage
  const checkLoggedIn = () => {
    const user = localStorage.getItem('user')
    return !!user
  }

  // ✅ Lấy currentUser từ localStorage
  const getCurrentUser = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  // Dữ liệu khóa học
  const coursesData = ref(jsonData.coursesData)

  // Bộ lọc và tìm kiếm
  const searchKeyword = ref('')
  const currentLevel = ref('Tất cả')

  // Modal state
  const showModal = ref(false)
  const selectedCourse = ref(null)

  const allLevels = computed(() => {
    const levels = new Set(coursesData.value.map(c => c.level))
    return ['Tất cả', ...levels]
  })

  const filteredCourses = computed(() => {
    let filtered = coursesData.value
    if (currentLevel.value !== 'Tất cả') {
      filtered = filtered.filter(c => c.level === currentLevel.value)
    }
    if (searchKeyword.value.trim()) {
      const kw = searchKeyword.value.trim().toLowerCase()
      filtered = filtered.filter(c => c.name.toLowerCase().includes(kw))
    }
    return filtered
  })

  const formatMoney = (money) => money.toLocaleString('vi-VN') + ' VNĐ'
  const setFilter = (level) => currentLevel.value = level
  const filterCourses = () => { }

  // Mở modal thanh toán
  const openPaymentModal = (course) => {
    // Kiểm tra đã đăng nhập chưa
    if (!checkLoggedIn()) {
      if (confirm('Bạn cần đăng nhập để đăng ký khóa học. Chuyển đến trang đăng nhập?')) {
        router.push('/role-select')
      }
      return
    }
    selectedCourse.value = course
    showModal.value = true
  }

  // Đóng modal
  const closeModal = () => {
    showModal.value = false
    selectedCourse.value = null
  }

  // Xử lý thanh toán
  const processPayment = (method) => {
    if (!selectedCourse.value) return

    const currentUser = getCurrentUser()
    if (!currentUser) {
      alert('Vui lòng đăng nhập để đăng ký khóa học!')
      router.push('/role-select')
      return
    }

    let methodName = ''
    if (method === 'momo') methodName = 'Momo'
    if (method === 'bank') methodName = 'Chuyển khoản ngân hàng'
    if (method === 'cash') methodName = 'Tiền mặt tại trung tâm'

    if (confirm(`Xác nhận đăng ký khóa học "${selectedCourse.value.name}" với giá ${formatMoney(selectedCourse.value.price)} qua ${methodName}?`)) {

      // Tạo đối tượng đăng ký
      const registration = {
        id: Date.now(),
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || 'Chưa cập nhật',
        course: selectedCourse.value.name,
        price: selectedCourse.value.price,
        date: new Date().toISOString(),
        status: 'paid',
        paymentMethod: methodName,
        paymentDate: new Date().toISOString()
      }

      // Lưu vào localStorage
      const existingRegistrations = localStorage.getItem('courseRegistrations')
      let registrations = existingRegistrations ? JSON.parse(existingRegistrations) : []
      registrations.push(registration)
      localStorage.setItem('courseRegistrations', JSON.stringify(registrations))

      alert(`✅ Đăng ký thành công!\n\nKhóa học: ${selectedCourse.value.name}\nGiá: ${formatMoney(selectedCourse.value.price)}\nPhương thức: ${methodName}\n\nKhóa học đã được thêm vào danh sách của bạn!`)

      closeModal()

      // Chuyển đến trang quản lý của học viên
      router.push('/student-dashboard')
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .courses-page {
    background: #f9fafc;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  /* HEADER */
  .page-header {
    text-align: center;
    margin-bottom: 50px;
  }

    .page-header h1 {
      font-size: 48px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 10px;
    }

    .page-header p {
      font-size: 18px;
      color: #4a5568;
    }

  /* TOOLS */
  .tools {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 40px;
  }

  .search-input {
    padding: 12px 20px;
    width: 300px;
    border-radius: 40px;
    border: 2px solid #e2e8f0;
    font-size: 16px;
    transition: all 0.3s;
  }

    .search-input:focus {
      outline: none;
      border-color: #ffcc00;
      box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.2);
    }

  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .filter-btn {
    padding: 10px 25px;
    border-radius: 40px;
    border: 2px solid #e2e8f0;
    background: white;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    color: #1e293b;
  }

    .filter-btn:hover,
    .filter-btn.active {
      background: #ffcc00;
      border-color: #ffcc00;
      color: #1a1a2e;
    }

  /* COURSES GRID */
  .courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 30px;
  }

  .course-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s, box-shadow 0.3s;
  }

    .course-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 30px rgba(26, 26, 46, 0.15);
    }

  .card-img {
    position: relative;
    height: 220px;
    overflow: hidden;
    background: #2a1a3a;
  }

    .card-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

  .course-card:hover .card-img img {
    transform: scale(1.05);
  }

  .badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px 14px;
    border-radius: 30px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    z-index: 2;
  }

    .badge.hot {
      background: #e63939;
    }

    .badge.new {
      background: #2a9d8f;
    }

  .card-info {
    padding: 20px;
  }

    .card-info h3 {
      font-size: 20px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 5px;
    }

  .level {
    display: inline-block;
    background: #ffecb3;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    color: #1a1a2e;
    margin: 10px 0;
  }

  .desc {
    color: #475569;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .details {
    display: flex;
    gap: 15px;
    font-size: 13px;
    color: #64748b;
    padding: 10px 0;
    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 15px;
  }

    .details i {
      width: 16px;
      color: #ffcc00;
    }

  .price {
    font-size: 24px;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 15px;
  }

  .btn-register {
    width: 100%;
    padding: 12px;
    background: #1a1a2e;
    color: white;
    border: none;
    border-radius: 40px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
  }

    .btn-register:hover {
      background: #ffcc00;
      color: #1a1a2e;
      transform: translateY(-2px);
    }

  .no-result {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px;
    font-size: 18px;
    color: #64748b;
  }

  /* Modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }

  .modal-content {
    background: #1a1a2e;
    border-radius: 20px;
    width: 90%;
    max-width: 450px;
    border: 1px solid #ffcc00;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #16213e;
  }

    .modal-header h3 {
      color: #ffcc00;
      font-size: 20px;
    }

  .close-modal {
    background: none;
    border: none;
    color: #b8b8b8;
    font-size: 24px;
    cursor: pointer;
  }

  .modal-body {
    padding: 20px;
  }

  .course-info {
    background: #16213e;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 20px;
  }

    .course-info h4 {
      color: #ffcc00;
      margin-bottom: 10px;
      font-size: 18px;
    }

  .course-desc {
    color: #b8b8b8;
    font-size: 13px;
    margin-bottom: 15px;
  }

  .price-detail {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid #0f0f1a;
  }

    .price-detail .label {
      color: #b8b8b8;
    }

    .price-detail .price {
      color: #ffcc00;
      font-size: 20px;
      font-weight: bold;
    }

  .payment-methods h4 {
    color: #ffcc00;
    margin-bottom: 15px;
  }

  .method-btn {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    background: #16213e;
    border: 1px solid #ffcc00;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

    .method-btn:hover {
      background: #ffcc00;
      color: #1a1a2e;
    }

  /* Responsive */
  @media (max-width: 768px) {
    .page-header h1 {
      font-size: 36px;
    }

    .tools {
      flex-direction: column;
      align-items: center;
    }

    .search-input {
      width: 100%;
      max-width: 350px;
    }

    .filter-buttons {
      justify-content: center;
    }

    .courses-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Căn chỉnh đồng đều các card */
  .course-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .desc {
    flex-grow: 1;
  }

  .details {
    margin-top: auto;
    margin-bottom: 10px;
  }

  .btn-register {
    margin-top: 10px;
  }

  .card-info h3 {
    min-height: 3.2em;
    line-height: 1.4;
  }

  .level {
    align-self: flex-start;
  }
</style>
