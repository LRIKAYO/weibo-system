组员必读！！！！
项目结构如下：
weibo-system/                    # 项目根目录
│
├── index.php                    # 首页（微博列表页）
├── login.php                    # 登录页面
├── register.php                 # 注册页面
├── logout.php                   # 退出处理
├── profile.php                  # 个人中心/用户主页
├── post.php                     # 单条微博详情页
├── search.php                   # 搜索结果页
├── admin/                       # 管理员后台
│   ├── index.php               # 后台首页（仪表板）
│   ├── users.php               # 用户管理
│   ├── posts.php               # 微博管理
│   ├── comments.php            # 评论管理
│   └── style.css               # 后台样式
│
├── includes/                    # 公共包含文件
│   ├── config.php              # 配置文件（数据库连接等）
│   ├── functions.php           # 通用函数库
│   ├── header.php              # 公共头部
│   ├── footer.php              # 公共底部
│   └── navigation.php          # 导航栏
│
├── css/                         # 样式文件
│   ├── style.css               # 主样式文件
│   ├── reset.css               # 重置样式
│   └── responsive.css          # 响应式样式
│
├── js/                          # JavaScript文件
│   ├── main.js                 # 主JS文件
│   ├── ajax.js                 # AJAX相关功能
│   ├── effects.js              # 动态效果
│   └── utils.js                # 工具函数
│
├── images/                      # 静态图片资源
│   ├── logo.png
│   ├── default-avatar.jpg
│   └── icons/                  # 图标文件夹
│
├── uploads/                     # 用户上传文件（需要可写权限）
│   ├── avatars/                # 用户头像
│   └── posts/                  # 微博图片
│
├── lib/                         # 核心库文件
│   ├── Database.class.php      # 数据库操作类
│   ├── User.class.php          # 用户类
│   ├── Post.class.php          # 微博类
│   ├── Comment.class.php       # 评论类
│   └── Like.class.php          # 点赞类
│
├── api/                         # API接口（用于AJAX）
│   ├── like.php                # 点赞接口
│   ├── comment.php             # 评论接口
│   ├── follow.php              # 关注接口
│   └── post.php                # 微博操作接口
│
├── templates/                   # 页面模板组件
│   ├── post-item.php           # 单条微博模板
│   ├── comment-item.php        # 评论模板
│   ├── user-card.php           # 用户卡片模板
│   └── pagination.php          # 分页模板
│
