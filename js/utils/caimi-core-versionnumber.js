define(["utils/caimi-core-islogin", "utils/caimi-version"], function(islogin, version){
    var data = {
            iphone: 0,
            android: 0
        },
        data2 = islogin.getData(),
        sVer = version,
        isLow;

    isLow = function () {
        var bBtn = false, sVal;

        if (data2.softVer) {
            sVal = parseFloat(data2.softVer.substring(1));

            for(var i in sVer) {

                if (sVal < data[i]) {
                    bBtn = true;
                }
            }
        }
        return bBtn;
    };
    return {
        isLow: isLow,
        version: sVer,
        loginStatus: data2
    }
});