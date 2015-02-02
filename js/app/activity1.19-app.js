
require.config({
    baseUrl: "/h5/dist",
    paths: {
        zepto: "libs/zepto.min",
        jquery: "libs/jquery-2.1.3.min"
    }
});

define(["jquery", "utils/caimi-core-ajax", "utils/caimi-core-layer", "utils/caimi-core-url", "utils/caimi-core-form", "utils/caimi-imgload"], function($, ajax, layer, url, form, imgload){


    var sendRegister = (function(){
        var handler = {},
            inputData = {},
            oInput,
            oSendBtn,
            oCode,
            oFormBtn,
            sVer =  ajax.version;
        /* 验证输入框 */
        var velidate = form.validator();
        velidate.config = {
            isPhone: 'isPhone',
            isCode: 'isCode'
        };
        velidate.type = {
            isPhone: {
                validate: function(obj) {
                    var val = obj.val(), data = {}, re =  /^1[3456789]\d{9}$/;
                    data.obj = obj;
                    if (re.test(val)) {
                        data.bBtn = true;
                        inputData.mobile = val;
                    } else {
                        data.bBtn = false;
                        data.msg = this.msg[1];
                    }
                    return data;
                },
                msg: ['亲，手机号不能为空哦~', '亲，手机号输入不正确哦']
            },
            isCode: {
                validate: function(obj) {
                    var val = obj.val(), data = {}, re = /^[0-9]{6}$/;
                    data.obj = obj;
                    if (re.test(val)) {
                        data.bBtn = true;
                        inputData.code = val;
                    } else {
                        data.bBtn = false;
                        data.msg = this.msg[1];
                    }
                    return data;
                },
                msg: ['亲，验证码不能为空哦~', '亲，验证码输入不正确哦']
            }
        };
        handler = {
           init: function(){
               var send, againSend, velCode, bBtn = true;

               oInput = $('.tag-phone input'),
               oSendBtn = $('.send-btn'),
               oCode = $(' .tag-code input'),
               oFormBtn = $('.sub-form');



               /* 发送验证码 */
               send = function (ev){
                  var msg = velidate.validate({isPhone: oInput});
                  ev.stopPropagation();
                   if (!msg){
                       if (bBtn) {
                           againSend();

                           //获取验证码
                           ajax.post(url.mobile, inputData, function(data){

                               if (data.code === '0000') {
                                   handler.error();
                               } else if (data.code === '1016') {   //已存在的用户
                                   data.msg = '您已注册过<br/>请立即下载客户端参与活动';

                                   handler.showStatus(1, data.msg);
//                                   require(['utils/caimi-core-layer'], function(ajax){
//                                       var oP = $('.receive p');
//                                       ajax.alert(oP.html());
//                                   });

                               } else {
                                   handler.error(data.msg);
                               }
                           });
                       }
                   } else {
                       handler.error(msg.msg);
                   }
               };

               oSendBtn.on('touchend click', send);

               /* 再次发送验证码 */
               againSend = function() {
                    var timer = null,
                        time = 60;

                   bBtn = false;
                   setBtn();
                   timer = setInterval(function(){

                       time --;
                       setBtn();

                       if (time === 0) {
                           clearInterval(timer);
                           oSendBtn.html('发送验证码');
                           bBtn = true;
                       }


                   }, 1000);

                   function setBtn(){
                       oSendBtn.html(time + '秒').removeClass('active');
                   }

               };

               /* 提交注册 */
               handler.subPhone();
           },
           subPhone: function(){
               var bBtn = true, subPhone;


               subPhone = function(){
                   var msg = velidate.validate({isPhone: oInput, isCode: oCode});
                   inputData.pid = $('.register input').eq(0).val();
                   inputData.shareUserId = $('.register input').eq(1).val();

                   if (!msg) {

                       if (bBtn) {
                           bBtn = false;

                           //注册并领取奖励
                           ajax.post(url.register, inputData, function(data){


                               if (data.code === '0000') {
                                   handler.showStatus(1);
//                                   require(['utils/caimi-core-layer'], function(ajax){
//                                       var oP = $('.receive p');
//                                       ajax.alert(oP.html());
//                                   });
                               } else {
                                   handler.error(data.msg);
                                   bBtn = true;
                               }
                           });
                       }
                   } else {
                       handler.error(msg.msg);
                   }
               };
               oFormBtn.on('touchend click', subPhone);
           },
           downloadApp: function(){
               var oBtn = $('.receive-btn');

               oBtn.on('touchend click', function(ev){
                   ev.preventDefault();
                   ev.stopPropagation();
                   if (sVer.android) {
                       location.href = "http://fusion.qq.com/cgi-bin/qzapps/unified_jump?appid=11270323";
                   } else {
                       if (sVer.weixin) {
                           handler.addImg();
                           location.hash = 'over';

                       } else{
                           location.href = 'https://itunes.apple.com/cn/app/cai-mi-cai-piao/id946737222?mt=8';
                       }

                   }
                });
           },
           addImg: function(){
               var oLayer = $('#iosLayer');

               if (oLayer.length) {
                   oLayer.show();
               } else {
                   $('body').append('<div id=\"iosLayer\"><img src=\"\/h5\/images\/activitys\/ios-downlod.png\" \/><\/div>');
               }

               $('#iosLayer').on('touchend', function(){
                   $(this).hide();
               });
           },
           showStatus: function(iNow, str){
               var oP = $('.receive p'),
                   oDownBtn = $('.receive-btn'),
                   oShowBtn = $('.btn_zclq');

               oDownBtn.show();
               oShowBtn.hide();
               oP.show();
               if (str) {
                 oP.html(str)
               }

               setTimeout(function(){
                   $('#layer').hide();
                   handler.downloadApp();
               },300);
           },
           error: function(str){
               var oError = $('.error-tips');
               if (str) {
                   oError.html(str);
               } else {
                   oError.html('');
               }

           }
       }
       return handler;
    }());

    var showLayer = (function(){
        return {
            init: function(){

                /* 加载完成 */
                imgload.imgLoad($('img[_src]').get(), function(){
                    $('.loading').hide().next().show();
                });


                $('.btn_zclq').on('touchend click', function(ev){
                    ev.preventDefault();
                    imgload.imgLoad($('textarea[_s]').get(), function(){
                        setTimeout(function(){
                            layer.layer($('#templ').val());
                            sendRegister.init();
                        }, 200);

                    });

                });

                !(function (){
                    var hash = location.hash;

                    if (hash.indexOf('over') > -1) {
                        sendRegister.showStatus(1);
                        sendRegister.downloadApp(1);
                    }
                }());
            }
        };
    }());
    showLayer.init();
});