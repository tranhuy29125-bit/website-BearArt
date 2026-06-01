<template>
  <section class="blog-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Tin tức từ Bear Art</h2>
        <p class="section-subtitle">Cập nhật những bài viết mới nhất về nghệ thuật, khóa học và workshop</p>
      </div>

      <div class="blog-grid">
        <article v-for="post in posts" :key="post.id" class="blog-card">
          <div class="card-image">
            <img :src="post.image" :alt="post.title" />
            <span class="post-category">{{ post.category }}</span>
          </div>
          <div class="card-content">
            <div class="post-meta">
              <span class="post-date">
                <i class="far fa-calendar-alt"></i> {{ post.date }}
              </span>
              <span class="post-author">
                <i class="far fa-user"></i> {{ post.author }}
              </span>
              <span class="post-views">
                <i class="far fa-eye"></i> {{ post.views }} lượt xem
              </span>
            </div>
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <button class="btn-readmore" @click="readMore(post.id)">
              Đọc thêm <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </article>
      </div>

      <div class="blog-footer">
        <button class="btn-view-all" @click="viewAllPosts">Xem tất cả bài viết</button>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref } from 'vue'

  const posts = ref([
    {
      id: 1,
      title: 'Bí quyết vẽ tĩnh vật cho người mới bắt đầu',
      excerpt: 'Học cách quan sát ánh sáng, đổ bóng và tạo khối để bức vẽ tĩnh vật trở nên sống động như thật. Cùng khám phá 5 mẹo đơn giản nhưng hiệu quả.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80',
      category: 'Hội họa',
      date: '15/03/2025',
      author: 'Ngọc Anh',
      views: 1240
    },
    {
      id: 2,
      title: 'Phân biệt các loại cọ vẽ phổ biến: Hướng dẫn chọn đúng cọ cho từng chất liệu',
      excerpt: 'Cọ tròn, cọ dẹt, cọ lược... Loại nào dùng cho màu nước, sơn dầu hay acrylic? Tổng hợp chi tiết giúp bạn chọn cọ phù hợp nhất.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
      category: 'Dụng cụ',
      date: '22/03/2025',
      author: 'Minh Tuấn',
      views: 892
    },
    {
      id: 3,
      title: 'Lịch Workshop tháng 5: Trải nghiệm nghệ thuật đầy màu sắc tại Bear Art',
      excerpt: 'Tham gia các buổi workshop vẽ trên gốm, màu nước ngoài trời và ký họa đô thị. Đăng ký ngay để nhận ưu đãi 20% học phí.',
      image: 'https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=600&q=80',
      category: 'Sự kiện',
      date: '05/04/2025',
      author: 'Bear Art Team',
      views: 2103
    },
    {
      id: 4,
      title: 'Phong cách Minimalism trong thiết kế đồ họa: Khi ít lại là nhiều',
      excerpt: 'Tìm hiểu cách tạo ra những thiết kế tinh giản nhưng vẫn truyền tải thông điệp mạnh mẽ qua bố cục, màu sắc và kiểu chữ.',
      image: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?auto=format&fit=crop&w=600&q=80',
      category: 'Thiết kế',
      date: '10/04/2025',
      author: 'Lan Hương',
      views: 1567
    }
  ])

  const readMore = (id) => {
    alert(`Đọc thêm bài viết số ${id}\nTính năng đang phát triển.`)
  }

  const viewAllPosts = () => {
    alert('Tính năng xem tất cả bài viết sẽ sớm ra mắt!')
  }
</script>

<style scoped>
  /* Reset & container */
  .blog-section {
    padding: 60px 0;
    background: linear-gradient(135deg, #ffffff 0%, #c3cfe2 100%);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Section header */
  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .section-title {
    font-size: 36px;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 12px;
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
    margin-top: 24px;
  }

  /* Blog grid */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 50px;
  }

  /* Blog card */
  .blog-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
  }

    .blog-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 35px rgba(0, 0, 0, 0.12);
    }

  /* Card image */
  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

  .blog-card:hover .card-image img {
    transform: scale(1.05);
  }

  .post-category {
    position: absolute;
    top: 15px;
    left: 15px;
    background: #ffcc00;
    color: #1a1a2e;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 30px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Card content */
  .card-content {
    padding: 20px;
  }

  .post-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 12px;
    color: #888;
    margin-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 10px;
  }

    .post-meta i {
      margin-right: 4px;
      font-size: 12px;
    }

  .post-title {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 10px;
    line-height: 1.4;
    transition: color 0.2s;
  }

  .blog-card:hover .post-title {
    color: #ffcc00;
  }

  .post-excerpt {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 18px;
  }

  /* Button read more */
  .btn-readmore {
    background: transparent;
    border: none;
    color: #1a1a2e;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

    .btn-readmore i {
      font-size: 12px;
      transition: transform 0.2s;
    }

    .btn-readmore:hover {
      color: #ffcc00;
    }

      .btn-readmore:hover i {
        transform: translateX(4px);
      }

  /* Footer button */
  .blog-footer {
    text-align: center;
  }

  .btn-view-all {
    background: #1a1a2e;
    color: white;
    border: none;
    padding: 12px 32px;
    border-radius: 40px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

    .btn-view-all:hover {
      background: #ffcc00;
      color: #1a1a2e;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

  /* Responsive */
  @media (max-width: 768px) {
    .blog-section {
      padding: 40px 0;
    }

    .section-title {
      font-size: 28px;
    }

    .blog-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .post-meta {
      font-size: 11px;
      gap: 8px;
    }
  }

</style>
