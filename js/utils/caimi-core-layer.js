define(["jquery"], function(){
    /**
     * obj{
     *   tit  显示的字符
         description: 'Description of confirm.',
         accept: {
            label: '否',
            callback: function(){ alert("Yes!"); }
        },
        cancel: {
            label: '是',
            callback: function(){ alert("No!"); }
        }
     * @param obj
     */
    var handler = {
        confirmLayer: function (obj) {
            var init, showLayer, addEvent, hideLayer;
            init = function () {
                var oBox = $('#cLayer');

                if (oBox.length) {
                    oBox.show();
                } else {
                    $('body').append('<section id="cLayer"><div class="layer"><span class="point">提示</span><strong></strong><div class="chose"><span class="react cancel"></span><span class="react accept"></span></div></div></section>');

                }

                showLayer($('.layer'));
                addEvent(obj);

            };
            showLayer = function (obj) {
                obj.parent().show();
                obj.removeClass('an-hide').addClass('an-show');
            };
            hideLayer = function (obj) {
                obj.removeClass('an-show').addClass('an-hide');
                setTimeout(function () {
                    $('#cLayer').hide();
                }, 100);
            };
            addEvent = function (a) {
                var oStrong, oAccept, oCancel;
                oStrong = $('#cLayer strong');
                oAccept = $('#cLayer .accept');
                oCancel = $('#cLayer .cancel');
                oStrong.text(a.tit);
                oAccept.text(a.accept.label);
                oCancel.text(a.cancel.label);
                oAccept.off('touchend');
                oCancel.off('touchend');
                oAccept.on('touchend', function (ev) {

                    if (obj.accept.callBack) obj.accept.callBack.call($('#cLayer'));
                    ev.preventDefault();
                    ev.stopPropagation();

                });
                oCancel.on('touchend', function (ev) {
                    if (obj.cancel.callBack) obj.cancel.callBack.call(this);
                    ev.preventDefault();
                    hideLayer($('.layer'));
                });
                $('#cLayer').on('touchend', function () {
                    $(this).hide();
                });
                $('#cLayer').children().on('touchend', function (ev) {
                    ev.stopPropagation();
                });
            };
            init();
        },
        alert: function (str) {
            var a, b, c, d, e;
            a = function (a) {
                var oAlert = $('#alert');

                if (oAlert.length) {
                    oAlert.show();
                } else {
                    $('body').append('<section id="alert"><div class="alert"><span class="point">提示</span><p></p><div class="chose"><span class="react accept">知道了</span></div></div></section>');
                }
                d($('.alert'));
                b();
            };
            b = function () {
                $('#alert p').html(str);
                $('#alert .accept').one('touchend', function (ev) {
                    ev.stopPropagation();
                    e($('.alert'));

                });
                $('#alert').one('touchend', function (ev) {
                    e($('.alert'));
                    ev.stopPropagation();
                });
            };
            d = function (obj) {
                obj.parent().show();
                obj.removeClass('an-hide').addClass('an-show');
            };
            e = function (obj) {
                obj.removeClass('an-show').addClass('an-hide');
                setTimeout(function () {
                    $('#alert').hide();
                }, 100);
            };
            a();
        },
        error: function (str) {
            var timer = null;
            clearInterval(timer);

            function toHide() {
                //mask.hide();
                $('.error-layer').removeClass('show');
            }

            if (!$('.error-layer').length) {
                $('body').append('<div class="error-layer"></div>');
            } else {
                //mask.show()
            }
            $('.error-layer').html('<span>' + str + '</span>').addClass('show');
            timer = setTimeout(toHide, 1000);
//            //$(document).on('tap', function (ev) {
//                clearInterval(timer);
//                toHide();
//            });

        },
        layer: function (html) {
            var oLayer = $('#layer'),
                oBox = $('<div id="layer">');

            if (oLayer.length) {
                oLayer.show();
            } else {
                oBox.html(html);
                $('body').append(oBox);
            }
            $('#layer').on('touchend', function(){
                $(this).hide();
            });
            $('#layer').children().on('touchend', function(ev){
                ev.stopPropagation();
            });
        }
    }
    return handler;
});