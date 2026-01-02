<?php
$currentPage = 'profile';
$pageTitle = '我的主页 - 校园微博';
include 'includes/header.php';
?>

<!-- 个人中心主内容区 -->
<div class="main container">
  <!-- 左侧个人信息栏-->
  <div class="sidebar-left">
    <div class="user-card" style="padding:30px;">
      <?php if (isset($_SESSION['user_id'])): ?>
        <div class="avatar" style="width:100px;height:100px;margin:0 auto 20px;">
          <img src="<?php echo isset($_SESSION['avatar']) ? $_SESSION['avatar'] : 'images/default-avatar.jpg'; ?>" alt="我的头像">
        </div>
        <h3 style="font-size:20px;margin-bottom:10px;"><?php echo isset($_SESSION['username']) ? $_SESSION['username'] : '用户'; ?></h3>
        <div class="bio" style="font-size:14px;margin-bottom:20px;"><?php echo isset($_SESSION['bio']) ? $_SESSION['bio'] : '这个人很懒，什么都没留下~'; ?></div>
        <div style="display:flex;justify-content:space-around;">
          <div><span style="font-weight:bold;color:#e6162d;">52</span> <br> 微博</div>
          <div><span style="font-weight:bold;color:#e6162d;">128</span> <br> 关注</div>
          <div><span style="font-weight:bold;color:#e6162d;">236</span> <br> 粉丝</div>
        </div>
      <?php else: ?>
        <div style="text-align:center;padding:20px;">
          <p style="color:#999;margin-bottom:15px;">请先登录查看个人主页</p>
          <a href="login.php" style="padding:6px 20px;background:#e6162d;color:#fff;border-radius:20px;">立即登录</a>
        </div>
      <?php endif; ?>
    </div>
  </div>

  <!-- 中间我的微博列表 -->
  <div class="content">
    <h2 style="font-size:18px;margin-bottom:20px;">我的微博</h2>
    <div class="post-list"></div>
  </div>
</div>

<?php include 'includes/footer.php'; ?>