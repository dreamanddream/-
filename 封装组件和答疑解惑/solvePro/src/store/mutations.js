
const cartArr =[];
const addressArr = [];
const matutaions = {
	/*商品详情*/
	[types.SET_GOODS](state,goods){
		state.goods = goods;
  },
  // set_goods:
  set_goods(state, val) {
    state.indexActive = val
    // cache.setSession('index_Active', val)
},
}
 export default matutaions
