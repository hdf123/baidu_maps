//ajax封装调用
var urs="";
function ajaxs(url,type,data,suFn,erFn,params){
 	var token= JSON.parse(localStorage.getItem('tokens'));//获取token
	$.ajax(Object.assign({
		url:urs+url,
		headers:{"Authorization":token},
		type:type,
        dataType : "json",
        data:data,
		success: function(data){
			suFn(data);
		},error: function(error){
            erFn(error);
        }
	},params||{}));
}

//地址栏传参
//getRequest();//全部参数
function getRequest(){
	var url=window.location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1){
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
  			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

//loading
function loading(){
	return html = '<div id="loading"><img src="../img/loadings.gif" /></div>';
//	return html = '<div id="loading" style="width:100%;height:100%;background:rgba(238,238,238,0.9);z-index:1;text-align:center;position:absolute;left:0px;top:0px;"><div style="width:32px;height:32px;position:fixed;top:45%;left:50%;margin-left:-16px;z-index:1000;"><img src="../img/loadings.gif" /></div></div>';
}

//图片加载失败时，动态添加也包含在内
function imgks(){
	document.addEventListener("error", function (e) {
	  var elem = e.target;
	  if (elem.tagName.toLowerCase() == 'img') {
	    elem.src ="";
	  }
	}, true);
}
/**
 * 实现将项目的图片转化成base64
 */
function convertImgToBase64(url, callback, outputFormat) {
	var canvas = document.createElement('CANVAS'),
	ctx = canvas.getContext('2d'),
	img = new Image;　　
	img.crossOrigin = 'Anonymous';　　
	img.onload = function() {
		canvas.height = img.height;　　
		canvas.width = img.width;　　
		ctx.drawImage(img, 0, 0);　　
		var dataURL = canvas.toDataURL(outputFormat || 'image/png');　　
		callback.call(this, dataURL);　　
		canvas = null;
	};　　
	img.src = url;
}
/**
 * 输入限制
 */
//limitImport('.texts',200);调用实例：类名或ID，限制的字数
function limitImport(str,num){
	$(document).on('input propertychange',str,function(){
 	var self = $(this);
 	var content = self.val();
 	if (content.length > num){
  		self.val(content.substring(0,num));
 	} 
 	$(".mun").text(self.val().length+'/'+num);
	});
}
//上拉加载
//_loadIndex 为请求的页数    _loadState为请求状态  0 可以请求  1 正在请求  2 请求结束
	var _loadIndex =1,
	    _loadState = 0;
	function loadmore(element,url,type,dataObj,successFn,errorFn) {
	    $(element).on("scroll",function(){
	        //当前可视容器高度
	        var _elementHeight = $(element).outerHeight(),
	            //当前滚动区域高度
	            _elementChildHeight = $(element).children().outerHeight(),
	            //滚动条高度
	            _elementScroll = $(element).scrollTop();
	        //滚动区域 - 滚动条高度 > 可视高度  就是还可以滚动  表示没有滚动到底部  否则就到了底部
	        if(_elementChildHeight - _elementScroll - 10 > _elementHeight){            
	            //console.log('没到底') 
	        }else {
	            //console.log('到底了')           
	            //当状态为0 的时候进行加载，防止重复加载
	            if(_loadState == 0){       
	                //状态更新为1
	                _loadState = 1;
	                //增加页数
	                _loadIndex += 1;
	                //添加正在加载loadding
	                $(element).append('<p class="nowLoad">正在加载...</p>');
	                //请求当前页数ajax
	                ajaxLoad(_loadIndex);
	            }
	        }
	    });    
	    //ajax请求
	    function ajaxLoad(page) {        
	        //更新发向服务器的数据，添加页数key值
	        dataObj.page = page;
	        $.ajax({
	            url:urs+url,
		 		xhrFields:{
		           withCredentials:true
		       	},
	            type:type,
	            dataType:'json',
	            data:dataObj,
	            success:function (data) {
	                //数据渲染  ajajx回调
	                successFn(data);
	               //当数据不为空的时候，更新状态
	                if(data.length > 0){
	                    //更新状态 为 0
	                    _loadState = 0;
	                    //删除正在加载loadding
	//                  $('.nowLoad').remove();
	                    function hg(){
	                    	$(".nowLoad").remove();
	                    }
	                    setTimeout(hg,1200);
	                }else {                    
	                    //当数据长度小于等于0的时候，代表没有数据了，更新状态为2
	                    _loadState = 2;                    
	                    //删除正在加载loadding
	                    $('.nowLoad').remove();                    
	                    //更换loadding为没有数据
	                    $(element).after('<p class="endLoad">没有数据了...</p>');
	                    function fg(){
	                    	$(".endLoad").remove();
	                    }
	                    setTimeout(fg,1200);
	                }                
	            },
	            error:function (err) {                
	                //请求失败loadding
	                errorFn(err);                
	            }
	        })
	    }
	};
//上拉加载调用js
	/*loadmore('#wrapper','/store/tradeapi','post',{},function (data) {
	    $.each(data.data.list,function (key,val) {
	        $('#wrapper ul').append();
	    });
	},function () {   
	});*/

/**
 * 当前时间
 */
function getMyDate(str,state){
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),//年
        oMonth = oDate.getMonth()+1,//月
        oDay = oDate.getDate(),//日
        oHour = oDate.getHours(),//时
        oMin = oDate.getMinutes(),//分
        oSen = oDate.getSeconds(),//秒
        oFf=oDate.getMilliseconds()//毫秒
        if(state==1){
        	oTime = oYear +'.'+ getzf(oMonth) +'.'+ getzf(oDay);//最后拼接时间，年月日
        }else{
        	oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
        }
    return oTime;
};
//补0操作
function getzf(num){
	return num< 10 ? '0' + num:num;
}
/**
 * 去重
 */
function heavy(heavy){
	return Array.from(new Set(heavy));
}





























