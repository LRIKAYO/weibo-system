const effects = {
  // 1. 点赞动画
  initLikeAnimation: function() {
    document.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', async function() {
        const postId = this.dataset.postId;
        const countEl = this.querySelector('.like-count');
        this.disabled = true;
        try {
          const data = await ajax.api.toggleLike(postId);
          this.querySelector('img').style.transform = 'scale(1.5)';
          setTimeout(() => this.querySelector('img').style.transform = 'scale(1)',300);
          countEl.innerText = data.like_count;
          this.classList[data.is_liked ? 'add' : 'remove']('liked');
        } catch(e) {} finally { this.disabled = false; }
      });
    });
  },
  // 2. 评论折叠/展开
  initCommentToggle: function() {
    document.querySelectorAll('.comment-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const postId = this.dataset.postId;
        const commentEl = document.querySelector(`.comments[data-post-id="${postId}"]`);
        commentEl.classList.toggle('show');
        this.innerText = commentEl.classList.contains('show') ? '收起评论' : '评论';
        if (commentEl.classList.contains('show') && !commentEl.dataset.loaded) {
          this.loadComments(postId, commentEl);
          commentEl.dataset.loaded = 'true';
        }
      }.bind(this));
    });
  },
  loadComments: function(postId, el) {
    const list = el.querySelector('.comment-list');
    list.innerText = '加载中...';
    setTimeout(async () => {
      try {
        const comments = await ajax.get('api/comment.php',{action:'list',post_id:postId});
        list.innerHTML = comments.length ===0 ? '暂无评论，快来抢沙发~' : '';
        comments.forEach(c => {
          list.innerHTML += `<div class="comment-item"><div class="avatar"><img src="${c.avatar||'images/default-avatar.jpg'}"></div><div class="comment-content"><div class="username">${c.username}</div><div class="text">${c.content}</div></div></div>`;
        });
      } catch(e) { list.innerText = '加载失败'; }
    },800);
  },
  // 3. 搜索联想
  initSearchSuggest: function() {
    const input = document.getElementById('search-input');
    let suggestBox = null;
    input.addEventListener('input', async function() {
      const kw = this.value.trim();
      if (!kw) { suggestBox && suggestBox.remove(); return; }
      try {
        const res = await ajax.get('api/search.php',{action:'suggest',keyword:kw});
        if (!suggestBox) {
          suggestBox = document.createElement('div');
          suggestBox.style.cssText = 'position:absolute;top:50px;left:50%;transform:translateX(-50%);width:300px;background:#fff;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);z-index:999;max-height:200px;overflow:auto;';
          input.parentNode.appendChild(suggestBox);
        }
        suggestBox.innerHTML = '';
        res.forEach(item => {
          const div = document.createElement('div');
          div.style.padding = '10px 15px'; div.style.cursor = 'pointer';
          div.innerText = item.keyword;
          div.addEventListener('click', () => { input.value = item.keyword; suggestBox.remove(); });
          suggestBox.appendChild(div);
        });
      } catch(e) {}
    });
    document.addEventListener('click', e => { if (suggestBox && !input.contains(e.target) && !suggestBox.contains(e.target)) suggestBox.remove(); });
    document.getElementById('search-btn').addEventListener('click', () => {
      const kw = input.value.trim();
      kw ? window.location.href = `search.php?keyword=${kw}` : utils.showToast('请输入搜索关键词','error');
    });
    input.addEventListener('keydown', e => { e.key === 'Enter' && document.getElementById('search-btn').click(); });
  },
  // 4. 发布微博表单验证+抖动效果
  initPostForm: function() {
    const form = document.querySelector('.post-form');
    if (!form) return;
    const textarea = form.querySelector('textarea');
    form.querySelector('.submit-btn').addEventListener('click', async function() {
      const content = textarea.value.trim();
      if (utils.isEmpty(content)) {
        utils.showToast('微博内容不能为空','error');
        textarea.style.animation = 'shake 0.5s';
        setTimeout(() => textarea.style.animation = '',500);
        return;
      }
      this.disabled = true; this.innerText = '发布中...';
      try {
        await ajax.api.publishPost(content);
        utils.showToast('发布成功','success');
        textarea.value = '';
        setTimeout(() => window.location.reload(),1000);
      } catch(e) {} finally { this.disabled = false; this.innerText = '发布微博'; }
    });
  },
  // 初始化所有效果
  init: function() { this.initLikeAnimation(); this.initCommentToggle(); this.initSearchSuggest(); this.initPostForm(); }
};
// 页面加载完成后初始化
window.addEventListener('load', () => effects.init());
// 表单抖动动画
const style = document.createElement('style');
style.textContent = '@keyframes shake {0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-5px);}40%,80%{transform:translateX(5px);}}';
document.head.appendChild(style);