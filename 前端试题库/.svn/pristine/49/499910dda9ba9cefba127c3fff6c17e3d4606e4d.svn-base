/**
 * Created by wuwg on 2016/11/9 0009.
 */



var  myApp=angular.module('myApp',[]);

myApp.run(function ($rootScope) {
    $rootScope.sfz='410381199211207362';
});

myApp.controller('sfz',function ($rootScope,$scope) {
    $scope.sfz='410381199211207362';
});

myApp.filter('sfzEncode',function(){
    return function (input,param1,param2) {
        var  _input=input, param1=param1?param1:'*',param2=param2?param2:8,_symbol='';
		for(var i=0,_len=param2.length; i<param2; i++){
			_symbol+=param1;
		}
        return   _input.replace(_input.substr(6,param2),_symbol);
    }
});


myApp.directive('appSfz',function(){
    return {
        restrict :"ECMA",
        replace:false,
        scope:{
            sfz:'=',
            param1:'=',
            param2:'=',
        },
        link: function ($scope,$element,$attr,$controller) {
            function sfzEncode(input,param1,param2) {
                var  _input=input, param1=param1?param1:'*',param2=param2?param2:8,_symbol='';
				for(var i=0,_len=param2.length; i<param2; i++){
					_symbol+=param1;
				}
                 return   _input.replace(_input.substr(6,param2),_symbol);
            }
            $scope.sfz=sfzEncode($scope.sfz,$scope.param1,$scope.param2);
            $element[0].innerHTML=$scope.sfz;
        }
    }
});

angular.bootstrap(document,['myApp']);