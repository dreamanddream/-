/**
 * Created by wuwg on 2016/11/8 0008.
 */

// 最优方案
/**
 * @param flag
 * @returns {*}
 */
Array.prototype.getMaxOrMin1= function (flag) {
    return  (flag? Math.max.apply(null,this):    Math.min.apply(null,this))
};

// 运用 sort 排序的方法
/**
 * @param flag
 * @returns {*}
 */
Array.prototype.getMaxOrMin2= function (flag) {
    this.sort(function (a,b) {
        return   (a-b>0?1:-1)
    });
    return  (flag?this[this.length-1]:this[0]);
};
// 运用 for 循环
/**
 * @param flag
 * @returns {*}
 */
Array.prototype.getMaxOrMin3= function (flag) {
    var  maxValue=this[0];
    var  minValue=this[0];
    for(var i= 1,len=this.length; i<len; i++){
        maxValue= this[i]>=maxValue?this[i]:maxValue;
        minValue= this[i]<=minValue?this[i]:minValue;
    }
    return  (flag?maxValue:minValue);
};




/***************************************
 *
 *  实际运用
 *
 **************************************/
var   _array=[20,60,900,[200,300,500,1200],56,30,50,90];
// 过滤数组套数组的情况
_array=_array.join(',').split(',');
for(var i= 0,_len=_array.length; i<_len; i++){
    _array[i]=parseInt(_array[i])
}

document.writeln('数组对象：'+ JSON.stringify(_array));
/**
 * 获取最大值
 * */
console.log('最大值')
console.log(  _array.getMaxOrMin1(true))
console.log( _array.getMaxOrMin2(true))
console.log(  _array.getMaxOrMin3(true))
document.writeln('<br />')
document.writeln('<br />')
document.writeln('<br />')
document.writeln('最大值getMaxOrMin1（）方法---<span style="color:red;">'+ _array.getMaxOrMin1(true)+'</span>')
document.writeln('<br />')
document.writeln('最大值getMaxOrMin2（）方法---<span style="color:red;">'+ _array.getMaxOrMin1(true)+'</span>')
document.writeln('<br />')
document.writeln('最大值getMaxOrMin3（）方法---<span style="color:red;">'+ _array.getMaxOrMin1(true)+'</span>')
document.writeln('<br />')
document.writeln('<br />')
document.writeln('<br />')

/**
 * 获取最小值
 * */
console.log('最小值')
console.log(  _array.getMaxOrMin1(false))
console.log( _array.getMaxOrMin2(false))
console.log(  _array.getMaxOrMin3(false))

document.writeln('最小值getMaxOrMin1（）方法---<span style="color:red;">'+ _array.getMaxOrMin1(false)+'</span>')
document.writeln('<br />')
document.writeln('最小值getMaxOrMin2（）方法---<span style="color:red;">'+ _array.getMaxOrMin1(false)+'</span>')
document.writeln('<br />')
document.writeln('最小值getMaxOrMin3（）方法---<span style="color:red;">'+ _array.getMaxOrMin1(false)+'</span>')
document.writeln('<br />')


