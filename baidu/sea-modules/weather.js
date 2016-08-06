//百度首页天气预报模块

define(function(require, exports) {
    require('jquery');

    exports.update_weather=function(){
        var  url = "../city-weather.php";
        $.getJSON(url, function (data) {
            $(".currentCity").text(data.city+"：");
            $(".weather-img").attr("src",data.current.img_src);
            $(".tmp").text(data.current.tmp);
            $(".qlty").text(data.current.qlty);
            $(".aqi").text(data.current.aqi);
            $('.date').text(data.date);
            for(var i=0;i<5;i++){
                $('.week-'+i).text(data.future.week[i]);
                $('.weather-icon-'+i).html("<img src="+data.future.img[i]+">");
                $('.tmp-'+i).text(data.future.tmp[i]);
                $('.cond-text-'+i).text(data.future.cond_text[i]);
                $('.wind-'+i).text(data.future.wind[i]);
            }
        });
        setTimeout('update_weather()',1000*30*60);
    }

});

