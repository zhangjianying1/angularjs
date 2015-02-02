define(function(){
    /**
     * 判断用户是否登录->主要是在客户端里的h5页面做这个判断
     * @type {{getData: getData}}
     */

    var handler = {
        getData: function(){
            var str, arr, arr2, oData;
            str = document.location.search.substring(1);//'machId=0&platform=01&sid=80003&softVer=v1.3.0&sysVer=android4.0&userCode=20141027172548768161';

            if (str) {
                arr = str.split('&');
                arr2 = [];
                oData = {};
                $.each(arr, function (i) {
                    arr2 = arr[i].split('=');
                    oData[arr2[0]] = arr2[1];
                });
            }
            //alert(str)
            try{
                //document.querySelector('.recharge-rule').innerHTML = str;
            } catch(e) {

            }

            return oData;
        }
    };

    return handler;
});