export default {
  getSession: function (name) {
    // 加个判断体现逻辑的严谨性
    if (!name) return
    return window.sessionStorage.getItem(name)
  },
  setSession: function (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      // 将对象转换为字符串
      content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(name, content)
  },
  removeSession: function (name) {
    if (!name) return
    window.sessionStorage.removeItem(name)
  },
  getLocal: function (name) {
    if (!name) return
    return window.localStorage.getItem(name)
  },
  setLocal: function (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  removeLocal: function (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  }
}
