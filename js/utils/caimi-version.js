define(function(){
    var userAgent = window.navigator.userAgent.toLowerCase();
    return (function(){
            var data = {};

            if (userAgent.indexOf('iphone') > -1) {
                data.iphone = true;
            }
            if (userAgent.indexOf('android') > -1) {
                data.android = true;
            }
            if (userAgent.indexOf('micromessenger') > -1) {
                data.weixin = true;
            }
            return data;
        }());
});