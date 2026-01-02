<?php

$currentPage = 'index';
$pageTitle = '首页 - 校园微博';
include 'includes/header.php';
?>

<style>

body { 
  background-color: #141414; /* 微博深色底色 */
  color: #fff;
}
/* 顶部导航栏*/
.tab-nav { 
  background: rgba(0,0,0,0.8); 
  padding: 10px 0; 
  border-bottom: 1px solid #333;
}
.tab-nav .container { 
  display: flex; 
  gap: 20px; 
  align-items: center;
}
.tab-nav a { 
  color: #fff; 
  font-size: 16px; 
  padding: 8px 0; 
  position: relative;
}
.tab-nav a.active { 
  color: #e6162d; 
  font-weight: bold;
}
.tab-nav a.active::after { 
  content: ''; 
  position: absolute; 
  bottom: 0; 
  left: 0; 
  width: 100%; 
  height: 2px; 
  background: #e6162d;
}
/* 三栏布局核心 */
.main-wrapper { 
  display: flex; 
  gap: 20px; 
  padding: 20px 0;
}
/* 左侧栏 */
.sidebar-left { 
  width: 200px; 
  flex-shrink: 0; 
  background: rgba(0,0,0,0.7); 
  border-radius: 8px; 
  padding: 15px;
}
.sidebar-left .nav-item { 
  padding: 10px; 
  border-radius: 6px; 
  cursor: pointer; 
  margin-bottom: 8px;
}
.sidebar-left .nav-item:hover { 
  background: rgba(255,255,255,0.1);
}
.sidebar-left .nav-item.active { 
  background: rgba(230,22,45,0.2); 
  color: #e6162d;
}

.content { 
  flex: 1; 
  max-width: 600px; 
}
/* 右侧栏 */
.sidebar-right { 
  width: 280px; 
  flex-shrink: 0; 
  background: rgba(0,0,0,0.7); 
  border-radius: 8px; 
  padding: 15px;
}

.post-item { 
  background: rgba(0,0,0,0.8); 
  border: 1px solid #333; 
  border-radius: 8px; 
  padding: 15px; 
  margin-bottom: 15px;
}
.post-header { 
  display: flex; 
  align-items: center; 
  gap: 10px; 
  margin-bottom: 10px;
}
.post-header .avatar { 
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
  overflow: hidden;
}
.post-header .avatar img { 
  width: 100%; 
  height: 100%; 
  object-fit: cover;
}
.post-header .username { 
  font-weight: bold; 
  color: #fff;
}
.post-header .post-time { 
  font-size: 12px; 
  color: #999; 
  margin-top: 2px;
}
.post-content { 
  line-height: 1.6; 
  margin-bottom: 10px;
}
.post-actions { 
  display: flex; 
  gap: 20px; 
  color: #999; 
  font-size: 14px;
}
.post-actions .action-btn { 
  display: flex; 
  align-items: center; 
  gap: 5px; 
  cursor: pointer;
}
.post-actions .action-btn:hover { 
  color: #e6162d;
}

.post-form { 
  background: rgba(0,0,0,0.8); 
  border: 1px solid #333; 
  border-radius: 8px; 
  padding: 15px; 
  margin-bottom: 15px;
}
.post-form textarea { 
  width: 100%; 
  height: 80px; 
  background: transparent; 
  border: none; 
  color: #fff; 
  resize: none; 
  outline: none;
}
.post-form .submit-btn { 
  background: #e6162d; 
  color: #fff; 
  border: none; 
  padding: 8px 20px; 
  border-radius: 20px; 
  cursor: pointer;
}
</style>

<!-- 顶部导航 -->
<div class="tab-nav">
  <div class="container">
    <a href="#" class="active">首页</a>
    <a href="#">热门</a>
    <a href="#">我的</a>
  </div>
</div>

<div class="main-wrapper container">
  <!-- 左侧栏 -->
  <div class="sidebar-left">
    <div class="nav-item active">首页</div>
    <div class="nav-item">热门微博</div>
    <div class="nav-item">我的微博</div>
    <div class="nav-item">消息</div>
  </div>

  <!-- 中间核心区：发布框 + 微博列表-->
  <div class="content">
    <!-- 发布微博框（已登录显示） -->
    <?php if (isset($_SESSION['user_id'])): ?>
      <div class="post-form">
        <textarea placeholder="分享你的想法..."></textarea>
        <button class="submit-btn">发布</button>
      </div>
    <?php endif; ?>

    <!-- 微博列表-->
    <div class="post-list">
      <!-- 示例微博1 -->
      <div class="post-item">
        <div class="post-header">
          <div class="avatar">
            <img src="images/avatar1.jpg" alt="用户头像">
          </div>
          <div>
            <div class="username">校园用户1</div>
            <div class="post-time">1小时前</div>
          </div>
        </div>
        <div class="post-content">
          今天的校园活动超有意思！分享一下现场的照片～
        </div>
        <div class="post-actions">
          <div class="action-btn">评论 23</div>
          <div class="action-btn">转发 8</div>
          <div class="action-btn">点赞 128</div>
        </div>
      </div>

      <!-- 示例微博2 -->
      <div class="post-item">
        <div class="post-header">
          <div class="avatar">
            <img src="images/avatar2.jpg" alt="用户头像">
          </div>
          <div>
            <div class="username">校园用户2</div>
            <div class="post-time">3小时前</div>
          </div>
        </div>
        <div class="post-content">
          期末复习打卡，一起加油！💪
        </div>
        <div class="post-actions">
          <div class="action-btn">评论 15</div>
          <div class="action-btn">转发 5</div>
          <div class="action-btn">点赞 96</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 右侧栏 -->
  <div class="sidebar-right">
    <div style="font-weight: bold; margin-bottom: 15px; font-size: 16px;">推荐关注</div>

    <div style="display: flex; gap: 10px; margin-bottom: 15px; align-items: center;">
      <div class="avatar"><img src="images/avatar3.jpg" alt=""></div>
      <div style="flex: 1;">
        <div style="font-size: 14px; font-weight: bold;">校园官微</div>
        <div style="font-size: 12px; color: #999;">官方账号</div>
      </div>
      <button style="background: #e6162d; color: #fff; border: none; padding: 4px 10px; border-radius: 12px; font-size: 12px;">关注</button>
    </div>
    <div style="font-weight: bold; margin: 20px 0 10px 0; font-size: 16px;">热门话题</div>
    <div style="font-size: 14px; padding: 5px 0; border-bottom: 1px solid #333;">#校园日常#</div>
    <div style="font-size: 14px; padding: 5px 0;">#期末加油#</div>
  </div>
</div>

<?php include 'includes/footer.php'; ?>