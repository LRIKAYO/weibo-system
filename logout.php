<?php
session_start();
// 清空所有Session
$_SESSION = array();
// 销毁Session
session_destroy();
// 跳转至首页
header("Location: index.php");
exit;
?>