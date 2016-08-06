<?php

header("Content-type:text/html;charset=utf-8");

//返回数据
$response=array();
//获取城市
$location_url='http://api.map.baidu.com/location/ip?ak=GuEGefiskDC8GZzGv0UpkfrQGP0vEkoq';
$location_response = file_get_contents($location_url);
$location_response = json_decode($location_response,true);
$city=$location_response['content']["address_detail"]['city'];
$city=mb_substr($city, 0, -1, 'utf-8');
$response["city"]=urlencode($city."");


//获取天气
$weather_url="https://api.heweather.com/x3/weather?city=".$city."&key=edd4f925f8d94c2897b5292138075962";
$weather_response=file_get_contents($weather_url);
$weather_response=json_decode($weather_response,true);
//实况天气
//1.天气状态图片
$code=$weather_response["HeWeather data service 3.0"][0]["now"]["cond"]["code"];
$img_src="http://files.heweather.com/cond_icon/".$code.".png";

//2.温度
$tmp=$weather_response["HeWeather data service 3.0"][0]["now"]["tmp"]."℃";
//3.空气质量
$qlty=$weather_response["HeWeather data service 3.0"][0]["aqi"]["city"]["qlty"];
$aqi=$weather_response["HeWeather data service 3.0"][0]["aqi"]["city"]["aqi"];
$response["current"]["img_src"]=$img_src;
$response["current"]["tmp"]=urlencode($tmp);
$response["current"]["qlty"]=urlencode($qlty);
$response["current"]["aqi"]=$aqi;


//未来天气
//日期
$date = date("m月d日"); //获取今天的日期 字符串
$response["date"]=urlencode($date);
$week=[];
function getTimeWeek($time, $i) {
    $weekarray = array("日","一", "二", "三", "四", "五", "六");
    $oneD = 24 * 60 * 60;
    return "周" . $weekarray[date("w", $time + $oneD * $i)];
}
$time=time() ;
for($i=0;$i<5;$i++){
    $week[$i]=urlencode(getTimeWeek($time,$i));
}
$response["future"]["week"]=$week;

//天气情况
$img=[];
$code=[];
for($i=0;$i<5;$i++){
    $code[$i]=$weather_response["HeWeather data service 3.0"][0]["daily_forecast"][$i]["cond"]["code_d"];
    $img[$i]="http://files.heweather.com/cond_icon/".$code[$i].".png";
}
$response["future"]["img"]=$img;

$cond_text=[];
for($i=0;$i<5;$i++){
    $cond_txt[$i]=$weather_response["HeWeather data service 3.0"][0]["daily_forecast"][$i]["cond"];
    $cond_txt_d=$cond_txt[$i]["txt_d"];
    $cond_txt_n=$cond_txt[$i]["txt_n"];
    if($cond_txt_d==$cond_txt_n){
        $cond_txt[$i]=$cond_txt_d;
    }else{
        $cond_txt[$i]=$cond_txt_d."转".$cond_txt_n;
    }
    $cond_txt[$i]=urlencode($cond_txt[$i]);
}
$response["future"]["cond_text"]=$cond_txt;

$tmp=[];
for($i=0;$i<5;$i++){
    $tmp[$i]=urlencode($weather_response["HeWeather data service 3.0"][0]["daily_forecast"][$i]["tmp"]["min"]."～".
        $weather_response["HeWeather data service 3.0"][0]["daily_forecast"][$i]["tmp"]["max"]."℃") ;
}
$response["future"]["tmp"]=$tmp;

$wind=[];
for($i=0;$i<5;$i++){
    $wind[$i]=$weather_response["HeWeather data service 3.0"][0]["daily_forecast"][$i]["wind"];
    $dir=$wind[$i]["dir"];
    $sc=$wind[$i]["sc"];
    if($sc=="微风"){
        $wind[$i]=$dir.$sc;
    }else{
        $wind[$i]=$dir.$sc."级";
    }
    $wind[$i]=urlencode($wind[$i]);
}
$response["future"]["wind"]=$wind;


echo urldecode( json_encode($response));










