document.addEventListener('DOMContentLoaded', async function() {
  const path = window.location.pathname;

  if (path.includes('index.php') || path === '/') await loadPostList();

  if (path.includes('search.php')) {
    const kw = utils.getUrlParam('keyword');
    if (kw) {
      document.querySelector('.content').innerHTML = `<h2 style="margin-bottom:20px;">搜索结果："${kw}"</h2><div class="post-list"></div>`;
      await loadSearchResults(kw);
    } else { utils.showToast('请输入关键词','error'); setTimeout(() => window.location.href='index.php',1500); }
  }

  if (path.includes('post.php')) {
    const postId = utils.getUrlParam('post_id');
    postId ? await loadPostDetail(postId) : (utils.showToast('微博不存在','error'), setTimeout(() => window.location.href='index.php',1500));
  }

  path.includes('register.php') && initRegisterForm();
  path.includes('login.php') && initLoginForm();
});

// 加载微博列表
async function loadPostList() {
  const listEl = document.querySelector('.post-list');
  listEl.innerHTML = '<div style="text-align:center;padding:30px;">加载中...</div>';
  try {
    const posts = await ajax.api.getPostList();
    listEl.innerHTML = posts.length ===0 ? '<div style="text-align:center;padding:30px;color:#999;">暂无微博</div>' : '';
    posts.forEach(p => listEl.appendChild(createPostItem(p)));
    effects.initLikeAnimation(); effects.initCommentToggle();
  } catch(e) { listEl.innerHTML = '<div style="text-align:center;padding:30px;color:#e6162d;">加载失败</div>'; }
}
// 加载搜索结果
async function loadSearchResults(kw) {
  const listEl = document.querySelector('.post-list');
  listEl.innerHTML = '<div style="text-align:center;padding:30px;">搜索中...</div>';
  try {
    const posts = await ajax.api.searchPosts(kw);
    listEl.innerHTML = posts.length ===0 ? `<div style="text-align:center;padding:30px;color:#999;">无"${kw}"相关微博</div>` : '';
    posts.forEach(p => listEl.appendChild(createPostItem(p)));
    effects.initLikeAnimation(); effects.initCommentToggle();
  } catch(e) { listEl.innerHTML = '<div style="text-align:center;padding:30px;color:#e6162d;">搜索失败</div>'; }
}
// 创建单条微博DOM
function createPostItem(post) {
  const item = document.createElement('div');
  item.className = 'post-item'; item.dataset.postId = post.id;
  const imgHtml = post.images ? `<div class="post-images">${post.images.map(img => `<img src="${img}">`).join('')}</div>` : '';
  item.innerHTML = `
    <div class="post-header"><a href="profile.php?user_id=${post.user_id}" class="avatar"><img src="${post.user_avatar||'images/default-avatar.jpg'}"></a>
    <div class="user-info"><div class="username">${post.username}</div><div class="post-time">${utils.formatTime(post.create_time)}</div></div></div>
    <div class="post-content">${post.content}</div>${imgHtml}
    <div class="post-actions">
      <div class="action-btn comment-btn" data-post-id="${post.id}"><img src="images/icons/comment.png" style="width:16px;">评论(${post.comment_count})</div>
      <div class="action-btn like-btn ${post.is_liked?'liked':''}" data-post-id="${post.id}"><img src="${post.is_liked?'images/icons/like-red.png':'images/icons/like.png'}" style="width:16px;"><span class="like-count">${post.like_count}</span></div>
    </div>
    <div class="comments" data-post-id="${post.id}"><div class="comment-list"></div>
    <div class="comment-form"><textarea placeholder="发表评论..."></textarea><button data-post-id="${post.id}">评论</button></div></div>
  `;
  // 绑定评论提交事件
  item.querySelector('.comment-form button').addEventListener('click', async function() {
    const postId = this.dataset.postId;
    const content = this.parentNode.querySelector('textarea').value.trim();
    if (utils.isEmpty(content)) { utils.showToast('评论不能为空','error'); return; }
    this.disabled = true; this.innerText = '评论中...';
    try {
      await ajax.api.publishComment(postId, content);
      utils.showToast('评论成功','success');
      this.parentNode.querySelector('textarea').value = '';
      effects.loadComments(postId, item.querySelector('.comments'));
    } catch(e) {} finally { this.disabled = false; this.innerText = '评论'; }
  });
  return item;
}
// 注册表单验证
function initRegisterForm() {
  document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const un = document.getElementById('username').value.trim();
    const pwd = document.getElementById('password').value;
    const repwd = document.getElementById('repassword').value;
    const email = document.getElementById('email').value.trim();
    if (utils.isEmpty(un)) { utils.showToast('用户名不能为空','error'); return; }
    if (pwd.length <6) { utils.showToast('密码≥6位','error'); return; }
    if (pwd !== repwd) { utils.showToast('密码不一致','error'); return; }
    if (!/^[\w-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(email)) { utils.showToast('邮箱格式错误','error'); return; }
    utils.showToast('注册中...');
    setTimeout(() => { utils.showToast('注册成功，跳转中','success'); setTimeout(() => window.location.href='login.php',1500); },1000);
  });
}
// 登录表单验证
function initLoginForm() {
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const un = document.getElementById('username').value.trim();
    const pwd = document.getElementById('password').value;
    if (utils.isEmpty(un) || utils.isEmpty(pwd)) { utils.showToast('用户名/密码不能为空','error'); return; }
    utils.showToast('登录中...');
    setTimeout(() => { utils.showToast('登录成功，跳转中','success'); setTimeout(() => window.location.href='index.php',1500); },1000);
  });
}
// 加载微博详情
async function loadPostDetail(postId) {
  const el = document.querySelector('.content');
  el.innerHTML = '<div style="text-align:center;padding:30px;">加载中...</div>';
  try {
    const post = await ajax.get('api/post.php',{action:'detail',post_id:postId});
    el.innerHTML = ''; el.appendChild(createPostItem(post));
    const commentEl = el.querySelector('.comments');
    commentEl.classList.add('show'); commentEl.dataset.loaded = 'true';
    effects.loadComments(postId, commentEl); effects.initLikeAnimation();
  } catch(e) { el.innerHTML = '<div style="text-align:center;padding:30px;color:#e6162d;">加载失败</div>'; }
}