<?php
$currentPage = 'register';
$pageTitle = '用户注册 - 校园微博';
include 'includes/header.php';
?>

<!-- 注册表单区 -->
<div class="container" style="max-width:500px;margin:60px auto;">
  <div style="background:#fff;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.05);padding:30px;">
    <h2 style="font-size:24px;color:#e6162d;text-align:center;margin-bottom:30px;">用户注册</h2>
    <form id="register-form">
      <div style="margin-bottom:20px;">
        <label for="username" style="display:block;margin-bottom:8px;font-weight:500;">用户名</label>
        <input type="text" id="username" name="username" style="width:100%;height:42px;padding:0 15px;border:1px solid #eee;border-radius:8px;background:#f9f9f9;">
      </div>
      <div style="margin-bottom:20px;">
        <label for="password" style="display:block;margin-bottom:8px;font-weight:500;">密码（≥6位）</label>
        <input type="password" id="password" name="password" style="width:100%;height:42px;padding:0 15px;border:1px solid #eee;border-radius:8px;background:#f9f9f9;">
      </div>
      <div style="margin-bottom:20px;">
        <label for="repassword" style="display:block;margin-bottom:8px;font-weight:500;">确认密码</label>
        <input type="password" id="repassword" name="repassword" style="width:100%;height:42px;padding:0 15px;border:1px solid #eee;border-radius:8px;background:#f9f9f9;">
      </div>
      <div style="margin-bottom:20px;">
        <label for="email" style="display:block;margin-bottom:8px;font-weight:500;">邮箱</label>
        <input type="email" id="email" name="email" style="width:100%;height:42px;padding:0 15px;border:1px solid #eee;border-radius:8px;background:#f9f9f9;">
      </div>
      <button type="submit" style="width:100%;height:44px;background:#e6162d;color:#fff;border-radius:22px;font-size:16px;cursor:pointer;">立即注册</button>
      <div style="text-align:center;margin-top:18px;font-size:14px;">
        已有账号？<a href="login.php" style="color:#e6162d;">立即登录</a>
      </div>
    </form>
  </div>
</div>

<?php include 'includes/footer.php'; ?>