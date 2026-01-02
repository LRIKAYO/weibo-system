<?php
session_start();
if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') { header("Location: ../index.php"); exit; }
$currentPage = 'admin';
$pageTitle = '管理后台 - 校园微博';
include '../includes/header.php';
?>
<div class="container">
  <div class="header"><h1>校园微博管理后台</h1></div>
  <div class="main">
    <div class="sidebar">
      <a href="index.php">后台首页</a>
      <a href="users.php">用户管理</a>
      <a href="posts.php">微博管理</a>
      <a href="comments.php">评论管理</a>
    </div>
    <div class="content">
      <h2 style="margin-bottom:20px;">后台仪表盘</h2>
      <p>欢迎进入管理员后台，可管理用户、微博、评论数据</p>
    </div>
  </div>
</div>
<?php include '../includes/footer.php'; ?>