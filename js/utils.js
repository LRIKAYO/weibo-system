const utils = {
  // 验证是否为空
  isEmpty: function(value) { return value.trim() === ''; },
  // 时间格式化
  formatTime: function(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    const hour = String(date.getHours()).padStart(2,'0');
    const minute = String(date.getMinutes()).padStart(2,'0');
    const second = String(date.getSeconds()).padStart(2,'0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  },
  // 提示框（成功/错误/信息）
  showToast: function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:10px 20px;border-radius:20px;color:#fff;z-index:9999;opacity:0;transition:opacity 0.3s,transform 0.3s;';
    toast.innerText = message;
    toast.style.backgroundColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#e6162d' : '#333';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '1'; },10);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { document.body.removeChild(toast); },300);
    },3000);
  },
  // 获取URL参数
  getUrlParam: function(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const res = window.location.search.substr(1).match(reg);
    return res ? decodeURIComponent(res[2]) : null;
  }
};