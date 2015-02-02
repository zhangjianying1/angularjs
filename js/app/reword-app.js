
require.config({
    baseUrl: "../../dist",
    paths: {
        zepto: "libs/zepto.min",
        jquery: "libs/jquery-2.1.3.min"
    }
});


define(["jquery", "utils/caimi-imgload", "utils/caimi-core-url"], function($, imgload, url){
    var activityId;

    //load end 显示页面
    var showLayer = (function(){
        return {
            init: function(){
                /* 加载完成 */
                imgload.imgLoad($('img[_src]').get(), function(){
                    $('.loading').hide().next().show();
                });


            }
        };
    }());
    showLayer.init();


    //领取奖励
    var reword = (function(){
        var handler = {
            oData: {
                bBtn: true
            },
            init: function(){
                require(['utils/caimi-core-ajax'], function(ajax){
                    //获取奖励详情
                    ajax.post(url.awardDetail, {userCode: ajax.loginStatus.userCode, privateKey: ajax.loginStatus.id, shareType: 'bonus'}, function(data){

                        if (data.code === '0000') {

                            try {
                                if (! ajax.loginStatus.userCode) {
                                    data.result.baseAward.userCount = -1;
                                }

                            } catch (e) {

                            }

                            handler.showList(data.result);

                        }
                    })
                });

            },
            showList: function(data){
                var tel2 = template('base', data.baseAward);
                $('.show-base-reword').html(tel2);
            }
        };
        return handler;
    }());
    reword.init();

    return {
        reword: reword.init
    }
});
