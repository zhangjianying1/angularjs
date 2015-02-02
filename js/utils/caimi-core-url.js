var b = true,
    str = 'http://192.168.0.253:8080';
define({
    mobile: b ? "/userController/mobileCode" : "/json/login.json",   //手机注册
    joinExchange: b ? "/taskController/joinExchange": "/json/login.json",  //活动参与兑换（50送80）
    activitylist: b ? "/taskController/listExchange": "/json/login.json",  //活动列表参数（50送80）
    awardDetail: b ? "/share/awardDetail": "/json/login.json",  //分享奖励领取信息列表
    receiveAward: b ? "/share/receiveAward": "/json/login.json",  //分享奖励领取接口）
    register: b ? "/userController/trackRegister" : "/json/login.json" //

});