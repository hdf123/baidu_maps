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
	return html = '<div id="loading" style="width:100%;height:100%;background:rgba(238,238,238,0.9);z-index:1;text-align:center;position:absolute;left:0px;top:0px;"><div style="width:32px;height:32px;position:fixed;top:45%;left:50%;margin-left:-16px;z-index:1000;"><img src="../../img/loadings.gif" /></div></div>';
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

//基础布局
function funkr(){
	var ss=$(document.body).outerHeight(true);
	var he=$(".heads").outerHeight();
	var ft=$(".foots").outerHeight();
	he==undefined?he=0:he=he;
	ft==undefined?ft=0:ft=ft;
	var bod=ss-(he+ft);
	$(".sets").css({"height":bod+"px"});
}

//弹窗(1秒后自动隐藏)，待改善
function popups(contents,address){//contents：内容；address：地址
	$("#wdows").remove();
	$("body").append(`<div id="wdows">
						<div>${contents}</div>
					</div>`);
	$("#wdows").hide();//初始化异常弹窗
	$("#wdows").fadeIn(500,function(){
		setTimeout(function(){
			$("#wdows").fadeOut(1000,function(){
				console.log(address);
				address==""||address==undefined||address==null?location.reload():wode(address);//有传地址跳转，没有就刷新当前页面.
				function wode(address){
					address!="no"?location.href=address:console.log("什么也不做");
				}
			});
		},1000);
	});
}
//弹窗（需要手动确认或取消），待完善



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































