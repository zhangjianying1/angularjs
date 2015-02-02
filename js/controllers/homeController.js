/**
 * 控制器文件
 */

define(['./module', 'utils/caimi-version', 'libs/angular-touch'], function(module, version){


    module.controller('registerCtrl', function($scope, $http){
        $scope.data = {
            rightTips: '恭喜您注册成功，您的10元已发送至您的账号。<br/>请您下载客户端查收',
            rightShow: false,
            versionTips: version.iphone ? '<p>分享赢取<span>201.5</span>元红包大礼</p>' : '<p>分享赢取<span>201.5</span>元红包大礼</p><p>充<span>50</span>得<span>80</span></p>',
            btnText: '注册即送10元彩票'
        };
        var bBtn;
        $scope.toShow = function(){

            //如果是下载app
            if ($scope.data.btnText === '下载彩米APP') {
                location.href = 'http://www.baidu.com';
            } else {

                bBtn =  $scope.$broadcast('showLayer');
            }
        };
        $scope.toHide = function(){
            $scope.$broadcast('hideLayer');
        };

    });
    module.controller('tab', function($scope){
        var tab;
        $scope.tabBtns = true;
        $scope.tabBtns2 = false;
        tab = function(){
            $scope.tabBtns = !$scope.tabBtns;
            $scope.tabBtns2 = !$scope.tabBtns2;
        };
        $scope.tab = tab;
        $scope.$on('tabEvent', tab);
    });
    module.controller('exchargeCtrl', function($scope, $http, $location){

        if (version.iphone ) {

            if (location.href.indexOf('ios') < 0) {
                location.href = '/h5/templates/activitys/recharge-ios.html' + str;
            }

        }
        var bBtn = true;

        $scope.tips = {
            text: '您已成功兑换80元红包<br/>分享后还能继续抢红包哟',
            btnText: '我要兑换',
            disabled: false,
            iphoneBtn: false
        };

        //获取活动
        $http({ method: 'GET', url: '../../json/statuslist.json' }).success(function (data, status, headers, config) {

            if (data.code === '00003'){
                $scope.tips.disabled = true;
                $scope.tips.btnText = '我要参与';
                $scope.tips.text = '您已成功兑换80元红包';
            }
            $scope.toExcharge = function(){

                if (bBtn && !$scope.tips.disabled) {
                    bBtn = false;
                    $scope.tips.btnText = '请稍后...';
                    $http({
                        method: 'GET',
                        url: '../../json/login.json',
                        data: {id: data.msg}
                    }).success(function (data, status, headers, config) {

                        if (data.code === '0000') {

                            if (version.iphone ) {
                                $scope.tips.btnText = '成功兑换';
                                $scope.tips.iphoneBtn = true;
                            } else {
                                $scope.tips.btnText = '我要参与';
                            }

                            $scope.tips.text = '您已成功兑换80元红包';

                        } else if (data.code === '2009') {

                            //充值显示层
                            $scope.$broadcast('setData', {show: true, tit: '余额不足，请充值', 'cancelText': '取消', 'acceptText': '确定'});

                            $scope.$broadcast('accept', function(){
                                location.href = "icaimi:host:excaharge";
                                $scope.$broadcast('setData', {show: false});
                            });
                            $scope.tips.btnText = '我要兑换';
                            bBtn = true;
                        }
                    }).error(function(){
                        bBtn = true;
                    });;
                } else {
                    $scope.$broadcast('tabEvent');
                }

            };
        });


    });
    module.controller('showStatus', function($scope, $http){
        var newData = {};
        $scope.statusText = '请登录后查看此活动';
        $scope.extraAwardList = '';
        $scope.btnText = '点击领取';
        $http({
            method: 'GET',
            url: '../../json/statuslist.json'
        }).success(function(data){
            if (data.code === '0000') {
                if (!data.result.baseAward.amount) {
                    $scope.statusText = '亲，您还没邀请到小伙伴哟！'
                }
                if (data.result.baseAward.amount) {
                    $scope.statusText = '您已邀请<em>' + data.result.baseAward.userCode + '</em>位用户，获得<em>' + data.result.baseAward.amount + '</em>元的红包奖励'
                }
                newData = data.result.extraAwardList;

                for (var i = 0; i<newData.length; i++) {

                    if (newData[i].receiveStatus === '0') {
                        newData[i].text = '已领取';
                    }
                    if (newData[i].receiveStatus === '1') {
                        newData[i].text = '点击领取';
                    }
                    if (newData[i].receiveStatus === '2') {
                        newData[i].text = '未完成';
                    }
                }
                $scope.extraAwardList = newData;
            }
        });

        $scope.topartake = function(index){

            if ($scope.extraAwardList[index].receiveStatus === '1') {
                $http({
                    method: 'GET',
                    url: '../../json/statuslist.json',
                    data: {
                        id: newData[index].shareExtraId
                    }
                }).success(function(data){
                    if (data.code === '0000') {
                        $scope.extraAwardList[index].text = '已领取';
                        $scope.extraAwardList[index].receiveStatus = '0';
                    }
                });
            }

        };
    });

    //中奖分享
    module.controller('rewordCtrl', function($scope, $http){
        $scope.statusText = '请登录后查看此活动';
        $http({
            method: 'GET',
            url: '../../json/statuslist.json'
        }).success(function(data){
            if (data.code === '0000') {
                if (!data.result.baseAward.amount) {
                    $scope.statusText = '亲，您还没邀请到小伙伴哟！'
                }
                if (data.result.baseAward.amount) {
                    $scope.statusText = '您已邀请<em>' + data.result.baseAward.userCode + '</em>位用户，获得<em>' + data.result.baseAward.amount + '</em>元的红包奖励'
                }

            }
        });
    });
});