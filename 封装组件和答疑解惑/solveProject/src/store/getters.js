const getters = {
  // 购物车
  carts: state => state.cart.status,
  // 个人中心
  isLogin: state => state.isLogin,
  user: state => state.user,

}
export default getters
