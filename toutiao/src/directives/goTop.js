// 点击滚动到顶部
export default function goTop(el, eventType, vm) {
  if(eventType === "click") {
    document.getElementById(el).addEventListener("click",function(){
      console.log("我是返回顶部")
    },false)
  }
}
