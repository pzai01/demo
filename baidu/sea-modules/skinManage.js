
//皮肤管理
define(function(require,exports,module){
    require("jquery");

    exports.skinLoad= function(){

        //加载图片
        $('.skin-tab>li').each(function(index,element){
            $(this).on('click', function () {
                $('.skin-tab li.tabin').removeClass('tabin');
                $(this).addClass('tabin');
                for(var i=0;i<12;i++){
                    $('.skin-img-box li.pos-'+i+' img').attr('src','./img/tab'+index+'-pos'+i+'.jpg');
                }
            });
        });
        //初始化皮肤
        var initializeFun=function(){
            if (localStorage.length!= 0) {
                $('#header').css('background-color','rgba(172,160,169,0.6)');
                $('.menu-left,#nav').find('a').css('color','#fff');
                $('.wrap-pc').css({'background-image': 'url(' + localStorage.bgSkinSrc + ')'});
                $('.skin-preview-img').attr('src', localStorage.bgSkinSrc);
                $('.logo').attr('src', localStorage.logoSrc);
                $('.input').css('border', localStorage.inputCSS);
                $('input[type="submit"].submit').css({
                    'border': localStorage.submitBorder,
                    'background': localStorage.sumbitBg,
                    'color': localStorage.sumbitColor
                });
                $('#footer').css('color',localStorage.footerTextColor);
                $('#footer a').css('color',localStorage.footeraColor
                );
            } else {
                $('.wrap-pc').css('background-image', '');
                $('.skin-preview-img').attr('src', '');
                $('.logo').attr('src', './img/bd_logo1_31bdc765.png');
                $('.input').css('border', '1px solid #B8B8B8');
                $('input[type="submit"].submit').css({
                    'border': '1px solid #2D78F4',
                    'background': '#3385FF',
                    'color': '#fff'
                });
                $('#footer').css('color','#999');
                $('#footer a').css('color','#999');

            }
        };
        setTimeout(initializeFun,0);//立即执行初始化函数

        //皮肤选择与预览
        $('.skin-img-box li img').hover(function(){
            //触发光标移动到元素上的事件，图片切换为光标悬停的皮肤图片
            $('.skin-preview-img').attr('src',$(this).attr('src'));
        },function(){
            //触发光标离开元素的事件，图片切换为当前背景皮肤
            $('.skin-preview-img').attr('src',localStorage.bgSkinSrc);
            if(localStorage.bgSkinSrc==undefined){
                $('.skin-preview-img').attr('src','');
            }
        }).bind('click',function(){
            //切换皮肤
            localStorage.bgSkinSrc=$(this).attr('src');
            localStorage.logoSrc='./img/logo_white.png';
            localStorage.inputCSS='1px solid #fff';
            localStorage.submitBorder='1px solid #e6e6e6';
            localStorage.sumbitBg= '#e6e6e6';
            localStorage.sumbitColor= '#000';
            localStorage.footerTextColor="#fff";
            localStorage.footeraColor="#fff";
            initializeFun();
        });

        //打开收起皮肤盒子
        $('.update-bgSkin').click(function(){
            $('.skin-box').slideDown(500);
        });

        $('.shouqili,#content').click(function(){
            $('.skin-box').slideUp(500);
        });
        $('#content').click(function(){
            $('.skin-box').slideUp(500);
        });

        //不使用换肤
        $('.closeli').click(function () {
            localStorage.clear();
            initializeFun();
        });

    };


});