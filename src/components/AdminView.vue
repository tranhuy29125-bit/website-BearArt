<template>
  <div class="admin-page">
    <div class="container">
      <div class="admin-header">
        <h1>QUẢN LÝ</h1>
        <p>Quản lý đăng ký khóa học và workshop</p>
      </div>

      <!-- Thống kê -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <h3>{{ totalCourses }}</h3>
            <p>Đăng ký khóa học</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-info">
            <h3>{{ totalWorkshops }}</h3>
            <p>Đăng ký workshop</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <h3>{{ formatMoney(totalRevenue) }}</h3>
            <p>Tổng tiền</p>
          </div>
        </div>
      </div>

      <!-- Tab điều khiển -->
      <div class="admin-tabs">
        <button :class="['tab-btn', { active: activeTab === 'courses' }]" @click="activeTab = 'courses'">
          📝 Đăng Ký Khóa Học
        </button>
        <button :class="['tab-btn', { active: activeTab === 'workshops' }]" @click="activeTab = 'workshops'">
          🎯 Đăng Ký Workshop
        </button>
      </div>

      <!-- Bảng đăng ký khóa học -->
      <div v-if="activeTab === 'courses'" class="data-table">
        <div class="table-header">
          <h3>📝 Danh sách đăng ký khóa học</h3>
          <button class="btn-refresh" @click="refreshData">🔄 Làm mới</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Khóa học</th>
                <th>Ngày đăng ký</th>
                <th>Giá tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(reg, index) in courseRegistrations" :key="reg.id">
                <td>{{ index + 1 }}</td>
                <td><strong>{{ reg.course }}</strong></td>
                <td>{{ formatDate(reg.date) }}</td>
                <td>{{ formatMoney(reg.price) }}</td>
                <td>
                  <span :class="['status', reg.status === 'paid' ? 'paid' : 'pending']">
                    {{ reg.status === 'paid' ? '✅ Đã thanh toán' : '⏳ Chờ thanh toán' }}
                  </span>
                </td>
                <td>
                  <button class="btn-delete" @click="deleteRegistration(reg.id, 'course')">🗑 Xóa</button>
                </td>
              </tr>
              <tr v-if="courseRegistrations.length === 0">
                <td colspan="6" class="empty-row">📭 Chưa có đăng ký khóa học nào</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Bảng đăng ký workshop -->
      <div v-if="activeTab === 'workshops'" class="data-table">
        <div class="table-header">
          <h3>🎯 Danh sách đăng ký workshop</h3>
          <button class="btn-refresh" @click="refreshData">🔄 Làm mới</button>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Workshop</th>
                <th>Ngày đăng ký</th>
                <th>Giá tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(reg, index) in workshopRegistrations" :key="reg.id">
                <td>{{ index + 1 }}</td>
                <td><strong>{{ reg.workshop }}</strong></td>
                <td>{{ formatDate(reg.date) }}</td>
                <td>{{ formatMoney(reg.price) }}</td>
                <td>
                  <span :class="['status', reg.status === 'paid' ? 'paid' : 'pending']">
                    {{ reg.status === 'paid' ? '✅ Đã thanh toán' : '⏳ Chờ thanh toán' }}
                  </span>
                </td>
                <td>
                  <button class="btn-delete" @click="deleteRegistration(reg.id, 'workshop')">🗑 Xóa</button>
                </td>
              </tr>
              <tr v-if="workshopRegistrations.length === 0">
                <td colspan="6" class="empty-row">📭 Chưa có đăng ký workshop nào</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'

  // Trạng thái tab hiện tại
  const activeTab = ref('courses')

  // Dữ liệu đăng ký
  const courseRegistrations = ref([])
  const workshopRegistrations = ref([])

  // ========== THỐNG KÊ ==========
  const totalCourses = computed(() => courseRegistrations.value.length)
  const totalWorkshops = computed(() => workshopRegistrations.value.length)
  const totalRevenue = computed(() => {
    const courseRevenue = courseRegistrations.value.reduce((sum, c) => sum + (c.price || 0), 0)
    const workshopRevenue = workshopRegistrations.value.reduce((sum, w) => sum + (w.price || 0), 0)
    return courseRevenue + workshopRevenue
  })

  // ========== HÀM XỬ LÝ ==========
  const refreshData = () => {
    const savedCourses = localStorage.getItem('courseRegistrations')
    const savedWorkshops = localStorage.getItem('workshopRegistrations')

    if (savedCourses) {
      courseRegistrations.value = JSON.parse(savedCourses)
    }
    if (savedWorkshops) {
      workshopRegistrations.value = JSON.parse(savedWorkshops)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa có'
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN')
  }

  const formatMoney = (money) => {
    if (!money) return '0 VNĐ'
    return money.toLocaleString('vi-VN') + ' VNĐ'
  }

  const deleteRegistration = (id, type) => {
    if (confirm('Bạn có chắc muốn xóa đăng ký này?')) {
      if (type === 'course') {
        courseRegistrations.value = courseRegistrations.value.filter(r => r.id !== id)
        localStorage.setItem('courseRegistrations', JSON.stringify(courseRegistrations.value))
      } else {
        workshopRegistrations.value = workshopRegistrations.value.filter(r => r.id !== id)
        localStorage.setItem('workshopRegistrations', JSON.stringify(workshopRegistrations.value))
      }
      alert('✅ Xóa thành công!')
      refreshData()
    }
  }

  onMounted(() => {
    refreshData()
  })
</script>

<style scoped>
  .admin-page {
    min-height: 100vh;
    background: #0f0f1a;
    padding: 40px 0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .admin-header {
    text-align: center;
    margin-bottom: 40px;
  }

    .admin-header h1 {
      font-size: 36px;
      color: #ffcc00;
      margin-bottom: 10px;
    }

    .admin-header p {
      color: #b8b8b8;
    }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }

  .stat-card {
    background: #1a1a2e;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: all 0.3s;
  }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

  .stat-icon {
    font-size: 48px;
  }

  .stat-info h3 {
    font-size: 32px;
    color: #ffcc00;
    margin-bottom: 5px;
  }

  .stat-info p {
    color: #b8b8b8;
    font-size: 14px;
  }

  /* Tabs */
  .admin-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    border-bottom: 2px solid #16213e;
    padding-bottom: 10px;
    flex-wrap: wrap;
  }

  .tab-btn {
    padding: 10px 24px;
    background: transparent;
    border: none;
    color: #b8b8b8;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s;
  }

    .tab-btn:hover {
      background: #16213e;
      color: #ffcc00;
    }

    .tab-btn.active {
      background: #ffcc00;
      color: #1a1a2e;
    }

  /* Data Table */
  .data-table {
    background: #1a1a2e;
    border-radius: 16px;
    padding: 20px;
  }

  .table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  }

    .table-header h3 {
      color: #ffcc00;
      font-size: 20px;
    }

  .btn-refresh {
    background: transparent;
    border: 1px solid #ffcc00;
    color: #ffcc00;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
  }

    .btn-refresh:hover {
      background: #ffcc00;
      color: #1a1a2e;
    }

  .table-wrapper {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 500px;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #16213e;
  }

  th {
    color: #ffcc00;
    font-weight: 600;
  }

  td {
    color: #b8b8b8;
  }

  .empty-row {
    text-align: center;
    padding: 40px;
  }

  /* Status badges */
  .status {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }

    .status.pending {
      background: #e74c3c;
      color: white;
    }

    .status.paid {
      background: #27ae60;
      color: white;
    }

  /* Delete button */
  .btn-delete {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s;
  }

    .btn-delete:hover {
      background: #c0392b;
      transform: scale(1.05);
    }

  /* Responsive */
  @media (max-width: 768px) {
    .admin-header h1 {
      font-size: 28px;
    }

    .tab-btn {
      padding: 6px 12px;
      font-size: 12px;
    }

    th, td {
      padding: 8px;
      font-size: 12px;
    }
  }
</style>
