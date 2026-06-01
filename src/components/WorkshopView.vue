<template>
  <div class="workshop-page">
    <!-- Banner -->
    <section class="banner">
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <div class="container">
          <span class="banner-tag">🔥 SỰ KIỆN NỔI BẬT</span>
          <h1 class="banner-title">
            Workshop <span class="highlight">Thực Chiến</span>
          </h1>
          <p class="banner-desc">
            Tham gia các khóa workshop thực tế được dẫn dắt bởi chuyên gia hàng đầu
          </p>
          <div class="banner-stats">
            <div class="stat-item">
              <div class="stat-number">12+</div>
              <div class="stat-label">Workshop</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Học Viên</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">98%</div>
              <div class="stat-label">Hài Lòng</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="container">
        <h2 class="section-title">Khám Phá Workshop</h2>
        <div class="filter-tabs">
          <button v-for="tab in filterTabs"
                  :key="tab.value"
                  :class="['filter-btn', { active: filter === tab.value }]"
                  @click="filter = tab.value">
            {{ tab.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Workshop Cards -->
    <section class="workshop-section">
      <div class="container">
        <div class="workshop-grid">
          <div v-for="item in filteredWorkshops" :key="item.id" class="workshop-card">
            <div class="card-image">
              <img :src="item.img" :alt="item.title">
              <span class="card-category">{{ item.categoryName }}</span>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-desc">{{ item.desc }}</p>
              <div class="card-info">
                <div class="info-item">
                  <i class="far fa-calendar-alt"></i>
                  <span>{{ item.date }}</span>
                </div>
                <div class="info-item">
                  <i class="far fa-clock"></i>
                  <span>{{ item.time }}</span>
                </div>
                <div class="info-item">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ item.location }}</span>
                </div>
              </div>
              <div class="card-footer">
                <div class="price" :class="{ free: item.price === 'Miễn phí' }">
                  {{ item.price }}
                </div>
                <button class="btn-register" @click="openPaymentModal(item)">
                  💳 Đăng Ký Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal xác nhận thanh toán -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>💳 Xác nhận đăng ký Workshop</h3>
          <button class="close-modal" @click="closeModal">✕</button>
        </div>
        <div class="modal-body">
          <div class="workshop-info">
            <h4>{{ selectedWorkshop?.title }}</h4>
            <p class="workshop-desc">{{ selectedWorkshop?.desc }}</p>
            <div class="info-detail">
              <span><i class="far fa-calendar-alt"></i> {{ selectedWorkshop?.date }}</span>
              <span><i class="far fa-clock"></i> {{ selectedWorkshop?.time }}</span>
              <span><i class="fas fa-map-marker-alt"></i> {{ selectedWorkshop?.location }}</span>
            </div>
            <div class="price-detail">
              <span class="label">Giá workshop:</span>
              <span class="price">{{ selectedWorkshop?.price }}</span>
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
  import jsonData from '../assets/data/workshop.json'

  const router = useRouter()

  // Hàm kiểm tra đăng nhập từ localStorage
  const checkLoggedIn = () => {
    const user = localStorage.getItem('user')
    return !!user
  }

  // Lấy currentUser từ localStorage
  const getCurrentUser = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  // Lấy giá workshop (chuyển string thành số)
  const getWorkshopPrice = (priceString) => {
    // Loại bỏ dấu . và chuyển thành số
    const match = priceString.match(/(\d+(?:\.\d+)?)/)
    return match ? parseInt(match[0].replace(/\./g, '')) : 300000
  }

  // Filter state
  const filter = ref('all')

  const filterTabs = [
    { label: 'Tất Cả', value: 'all' },
    { label: 'Thiết Kế', value: 'thiet-ke' },
    { label: 'Lập Trình', value: 'lap-trinh' }
  ]

  // Workshop data – lấy từ JSON
  const workshops = ref(jsonData.workshops)

  // Modal state
  const showModal = ref(false)
  const selectedWorkshop = ref(null)

  // Computed
  const filteredWorkshops = computed(() => {
    if (filter.value === 'all') return workshops.value
    return workshops.value.filter(w => w.category === filter.value)
  })

  // Mở modal thanh toán
  const openPaymentModal = (workshop) => {
    // Kiểm tra đã đăng nhập chưa
    if (!checkLoggedIn()) {
      if (confirm('Bạn cần đăng nhập để đăng ký workshop. Chuyển đến trang đăng nhập?')) {
        router.push('/role-select')
      }
      return
    }
    selectedWorkshop.value = workshop
    showModal.value = true
  }

  // Đóng modal
  const closeModal = () => {
    showModal.value = false
    selectedWorkshop.value = null
  }

  // Xử lý thanh toán
  const processPayment = (method) => {
    if (!selectedWorkshop.value) return

    const currentUser = getCurrentUser()
    if (!currentUser) {
      alert('Vui lòng đăng nhập để đăng ký workshop!')
      router.push('/role-select')
      return
    }

    let methodName = ''
    if (method === 'momo') methodName = 'Momo'
    if (method === 'bank') methodName = 'Chuyển khoản ngân hàng'
    if (method === 'cash') methodName = 'Tiền mặt tại trung tâm'

    const price = getWorkshopPrice(selectedWorkshop.value.price)
    const priceText = price.toLocaleString('vi-VN') + ' VNĐ'

    if (confirm(`Xác nhận đăng ký workshop "${selectedWorkshop.value.title}" với giá ${priceText} qua ${methodName}?`)) {

      // Tạo đối tượng đăng ký
      const registration = {
        id: Date.now(),
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || 'Chưa cập nhật',
        workshop: selectedWorkshop.value.title,
        price: price,
        priceText: selectedWorkshop.value.price,
        date: selectedWorkshop.value.date,
        time: selectedWorkshop.value.time,
        location: selectedWorkshop.value.location,
        registerDate: new Date().toISOString(),
        status: 'paid', // Đã thanh toán ngay khi đăng ký
        paymentMethod: methodName,
        paymentDate: new Date().toISOString()
      }

      // Lưu vào localStorage
      const existingRegistrations = localStorage.getItem('workshopRegistrations')
      let registrations = existingRegistrations ? JSON.parse(existingRegistrations) : []
      registrations.push(registration)
      localStorage.setItem('workshopRegistrations', JSON.stringify(registrations))

      alert(`✅ Đăng ký thành công!\n\nWorkshop: ${selectedWorkshop.value.title}\nGiá: ${priceText}\nPhương thức: ${methodName}\n\nWorkshop đã được thêm vào danh sách!`)

      closeModal()

      // Chuyển đến trang quản lý
      router.push('/admin')
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Banner */
  .banner {
    position: relative;
    height: 500px;
    background: url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1500&q=80');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.5));
  }

  .banner-content {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    color: white;
  }

  .banner-tag {
    display: inline-block;
    background: #ffcc00;
    color: #333;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .banner-title {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 20px;
  }

    .banner-title .highlight {
      color: #ffcc00;
    }

  .banner-desc {
    font-size: 18px;
    margin-bottom: 30px;
    max-width: 500px;
    opacity: 0.9;
  }

  .banner-stats {
    display: flex;
    gap: 40px;
  }

  .stat-number {
    font-size: 32px;
    font-weight: 800;
    color: #ffcc00;
  }

  .stat-label {
    font-size: 14px;
    opacity: 0.8;
  }

  /* Filter Section */
  .filter-section {
    padding: 60px 0 30px;
    background: #f8f9fa;
  }

  .section-title {
    text-align: center;
    font-size: 36px;
    color: #333;
    margin-bottom: 40px;
  }

  .filter-tabs {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 12px 28px;
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    color: #666;
  }

    .filter-btn:hover {
      border-color: #ffcc00;
      color: #ffcc00;
    }

    .filter-btn.active {
      background: #ffcc00;
      border-color: #ffcc00;
      color: #333;
    }

  /* Workshop Section */
  .workshop-section {
    padding: 60px 0;
    background: linear-gradient(135deg, #ffffff 0%, #c3cfe2 100%);
  }

  .workshop-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
  }

  .workshop-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

    .workshop-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

  .card-image {
    position: relative;
    height: 220px;
    overflow: hidden;
    flex-shrink: 0;
  }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

  .workshop-card:hover .card-image img {
    transform: scale(1.05);
  }

  .card-category {
    position: absolute;
    top: 15px;
    left: 15px;
    background: #ffcc00;
    color: #333;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    z-index: 2;
  }

  .card-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
    line-height: 1.4;
    min-height: 56px;
  }

  .card-desc {
    color: #666;
    line-height: 1.5;
    margin-bottom: 15px;
    font-size: 14px;
    flex-grow: 1;
  }

  .card-info {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: #888;
  }

    .info-item i {
      width: 16px;
      color: #ffcc00;
    }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }

  .price {
    font-size: 22px;
    font-weight: 800;
    color: #e74c3c;
  }

    .price.free {
      color: #27ae60;
    }

  .btn-register {
    padding: 10px 24px;
    background: #333;
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
  }

    .btn-register:hover {
      background: #ffcc00;
      color: #333;
      transform: translateY(-2px);
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

  .workshop-info {
    background: #16213e;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 20px;
  }

    .workshop-info h4 {
      color: #ffcc00;
      margin-bottom: 10px;
      font-size: 18px;
    }

  .workshop-desc {
    color: #b8b8b8;
    font-size: 13px;
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .info-detail {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #0f0f1a;
    font-size: 12px;
    color: #b8b8b8;
  }

    .info-detail i {
      margin-right: 5px;
      color: #ffcc00;
    }

  .price-detail {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
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
    .banner {
      height: 400px;
      background-attachment: scroll;
    }

    .banner-title {
      font-size: 32px;
    }

    .banner-stats {
      gap: 20px;
    }

    .stat-number {
      font-size: 24px;
    }

    .workshop-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .card-title {
      font-size: 18px;
      min-height: auto;
    }

    .price {
      font-size: 18px;
    }

    .btn-register {
      padding: 8px 16px;
      font-size: 12px;
    }

    .card-info {
      gap: 10px;
    }

    .info-item {
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    .card-footer {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }

    .btn-register {
      text-align: center;
    }

    .price {
      text-align: center;
    }
  }
</style>
