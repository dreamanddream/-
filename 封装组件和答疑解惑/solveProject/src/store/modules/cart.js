const cartArr = []

const cart = {
  state:{
    carts:[{"CategoryId":"1","GoodsName":"默认商品","GoodsPrice":9,"GoodsNum":1,"GoodsImage":"./static/img/github.png"}], //购物车默认商品
  },
  mutations:{
    setCarts(state,carts){
      cartArr.push(carts);
      state.carts = cartArr;
    },
  }
}

export default cart;
