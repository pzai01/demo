define(function (require) {
    require('jquery');

    //天气预报
    var weatherAPI=require('weather');
    weatherAPI.update_weather();

    //设置背景皮肤
    var skinManageAPI=require('skinManage');
    skinManageAPI.skinLoad();

    //用户信息、“设置”导航的菜单显示
    $(".pf,.pfmenu").hover(function() {
        $('.pfmenu').show();
    },function(){
        $('.pfmenu').hide();
    });
    $(".lb,.lbmenu").hover(function() {
        $('.lbmenu').show();
    },function(){
        $('.lbmenu').hide();
    });

    //“更多产品”菜单显示
    $(".bri,.brimenu").hover(function() {
        $('.brimenu').slideDown();
    },function(){
        $('.brimenu').slideUp();
    });

    //信息栏选项切换

    $('.info-tab-2 li').each(function(index){
        $(this).bind('click', function () {
            $('.info-tab-2 li.info-tabin').removeClass('info-tabin');
            $(this).addClass('info-tabin');
            $('.info-content>div').hide();
            $('.content-'+index).show();
        });
    });

    $('.info-tab-1 li').each(function(index){
        $(this).bind('click', function () {
            $('.info-tab-1 li,.info-tab-2 li').removeClass('info-tabin');
            $(this).addClass('info-tabin');
            $('.info-tab-2 li').eq(index).addClass('info-tabin');
            $(window).scrollTop(0);
            $('.info-content>div').hide();
            $('.content-'+index).show();
        });
    });


});