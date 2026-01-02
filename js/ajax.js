const ajax = {
  request: function(url, method = 'GET', data = {}) {
    // 返回Promise对象，支持异步操作
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); // 创建AJAX对象

      // 处理GET请求参数（拼接在URL后）
      if (method.toUpperCase() === 'GET' && Object.keys(data).length > 0) {
        const params = new URLSearchParams(data).toString();
        url = `${url}?${params}`;
      }

      xhr.open(method, url, true); // 初始化请求

      if (method.toUpperCase() === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }

      
      xhr.onreadystatechange = function() {
        // 请求完成且响应就绪（状态码4）
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) { // 成功状态码（200-299）
            try {
              // 解析JSON响应（后端返回JSON格式数据）
              const response = JSON.parse(xhr.responseText);
              if (response.code === 200) { // 后端自定义成功码
                resolve(response.data); // 成功：返回数据
              } else {
                // 后端返回错误（如参数错误、未登录）
                utils.showToast(response.msg, 'error');
                reject(response.msg);
              }
            } catch (e) {
              utils.showToast('服务器响应格式错误', 'error');
              reject('解析错误');
            }
          } else {
            // 网络错误或服务器错误（如404、500）
            utils.showToast(`请求失败：${xhr.status}`, 'error');
            reject(`状态码：${xhr.status}`);
          }
        }
      };

      // 监听网络错误
      xhr.onerror = function() {
        utils.showToast('网络错误，请检查连接', 'error');
        reject('网络错误');
      };

      // 发送请求（POST请求需要传参）
      if (method.toUpperCase() === 'POST') {
        const params = new URLSearchParams(data).toString();
        xhr.send(params);
      } else {
        xhr.send();
      }
    });
  },

  // GET请求快捷方法
  get: function(url, data = {}) {
    return this.request(url, 'GET', data);
  },

  // POST请求快捷方法
  post: function(url, data = {}) {
    return this.request(url, 'POST', data);
  },

  api: {
    // 1. 发布微博
    publishPost: function(content, image = '') {
      return ajax.post('api/post.php', {
        action: 'publish',
        content: content,
        image: image
      });
    },

    // 2. 点赞/取消点赞
    toggleLike: function(postId) {
      return ajax.post('api/like.php', {
        action: 'toggle',
        post_id: postId
      });
    },

    // 3. 发布评论
    publishComment: function(postId, content) {
      return ajax.post('api/comment.php', {
        action: 'publish',
        post_id: postId,
        content: content
      });
    },

    // 4. 搜索微博
    searchPosts: function(keyword) {
      return ajax.get('api/post.php', {
        action: 'search',
        keyword: keyword
      });
    },

    // 5. 获取微博列表
    getPostList: function() {
      return ajax.get('api/post.php', { action: 'list' });
    }
  }
};