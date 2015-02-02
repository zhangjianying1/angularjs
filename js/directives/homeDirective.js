define(['./module'], function(module){

    //图片加载
    module.directive('loading', function($document, $http){
        return {
            restrict: 'E',
            require: '^?img',
            replace: true,
            template: '<div class="loading" ></div>'
        }
    }).directive('layer', function($document){
        return {
            restrict: 'AE',
            transclude: true,
            template: '<section id="cLayer" ng-show="data.show" ng-click="hide()"><div class="layer" ng-click="show($event)"><span class="point">提示</span><strong ng-bind="data.tit"></strong><div class="chose"><span class="react cancel" ng-bind="data.cancelText" ng-click="hide($event)"></span><span class="react accept" ng-bind="data.acceptText" ng-click="accept($event)"></span></div></div></section>',
            link: function($scope){
                $scope.data = {
                    show: false,
                    tit: 'fdfsdf',
                    cancelText: '取消',
                    acceptText: '确定'
                };
                $scope.$on('setData', function(e, data){
                    $scope.data = data;
                });
                $scope.$on('accept', function(e, fn){
                    $scope.accept = function($event){
                        $event.stopPropagation();
                        fn();
                    };

                });
                $scope.hide = function($event){
                    $event.stopPropagation();
                    $scope.data.show = false;
                }
                $scope.show = function($event){
                    $event.stopPropagation();
                    $scope.data.show = true;
                }
            }

        }
    }).directive('register', function($document, $http, $timeout){
        return {
            restrict: 'AE',
            transclude: true,
            controller: function($scope){
                $scope.data = {
                    show: false,
                    btnText: '发送验证码',
                    btnText2: '领取奖励',
                    error: ''
                };
                $scope.sendData = {
                    mobile: '',
                    code: ''
                };
                var oImg = new Image();
                oImg.src = $scope.imgsrc;
                $scope.stopPropagation = function($event){
                    $event.stopPropagation();
                };
                $scope.$on('showLayer', function(){
                    $scope.data.show = true;
                });
                $scope.$on('hideLayer', function(){
                    $scope.data.show = false;
                });
            },
            scope: {
                imgsrc: '@',
                bbtn: '='
            },
            template: '<div id="layer" ng-show="data.show"><div class="register" ng-click="stopPropagation($event)"><div class="input-tag tag-phone">' +
                '<input type="number" ng-model="sendData.mobile" placeholder="输入手机号" maxlength="11" autocomplete="off" name="mobile"  /></div>' +
                '<div class="input-tag tag-code">' +
                '<input type="number" placeholder="输入验证码" maxlength="6" ng-model="sendData.code" value="" autocomplete="off"name="code"  />' +
                '<a class="send-btn" ng-bind="data.btnText" ng-click="sendCode($event)"></a></div>' +
                '<div class="error-tips" ng-bind-html="data.error | trustHtml"></div><div class="sub-box">' +
                '<input type="submit" value="领取奖励" ng-click="subRegister()" ng-model="data.btnText2" class="sub-form" /></div></div></div>',
            link: function(scope, ele, attrs){
                scope.sendCode = function($event){
                    $event.stopPropagation();
                    var re = velidatePhone();

                    if (re === true) {
                        scope.data.error = '';

                        if (scope.data.btnText == '发送验证码'){
                            $http({
                                methood: 'GET',
                                url: '../../json/login.json?v3',
                                data: scope.sendData.mobile
                            }).success(function(data, status){
                                if (data.code === '0000') {
                                    $timeout(countDown, 1000);
                                }
                            });
                        }
                    } else {
                        scope.data.error = re;
                    }

                };
                var velidatePhone = function(){
                    var re = /^1[3456789]\d{9}$/,
                        re2 = /\S/;
                    //为空
                    if (!re2.test(scope.sendData.mobile)) {
                        return '亲，手机号不能为空哦';
                    } else {
                        if (re.test(scope.sendData.mobile)) {
                            return true;
                        } else {
                            return '亲，手机号不正确哦';
                        }
                    }
                };
                var velidateCode = function(){
                    var re = /^[0-9]{6}$/,
                        re2 = /\S/;
                    //为空
                    if (!re2.test(scope.sendData.code)) {
                        return '亲，验证码不能为空哦';
                    } else {
                        if (re.test(scope.sendData.code)) {
                            return true;
                        } else {
                            return '亲，验证码不正确哦';
                        }
                    }
                };
                var countDown = (function(){
                    var time = 60;

                    return function(){
                        time --;
                        if (time === 0) {
                            $timeout.cancel();
                            scope.data.btnText = '发送验证码';
                            time = 60;
                            return;
                        } else {
                            scope.data.btnText = time + '秒';
                        }
                        $timeout(countDown, 1000);
                    }
                }());
                scope.subRegister = function(){
                    var re = velidatePhone();
                    var re2 = velidateCode();

                    if (re !== true) {
                        scope.data.error = re;
                    } else if (re2 !== true) {
                        scope.data.error = re2;
                    } else {

                        if (scope.data.error) {
                            scope.data.error = '';
                            $http({
                                method: 'GET',
                                url: '../../json/login.json',
                                data: scope.sendData
                            }).success(function(data, status){

                                if (data.code === '0000') {
                                    scope.data.error = '<span></span>';
                                    scope.data.show = false;
                                    scope.bbtn = '下载彩米APP';
                                }
                            });
                        }
                    }
                }
            }
        }

    });
});