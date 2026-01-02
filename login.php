<?php
$currentPage = 'login';
$pageTitle = '用户登录 - 校园微博';
include 'includes/header.php';
?>

<!-- 登录表单区 -->
<div class="container" style="max-width:500px;margin:60px auto;">
  <div style="background:#fff;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.05);padding:30px;">
    <h2 style="font-size:24px;color:#e6162d;text-align:center;margin-bottom:30px;">用户登录</h2>
    <form id="login-form">
      <div style="margin-bottom:20px;">
        <label for="username" style="display:block;margin-bottom:8px;font-weight:500;">用户名</label>
        <input type="text" id="username" name="username" style="width:100%;height:42px;padding:0 15px;border:1px solid #eee;border-radius:8px;background:#f9f9f9;">
      </div>
      <div style="margin-bottom:20px;">
        <label for="password" style="display:block;margin-bottom:8px;font-weight:500;">密码</label>
        <input type="password" id="password" name="password" style="width:100%;height:42px;padding:0 15px;border:1px solid #eee;border-radius:8px;background:#f9f9f9;">
      </div>
      <button type="submit" style="width:100%;height:44px;background:#e6162d;color:#fff;border-radius:22px;font-size:16px;cursor:pointer;">立即登录</button>
      <div style="text-align:center;margin-top:18px;font-size:14px;">
        还没有账号？<a href="register.php" style="color:#e6162d;">立即注册</a>
      </div>
    </form>
  </div>
</div>

<?php include 'includes/footer.php'; ?>