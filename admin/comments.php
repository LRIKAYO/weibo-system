<?php
session_start();
if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
    header("Location: ../index.php");
    exit;
}
$pageTitle = '评论管理 - 校园微博后台';
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="admin-header">
        <div class="container">
            <h1>校园微博管理后台</h1>
            <a href="../logout.php" class="logout-btn">退出登录</a>
        </div>
    </header>
    <div class="admin-main container">
        <aside class="admin-sidebar">
            <ul>
                <li><a href="index.php">后台首页</a></li>
                <li><a href="users.php">用户管理</a></li>
                <li><a href="posts.php">微博管理</a></li>
                <li class="active"><a href="comments.php">评论管理</a></li>
            </ul>
        </aside>
        <main class="admin-content">
            <h2>评论管理</h2>
            <div class="tips">
                <p>评论管理功能待开发，可在此页面实现评论审核、删除、回复等操作</p>
            </div>
        </main>
    </div>
</body>
</html>