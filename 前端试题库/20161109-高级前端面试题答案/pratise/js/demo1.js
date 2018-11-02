/**
 * Created by wuwg on 2016/11/8 0008.
 */
/**
 * @author         wuwg
 * @param obj      检索的对象  （必须）
 * @param target   检索的目标   （必须）
 * @param objName  检索对象的名称 （必须）
 * @returns {*}
 */
 
var findTarget= (function(func){
	return  function(obj,target,objName){   
			// 声明返回的对象， 默认的关联url路径，和执行的查询的函数
			var  _returnObj=[],_connect='',_func=func;   
				_func(obj,target,objName,_connect,_returnObj,_func);
		return _returnObj;
	}	
 })(

 /**
 * @function       		 匿名查询函数
 * @param obj     		 检索的对象  （必须）
 * @param target  		 检索的目标   （必须）
 * @param objName  		 检索对象的名称 （必须）
 * @param connect 		 urlf关联 
 * @param _returnObj     返回值 
 * @param func     		 作为参数传递的函数 
 * @returns {*}
 */

 function (obj,target,objName,connect,_returnObj,func){  
		var  _connect=connect;
		var  _func=func;
	    for(var _name in obj ){
		   if(obj[_name]===target){	 
				// 添加到返回的结果总去
				_returnObj.push({
					url: objName+_connect+'.'+_name,
					value:target,
					obj:obj	
				});
			}else if(typeof  obj[_name] =='object') {
					//  执行下一次循环
					func( obj[_name] ,target,objName,(_connect+('.'+_name)),_returnObj,  _func)
			}else {
				//  不管
			}	   
	   } 
 });
 
 
 
/***************************************
 *
 *  实际运用
 *
**************************************/
var targetObj = {
	a : {
		b : {
			c : {
				d : {
					e : {
						name : '百度'
					}
				},
				l : {
					name : '北京华宇信息技术有限公司'
				}
			}
		},
		d : '90',
		e : '90',
		l : {
			name : '北京华宇信息技术有限公司',
			a : {
				b : {
					c : {
						version : '1.0.0.1',
						name : '北京华宇信息技术有限公司'
					}
				}

			}
		}
	},
	a2 : {
		name : '北京华宇信息技术有限公司',
		update : '2016-11-04'
	},
	a3 : {
		k : {
			l : {
				name : '阿里'
			}
		}
	}
};
var  target=findTarget(targetObj,'北京华宇信息技术有限公司','targetObj');
for(var  i=0,_len=target.length; i<_len; i++){
	 console.log('第'+(i+1)+'个值')	
	 console.log('目标值的引用地址为：---'+target[i].url)
     console.log('引用地址对应的值为：---'+target[i].value)
     console.log('目标值所在的对象为：---')
     console.log(target[i].obj)
	 console.log('\n')
}
console.log('当前对象存在'+_len+'个"--北京华宇信息技术有限公司"')
	
for(var  i=0,_len=target.length; i<_len; i++){
	document.writeln('第'+(i+1)+'个值')	
	document.writeln('<br />')
	document.writeln('目标值的引用地址为：---<span style="color:red;">'+target[i].url+'</span>')
	document.writeln('<br />')
	document.writeln('引用地址对应的值为：---'+target[i].value)
	document.writeln('<br />')
	document.writeln('目标值所在的对象为：---'+JSON.stringify(target[i].obj))
	document.writeln('<br />')
	document.writeln('<br />')
	document.writeln('<br />')
}
document.writeln('当前对象存在'+_len+'个值')



