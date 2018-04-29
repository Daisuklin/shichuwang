/*
-------------------------------------------------------------
*****************  乐度网店系统(lodoeshop)  *****************

作者：福州市好格网络技术有限公司
网站：http://www.lodoeshop.com
版权：版权属于福州市好格网络技术有限公司，不得拷贝、修改，侵权必究。

*************************************************************
-------------------------------------------------------------
*/
/*var URLParams = new Object() ;
var aParams = document.location.search.substr(1).split("&") ;
for (i=0 ; i < aParams.length ; i++) {
	var aParam = aParams[i].split("=") ;
	URLParams[aParam[0]] = aParam[1] ;
}*/
//加载js文件
/*function $loadScript(url, id, obj) {
    setTimeout(function() {
        var s = document.createElement("script"),
        charset = "utf-8";
        var o = obj || {};
        id += (new Date).getTime();
        if (o.charset) {
            charset = o.charset
        };
        s.charset = charset;
        s.id = id;
        document.getElementsByTagName("head")[0].appendChild(s);
        s.src = url;
        return s;
    },
    0);
};*/
//加载css文件
/*function $loadCss(path) {
    if (!window["_loadCss" + path]) {
        var l = document.createElement('link');
        l.setAttribute('type', 'text/css');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('href', path);
        l.setAttribute("id", "loadCss" + Math.random());
        document.getElementsByTagName("head")[0].appendChild(l);
        window["_loadCss" + path] = true;
    }
    return true;
}*/


function ChExpand(){
	var LODO_URLParams = new Object() ;
	var aParams = document.location.search.substr(1).split("&") ;
	for (i=0 ; i < aParams.length ; i++) {
		var aParam = aParams[i].split("=") ;
		LODO_URLParams[aParam[0]] = aParam[1] ;
	}
	var exturl=document.location.pathname.split(".");
	var ext=exturl[exturl.length-1];
	if(ext!="html"||ext!="htm"||ext!="shtml"){return;}
	if((LODO_URLParams["tuid"])){
		var url="&gotourl="+encodeURIComponent(location.href);
		if(LODO_URLParams["fmail"]){url="&fmail="+LODO_URLParams["fmail"];}
		$.get(lodo_web_path+"Expand.asp?ttyp=html&tuid="+LODO_URLParams["tuid"]+url);
	}
	if(LODO_URLParams["formurl"]&&$("#formurl")[0]){$("#formurl").val(LODO_URLParams["formurl"]);}
}

//商品分类
/*function MM_showHideLayers(e,v) {v=="hide"?$(e).hide():$(e).show();}*/

var menuids=["submenutree"]
var leftclass=false;

function buildsubmenus(){
	if(!leftclass){
		$("ul[id='submenutree'] ul").siblings("a").addClass("subfolderstyle");
		$("ul[id='submenutree'] ul").parent().hover(function(){
			$(this).children("a:first").addClass("subfolderstyles");
			$(this).children("ul:first").addClass("disblock").show();
			//return false;
		},function(){
			$(this).children("a:first").removeClass("subfolderstyles");
			$(this).children("ul:first").hide();
		});
		$("ul#submenutree:first a[cid]").hover(function(){
			var cid=$(this).attr("cid");
			$("div.class_brand_list").hide();
			$("div.class_brand_list[cid='"+cid+"']").show();
		},function(){
			
		});
  }
}


//E-Mail验证
function checkemail(str){
	var p=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	if(!p.exec(str)){return false;}else{return true;}
}


//杂志订阅与
function mail_subscribe(){
	var mailaddr=$("form#MailForm input#MailAddr").val();
	if(!checkemail(mailaddr)){alert(lodo_lang_js.functions.tip_1);return false;}
	$.getJSON(lodo_web_path+"mailcode.asp?act=subscribe&mail="+mailaddr+"",function(data){
		if(data.errno){alert(data.msg);return false;}
		if(data.gotono){location.href=data.gotourl};
		if(data.ch){alert(data.info);}
	})
	return false;
}

function selpagesize(e,cid){
	var locationUrl="?";
	if(!cid){
		var aParams = document.location.search.substr(1).split("&") ;
		for (i=0 ; i < aParams.length ; i++) {
			var aParam = aParams[i].split("=") ;
			if((!(aParam[0]=="pagesize"))&&aParam[0]!=""&&aParam[1]!=""){
				locationUrl=locationUrl+aParam[0]+"="+aParam[1]+"&";
			}
		}
	}else{
		locationUrl=locationUrl+cid;
	}
	locationUrl=locationUrl+"pagesize="+e;
	location.href=locationUrl;
}

//自动换行
/*function toBreakWord(intLen, id){
	var navigatorName = "Microsoft Internet Explorer";
	   var isIE = false;
	if( navigator.appName == navigatorName ){
		isIE = true;    
	}
	if(!isIE){
		var obj=document.getElementById(id);
		var strContent=obj.innerHTML; 
		var strTemp="";
		while(strContent.length>intLen){
			strTemp+=strContent.substr(0,intLen)+"<br>"; 
			strContent=strContent.substr(intLen,strContent.length); 
		}
		strTemp+= strContent;
		obj.innerHTML=strTemp;
	}
}*/

/*function ShowDiv(obj){
	$(obj).show();
}*/
/*function HideDiv(obj){
	$(obj).hide();
}*/

/*function menushow(obj,menuobj){
	if($("#"+obj)[0])	{
		if($("#"+obj).css("display")!="block"){
			$("#"+obj).show();
			$(menuobj).attr("class","menushowhover");
		}
	}
}*/
/*function menuhide(obj,menuobj){
	if($("#"+obj)[0]){
		if($("#"+obj).css("display")!="none"){
			$("#"+obj).hide();
			$(menuobj).attr("class","");
		}
	}
}*/
function initweb(selid,classname,selidname,selectid){
	if(classname==null||classname==""){classname="seltopclass";}
	var toplink=selid;
	if(selidname!=null&&selidname!=undefined){toplink=selidname+toplink;}
	if(toplink!=""){
		var temptop_link=$("#top_link_"+toplink);
		if(temptop_link[0]){
			temptop_link.attr("class",classname);
			$("#one_two_"+toplink).show();
		}
	}
	if($("#"+selectid)[0]){$("#"+selectid+">option[value='"+selid+"']").attr("selected",true);}
}
/*function setbtnupdate(divname,divinfo,divclassname){
	$("#"+divname).attr("class",divclassname).html(divinfo)
}*/
	
Function.prototype.runAfter=function(t){
	var A=this;
	var B=Array.prototype.slice.call(arguments,1);
	var f=function(){A.apply(null,B)};
	return setTimeout(f,t)
};
if(typeof(Countdown)=="undefined"){Countdown={}};
Countdown.setRemainTime=function(objname,startTime,endTime,state,endTime2,rid){
	if($("#"+objname)[0]){
		Countdown.remainTime({dom:$("#"+objname)[0],startTime:startTime,endTime:endTime,state:state,endTime2:endTime2,rid:rid})
	}
};
Countdown.remainTime=function(b){
	var c=b.dom;
	var d=b.endTime;
	var e=b.state;
	var f="";
	if(e==2||e==4){
		f=Countdown.timeToLeave({startTime:b.startTime++,endTime:d,b:b});
		c.innerHTML=f;
		Countdown.remainTime.runAfter(1000,b)
	}else{
		c.innerHTML=lodo_lang_js.functions.tip_2
	}
/*	if(e==2){
		f=Countdown.timeToLeave({startTime:(new Date()).getTime(),endTime:d,b:b});
		c.innerHTML=f;
		Countdown.remainTime.runAfter(1000,b)
	}else if(e==4){
		//c.innerHTML=lodo_lang_js.functions.tip_7
		f=Countdown.timeToLeave({startTime:(new Date()).getTime(),endTime:d,b:b});
		c.innerHTML=f;
		Countdown.remainTime.runAfter(1000,b)
		
	}else if(e==1){
		c.innerHTML=lodo_lang_js.functions.tip_2
	}else{
		c.innerHTML=lodo_lang_js.functions.tip_2
	}*/
	var g=function(a){}
};

Countdown.timeToLeave=function(a){
var b=a.startTime;
var c=a.endTime;

var d=0;
var e=0;
var f=0;
var g=0;

//var h=new Date();
//var i=c-parseInt(b/1000);
var i=c-parseInt(b);

if(i<0){
	i=0
}else{
	d=parseInt(i/86400);
	i=i-d*86400;
	e=parseInt(i/3600);
	i=i-e*3600;
	f=parseInt(i/60);
	g=i-f*60
};

if(e<10){e='0'+e}if(f<10){f='0'+f}if(g<10){g='0'+g}if(d>0){d=d}else{d=0};
if(e>0){e=e+""}else{if(d!=""){e="00"}else{e="0"}};
if(f>0){f=f+""}else{if(d!=""||e!=""){f="00"}else{f="00"}};
if(g>0){g=g+""}else{if(d!=""||e!=""||f!=""){g="00"}else{g="00"}};
i="<span class=Countday>"+(d>0?(d+"<font>"+lodo_lang_js.functions.tip_3+"</font>"):"")+"</span><span class=Counthour>"+e+"<font>"+lodo_lang_js.functions.tip_4+"</font></span><span class=Countm>"+f+"<font>"+lodo_lang_js.functions.tip_5+"</font></span><span class=Counts>"+g+"<font>"+lodo_lang_js.functions.tip_6+"</font></span>";
var total_times=(d*1+e*1+f*1+g*1);
if(a.b.state==4){
	if(total_times<=0){
		a.b.endTime=a.b.endTime2;
		a.b.state=2;
		$("#sTimes_info_"+a.b.rid+",#sTimes_info_"+a.b.rid+"_i").hide();
		$("#eTimes_info_"+a.b.rid+",#eTimes_info_"+a.b.rid+"_i").show();
		i=lodo_lang_js.functions.tip_7;
	}else{
		$("#sTimes_info_"+a.b.rid+",#sTimes_info_"+a.b.rid+"_i").show();
		$("#eTimes_info_"+a.b.rid+",#eTimes_info_"+a.b.rid+"_i").hide();
	}
}else{
	if(total_times<=0){
		$("#sTimes_info_"+a.b.rid+",#sTimes_info_"+a.b.rid+"_i,#eTimes_info_"+a.b.rid+",#eTimes_info_"+a.b.rid+"_i").hide();
		i=lodo_lang_js.functions.tip_2;
	}
}
/*if((d*1+e*1+f*1+g*1)<=0){
	if(a.b.state==4){
		a.b.endTime=a.b.endTime2;
		a.b.state=2;
		$("#sTimes_info_"+a.b.rid).hide();
		$("#eTimes_info_"+a.b.rid).show();
		i=lodo_lang_js.functions.tip_7;
	}else{
		$("#sTimes_info_"+a.b.rid+",#eTimes_info_"+a.b.rid).hide();
		i=lodo_lang_js.functions.tip_2;
	}
};*/
return i
};

//加入收藏夹
function adduserFavorites(gid){
	$favoriteComm({cid:gid});
}
//商品收藏处理
function $favoriteComm(obj){
    var option = {
        autoShare: true,
        cname: "",
        cid: "",
        uid: "",
        left: 0,
        top: 0
    };
	$.extend(option,obj);
    window._PP_core_favoriteComm_data = option;
	$.getJSON(lodo_web_path+"ajax_cart_data.asp?act=addfavorite&StoreID="+option.cid+"&m="+Math.random(),function(obj){
		if(obj.errno){MsgInfoShow(obj.msg);if(obj.gotono){location.href=obj.gotourl};return false;}
		if(obj.logno){
			FavoriteCommCallback(lodo_lang_js.functions.tip_8,obj.gotourl);
			return false;
		}
		if(obj.addfavno){
			$("#goods_favorites_"+obj.gid).html(obj.user_favorites_total);
			MsgInfoShow(obj.msg);
			shop_collection_load();
			return false;
		}
		return false;
		
	});
    function FavoriteCommCallback(msg,gotourl){
        var option = window._PP_core_favoriteComm_data;
            $loginFrame({
                type:"func",
                check: false,
				checkReady:false,
                model: false,
				title:msg,
				gotourl:gotourl,
                action:function(){
                    $favoriteComm(option)
                },
                "x": option.left,
                "y": option.top,
				width:650
            });
    }
}

//会员登录框加载
function $loginFrame(obj) {
	var dialog_options={
		width:"auto",
		modal:true
	};
	if(obj.width){
		dialog_options.width=obj.width;
	}
    var option = {
        'float': true,
        model: true,
        drag: true,
        type: "self",//成功返回处理方式
        action: window.location.href,//成功返回的地址或要执行的函数
        check: true,
        title: lodo_lang_js.functions.tip_9,//提示框名称
		gotourl:lodo_web_path+"login.asp?action=ajax&bn="+Math.random(),
        close: true,
        domId: "",
        quick: true,
        checkReady: true,
        hostingId: "",
        x: "100",
        y: "100",
        onLogin: function(obj) {
            return true;
        },
        onReset: function(obj) {
            return true;
        },
        onClose: function(obj) {
            return true;
        },
        onResize: function(w, h, obj) {
            return true;
        },
        onSuccess: function(obj) {
            return true;
        },
        onFailure: function(errId, obj) {
            return true;
        }
    };
	$.extend(option,obj);
    window._loginFrameOption = option;
    option.doAction = doAction;//成功时执行的函数
	option.closeLogin=closeLogin;
    option.showLoginFrame = showLoginFrame;
    if (option.check) {
        option.doAction();
        return;
    }
    if (option.checkReady) {
        return false;
    };
    option.showLoginFrame();
    initLoginCallBack();
    function showLoginFrame() {
		var t_dialog=new dialog_cls(option.gotourl,option.title,"",dialog_options);
    }
    function initLoginCallBack() {
        /*window.ptlogin2_onLogin = function() {
            return (window._loginFrameOption.onLogin()) ? true: false;
        };
        window.ptlogin2_onReset = function() {
            return (window._loginFrameOption.onReset()) ? true: false;
        };
        window.ptlogin2_onClose = function() {
            return (window._loginFrameOption.onClose()) ? true: false;
        };
        window.ptlogin2_onResize = function(width, height) {
            if (!window._loginFrameOption.onResize(width, height)) {
                return false;
            }
            window._loginFrameOption.floatHandle ? window._loginFrameOption.floatHandle.resize(parseInt(width) + 28, parseInt(height) + 75) : "";
            var oFrame = $id("login_frame"),
            oUnit = $id("loginUnit"),
            oUnit2 = $id("loginUnit2");
            oFrame.style.height = height + "px";
            oFrame.style.width = width + "px";
            if (oUnit) {
                oUnit.style.height = (height + 75) + "px";
                oUnit.parentNode.parentNode.style.height = (height + 80) + "px";
            };
            if (oUnit2) {
                oUnit2.style.height = (height + 60) + "px";
                oUnit.parentNode.parentNode.style.height = (height + 60) + "px";
            };
            return true;
        };*/
        window.ptlogin2_onSuccess = function() {
            if (!window._loginFrameOption.onSuccess()) {
                return false;
            }
            window._loginFrameOption.closeLogin();
            window._loginFrameOption.doAction();
            return true;
        };
        /*window.ptlogin2_onFailure = function(err) {
            if (!window._loginFrameOption.onFailure(err)) {
                return false;
            }
            if (err) {
                alert("登录失败！可能的错误原因：" + err);
            }
            $loginFrame(window._loginFrameOption);
            return true;
        };*/
    }
    function doAction() {
        if (this.type == "func") {
            this.action();
        };
        if (this.type == "top") {
            window.top.location.href = this.action;
        };
        if (this.type == "parent") {
            window.parent.location.href = this.action;
        };
        if (this.type == "self") {
            window.location.href = this.action;
        };
        if (this.type == "blank") {
            window.open(this.action);
        };
    }
    function closeLogin() {
        try {
           $("#lodo_tmp_tc_info").remove();
        } catch(e) {}
    }

}

//商品积分兑换
function $GoodsJfyhComm(gotourl,obj){
    var option = {
        left: 0,
        top: 0,
		title:lodo_lang_js.functions.tip_10
    };
	$.extend(option,obj);
	var Comm_options=window._PP_core_GoodsJfyhComm_data;
	$loginFrame({
		type:"func",
		check: false,
		checkReady:false,
		model: false,
		title:option.title,
		gotourl:gotourl,
		action:Comm_options.action,
		"x": option.left,
		"y": option.top,
		width:700
	});
	return false;
}


	
//查看购物券金额
function Shop_Show(){
	var FSN=$("#StickNumber").val();
	var FSP=$("#StickPass").val();
	var FBM=0;
	if($("#BoLMoney")[0]){FBM=$("#BoLMoney").val();}
	$.getJSON(lodo_web_path+"ShoppingPay.asp?SN="+FSN+"&SP="+FSP+"&FBM="+FBM,function(obj){
		if(obj.errno){$("#Shoping_Show").html(obj.msg);return false;}
		if(obj.gotono){location.href=obj.gotourl};
	});
	return false;
}


//设置默认排序方式
function preface_init(smid,no,yname,yclass){
	$("#lodo_goods_preface>option[smt="+smid+"]").attr("selected",true);
	if(no==1){
		var showobj,hideobj;
		if(smid%2==0){
			showobj=$("#"+yname+(smid));
			hideobj=$("#"+yname+(smid-1));
		}else{
			showobj=$("#"+yname+(smid));
			hideobj=$("#"+yname+(smid+1));
		}
		$("#"+yname+"2,#"+yname+"4,#"+yname+"6,#"+yname+"8,#"+yname+"10,#"+yname+"12").hide();
		showobj.attr({"href":hideobj.attr("href"),"class":yclass}).show();
		hideobj.hide();
	}
}

function setuser(){
	$(".web_btn_login").live("click",function() {
			var tcno=$(this).attr("tcno");
			if(tcno=="1"){
				$loginFrame({check: false,checkReady:false,width:650});
				return false;
			}
		});
	$(".web_btn_reg").live("click",function(){
			var tcno=$(this).attr("tcno");
			if(tcno=="1"){
				var t_dialog=new dialog_cls(lodo_web_path+"reg.asp?action=reg&rtyp=ajax&bn="+Math.random(),lodo_lang_js.functions.tip_11);
				return false;
			}
	});
	var tmp_input=$("form#UpComment input:text#CName,form#UpComment input:text#CEmail,form input:text#R_Name,form input:text#R_Email");
	if(tmp_input.size()>0){
			$.getJSON(lodo_web_path+"ajax_data.asp?action=userinfo",function(obj){
				 //if(obj.errno){alert(obj.msg);if(obj.gotono){location.href=obj.gotourl};return false;}
				 if(obj){
					 $("form#UpComment input:text#CName,form input:text#R_Name").val(obj.username);
					 $("form#UpComment input:text#CEmail,form input:text#R_Email").val(obj.email);
				}
			});
		}
	}


//将处理加入购物车后返回来的信息
var cart_r_cls=function(){
	var settings={
		//lang_cart_f:"\u6b63\u5728\u6dfb\u52a0\u5546\u54c1\u5230\u8d2d\u7269\u8f66...\u8bf7\u7a0d\u5019",//正在添加商品到购物车...请稍候
		j_name:"ark_addToCartIndicator",
		fit_addTocart:"#addToCartId",
		fit_totalNum:"#addToCartId #totalNum_fit",
		fit_totalAmout:"#addToCartId #totalAmout_fit",
		fit_totalpoint:"#addToCartId #totalpoint_fit",
		ark_listCart:"#ark_listCart"
	};
	settings.load_cart_r_list=function(m){
		$(settings.fit_addTocart+" #cart_goods_list>li").remove();
		$(m.cart_goods_list).each(function(){
			var c_buyqn=this.buyqn*1;
			var tmpli=$("<li pid='"+this.cartid+"'></li>");
			tmpli.append("<a href='"+this.goods_link+"' target='_blank'>"+this.goods_name+"</a>");
			tmpli.append("<span class=price>"+this.shop_price+m.yuan+"</span>");
			tmpli.append("<span class=point>"+this.point+lodo_lang_js.functions.tip_12+"</span>");
			tmpli.append("<span class='goods_number'>"+c_buyqn+"</span>");
			$(settings.fit_addTocart+" #cart_goods_list").append(tmpli);
			switch(this.gtyp){
				case 1:
				case 8:{
					$(this.items).each(function(){
						var tmp_li=$("<li pid='"+this.cartid+"'></li>");
							tmp_li.append("<span class='subOrderIcon'></span>");
							tmp_li.append("<a href='"+this.goods_link+"' target='_blank' class='havepj'>"+this.goods_name+"</a>");
							tmp_li.append("<span class=price>"+this.shop_price+m.yuan+"</span>");
							tmp_li.append("<span class=point>"+this.point+lodo_lang_js.functions.tip_12+"</span>");
							tmp_li.append("<span class='goods_number'>"+this.buyqn+"</span>");
							$(settings.fit_addTocart+" #cart_goods_list").append(tmp_li);
					});
					break;
				}
				case 7:{
					$(this.items).each(function(){
						var tmp_li=$("<li pid='"+this.cartid+"'></li>");
							tmp_li.append("<span class='subOrderIcon'></span>");
							tmp_li.append("<a href='"+this.goods_link+"' target='_blank' class='havepj'>"+this.goods_name+"</a>");
							tmp_li.append("<span class=price>"+lodo_lang_js.functions.tip_12+"</span>");
							tmp_li.append("<span class=point>"+lodo_lang_js.functions.tip_12+"</span>");
							tmp_li.append("<span class='goods_number'>"+(this.buyqn*c_buyqn)+"</span>");
							$(settings.fit_addTocart+" #cart_goods_list").append(tmp_li);
					});
					break;
				}
				case 10:{
					$(this.items).each(function(){
						var tmp_li=$("<li pid='"+this.cartid+"'></li>");
							tmp_li.append("<span class='subOrderIcon'></span>");
							tmp_li.append("<a href='"+this.goods_link+"' target='_blank' class='havepj'>"+this.goods_name+"</a>");
							tmp_li.append("<span class=price>"+lodo_lang_js.functions.tip_13+"</span>");
							tmp_li.append("<span class=point>"+lodo_lang_js.functions.tip_13+"</span>");
							tmp_li.append("<span class='goods_number'>"+(this.buyqn*c_buyqn)+"</span>");
							$(settings.fit_addTocart+" #cart_goods_list").append(tmp_li);
					});
					break;
				}
			}
		});
		shop_cart_load();
	}
   var j;
   var i=function(obj,k){
			if(k&&k.isReportSuccess){
				j=$(settings.fit_addTocart).addClass("cart-indicator");
			}else{
			   j=$("#"+settings.j_name);
			   if(!j[0]){j=$("<div id='"+settings.j_name+"'></div>");}
			   j.addClass("cart-indicator");
			   $(obj).after(j);
			}
			j.show();
	   return j
	};
	var g=function(k,l){
		if(l&&l.isReportSuccess==="true"){
			var o=$(k).offset();
			var s=$(j).width();
			var t=$(k).width();
			if((o.left+s)>$(document).width()){o.left-=s-t;};
			$(j).css({"left":(o.left)+"px","top":o.top+"px"});
		}else{
			var o=$(k).position();
			var t=$(k).width(),p=$(k).height();
			var s=$(j).height();
			var r=o.left+4;
			var q=o.top-s;
			$(j).css({"left":r+"px","top":q+"px"});
		}
	};
	return{
	load_init:function(options){
		$.extend(settings,options);
	},
	show:function(l,k){
		i(l,k);
		g(l,k);
	},
	reportFailed:function(k){$(j).html(k).addClass("cart-indicator-error");},
	reportSuccess:function(m){
		settings.load_cart_r_list(m);
		$(settings.fit_totalNum).html(m.itemCount).show();
		$(settings.fit_totalAmout).html(m.totalPrices);
		$(settings.fit_totalpoint).html(m.totalPoint);
		$(j).addClass("cart-indicator-ok");
		},
	hide:function(){
			$(j).removeClass("cart-indicator-ok cart-indicator-error").hide();
		}
	}
}



//商品事件
var ShopingToCart=(function(){
	var lodo_GoodsObj=null;
	var O=new cart_r_cls();
	var a={};
	a.attachEventToQn=function(){
		$(".qnMinus").live("click",function(){
			var gid=$(this).attr("gid");
			var oid=$(this).attr("oid");
			var buyqnobj=$(this).parent().parent().find("#buyqn_"+gid+"_"+oid+":first");
			var maxqn=buyqnobj.attr("buymaxqn")*1;
			var lvtype=buyqnobj.attr("lvtype")*1;
			var lv=buyqnobj.attr("lv")*1;
			var valno=false;
			if(buyqnobj.attr("type")=="text"){valno=true;}
			var buyqn=valno?buyqnobj.val()*1:buyqnobj.html()*1;
			if(lvtype==1){buyqn-=lv;}else{buyqn-=1;}
			if(buyqn<1){return false;}
			valno?buyqnobj.val(buyqn):buyqnobj.html(buyqn);
			return false;
		});
		$(".qnAdd").live("click",function(){
			var gid=$(this).attr("gid");
			var oid=$(this).attr("oid");
			var buyqnobj=$(this).parent().parent().find("#buyqn_"+gid+"_"+oid+":first");
			var maxqn=buyqnobj.attr("buymaxqn")*1;
			var lvtype=buyqnobj.attr("lvtype")*1;
			var lv=buyqnobj.attr("lv")*1;
			var valno=false;
			if(buyqnobj.attr("type")=="text"){valno=true;}
			var buyqn=valno?buyqnobj.val()*1:buyqnobj.html()*1;
			if(lvtype==1){buyqn+=lv;}else{buyqn+=1;}
			if(maxqn!=-1&&buyqn>maxqn){return false;}
			//alert("buyqnobj="+buyqnobj.parent().parent().parent().parent().parent().parent().html());
			valno?buyqnobj.val(buyqn):buyqnobj.html(buyqn);
			return false;
		});
	}
	a.attachEventToAddTrigger=function(){
		$(".addbindgoodstocart,.btn_addgoodstocart,.btn_gift_jfyh,.btn_goods_jfyh").live("click",function(event){
			var gid=$(this).attr("gid");
			lodo_GoodsObj=$(this);
			var t=lodo_GoodsObj.attr("gt");
			var did=lodo_GoodsObj.attr("itemdid")*1;
			var buyqnobj=lodo_GoodsObj.parent().parent().find("#buyqn_"+gid+"_"+did);
			var valno=false;
			if(buyqnobj.attr("type")=="text"){valno=true;}
			if(isNaN(did)){did="";}
			var buyqn=valno?buyqnobj.val()*1:buyqnobj.html()*1;
			if(isNaN(buyqn)||buyqn<1){buyqn=1;}
			var addtocarttyp=$("input:hidden#addtocarttyp_"+gid);
			if(addtocarttyp[0]){t=addtocarttyp.val();}
			var j=[gid,did,buyqn];
			var Comm_options={
				action:function(){
					a.addToCart(j,t);
				}
			};
			window._PP_core_GoodsJfyhComm_data = Comm_options;
//			if(t=="jfgoods"||t=="jfgift"){
//				window._PP_core_GoodsJfyhComm_data = Comm_options;
//			}
			Comm_options.action();
			return false;
		})
	};
	a.detachEventFromAddTrigger=function(){
		//alert("die");
		//$(".addbindgoodstocart,.btn_addgoodstocart,.btn_gift_jfyh,.btn_goods_jfyh").die("click");
		O.show(lodo_GoodsObj);
		O.reportFailed("<img src='"+lodo_web_path+"images/loading3.gif' width=16 height=16>"+lodo_lang_js.functions.tip_15);
		lodo_GoodsObj.hide();
	};
	a.addToCart=function(j,t){
		this.detachEventFromAddTrigger();
		var g="&t="+(new Date()).getTime();
		var G=location.protocol+"//"+location.host+lodo_web_path;
		var T;
		var submitName="#hotadd";
		switch(t){
			case "bg":{
				T=G+"addbindgoodstocart.asp?act=add&gid={0}";
				break;
			}
			case "jfgoods":{
				T=G+"addgoodscar.asp?act=buyjfyh&Gid={0}&item_detail_id={1}&quantity={2}";
				break;
			}
			case "jfgift":{
				T=G+"addgiftjfyh.asp?act=add&gid={0}";
				submitName="#ark_cartForm";
				break;
			}
			default:{
				T=G+"addgoodscar.asp?act=buy&Gid={0}&item_detail_id={1}&quantity={2}";
				break;
			}
		}
		var i=T+g;
		var h=substitute(i,j);
		$.getJSON(h,a.popupItemList);
		return false;
/*		var options={
			url:h,
			dataType:"json",
			success:a.popupItemList
		};
		$(submitName).ajaxSubmit(options);*/
	};
	a.popupItemList=function(data){
		O.hide();
		lodo_GoodsObj.show();
		//a.attachEventToAddTrigger();
		if(data.errno){alert(data.msg);return false;}
		if(data.gotono){location.href=data.gotourl};
		if(data.logno){$GoodsJfyhComm(data.gotourl);}
		if(data.cartno){
			O.show(lodo_GoodsObj,{isReportSuccess:"true"});
			O.reportSuccess(data);
			//a.attachEventToAddTrigger();
			$("#ark_continueShopping,#ark_closeIndicator").live("click",function(){
				O.hide();
				return false;
			});
		}
		return false;
	};
	a._init=function(){
		this.attachEventToQn();
		this.attachEventToAddTrigger();
		};
	a._init();
	return a
})

//加入购物车事件
function loadaddgoodstocart(){
	$(".btn_buy_info").live("mouseenter",function(){
		if(($(this).offset().left-$(this).find(".buy-select-list").width()+50)<=0){
			$(this).addClass("btn_buy_selected_left");
		}else{
			$(this).addClass("btn_buy_selected");
		}
	}).live("mouseleave",function(){
		$(this).removeClass("btn_buy_selected btn_buy_selected_left");
	})
	
/*	$(".btn_buy_info").live("mousemove",function(event){
			if(($(this).offset().left-$(this).find(".buy-select-list").width()+50)<=0){
				$(this).addClass("btn_buy_selected_left");
			}else{
				$(this).addClass("btn_buy_selected");
			}
			return false;
	}).live("mouseout",function(){
		$(this).removeClass("btn_buy_selected btn_buy_selected_left");
		return false;
	});*/
}

function ShopCart(){
	$("#shop_cart_info,#shop_cart_lay").live("mousemove",function(){
	  	$("#shop_cart_lay").show();
		return false;
	}).live("mouseout",function(){
		$("#shop_cart_lay").hide();	
		return false;
	});
	$("#ff_shop_cart_totalsum").html($("input[name='lodo_goods_cart_id']").size());
	$("#ff_shop_collection_totalsum").html($("input[name='lodo_goods_collection_id']").size());
	$("#ff_shop_browse_totalsum").html($("input[name='lodo_goods_visit_id']").size());
	$("#ff_shop_myorder_totalsum").html($("#ff_shop_myoder_list .orderlist").size());
	var ff_shop_cart_total_num=0;
	var ff_shop_cart_total_price=0;
	$("input[name='lodo_goods_cart_id']").each(function(){
		var gtype=$(this).attr("gtype");
		var cartid=$(this).val();
		var price=$(this).attr("price")*1;
		var qn=$(this).attr("qn")*1;
		ff_shop_cart_total_num+=qn;
		ff_shop_cart_total_price+=(qn*price);
		if(gtype==6){$("#ff_shop_cart_list div[cartid='"+cartid+"'] .maxproduct").remove();}
	});
	$("#ff_shop_cart_total_num").html(ff_shop_cart_total_num);
	$("#ff_shop_cart_total_price").html(FormatNumber(ff_shop_cart_total_price,2));
	
}

//删除浏览记录
function delgoodsvisit(e,gid){
	var lodo_goods_visit_id=$("input:hidden#lodo_goods_visit_id_"+gid+"");
	if(!lodo_goods_visit_id[0]){alert(lodo_lang_js.functions.tip_16);return false;}
	if(e){$(e).parent().html("<img src='"+lodo_web_path+"js/ajax-loader.gif' title='"+lodo_lang_js.functions.tip_17+"'>");}
	$.getJSON(lodo_web_path+"ajax_cart_data.asp?act=delvisit&gid="+gid+"",function(data){
		if(data.errno){alert(data.msg);return false;}
		if(data.gotono){location.href=data.gotourl};
		if(data.ch){
			shop_browse_load();
		}else{
			alert(lodo_lang_js.functions.tip_18);	
		}
	});
		
}

//删除收藏夹内的商品
function delcollection(e,gid){
	var lodo_goods_collection_id=$("input:hidde#lodo_goods_collection_id_"+gid+"");
	if(!lodo_goods_collection_id[0]){alert(lodo_lang_js.functions.tip_19);return false;}
	if(e){$(e).parent().html("<img src='"+lodo_web_path+"js/ajax-loader.gif' title='"+lodo_lang_js.functions.tip_17+"'>");}
	$.getJSON(lodo_web_path+"ajax_cart_data.asp?act=delcollection&gid="+gid+"",function(data){
		if(data.errno){alert(data.msg);return false;}
		if(data.gotono){location.href=data.gotourl};
		if(data.ch){
			var tli=$("#ff_shop_collection_list .collectioninfo[collectionid='"+gid+"']");
			tli.remove();
			lodo_goods_collection_id.remove();
			$("#ff_shop_collection_totalsum").html($("input[name='lodo_goods_collection_id']").size());
		}else{
			alert(lodo_lang_js.functions.tip_20);
		}
	});
}

//删除购物车内商品
function delcart(e,cartid){
/*	var lodo_goods_cart_id=$("input:#lodo_goods_cart_id_"+cartid+"");
	if(!lodo_goods_cart_id[0]){alert("在购物车内没有要删除的商品！");return false;}*/
	if(e){$(e).parent().html("<img src='"+lodo_web_path+"js/ajax-loader.gif' title='"+lodo_lang_js.functions.tip_17+"'>");}
	$.getJSON(lodo_web_path+"ajax_cart_data.asp?act=delcart&cartid="+cartid+"",function(data){
		if(data.errno){alert(data.msg);return false;}
		if(data.gotono){location.href=data.gotourl};
		if(data.ch){
			//删除购物车块内此商品
			var tli=$("#shop_cart_lay .cartgoods[cartid='"+cartid+"'],#shop_cart_lay .cartaccessories_li[scid='"+cartid+"'],#shop_cart_lay .cartaccessories_li[cartid='"+cartid+"']");
			tli.remove();
			var tmp_list=$("#ff_shop_cart_list input:hidden#lodo_goods_cart_id_"+cartid+",#ff_shop_cart_list input:hidden[name='lodo_goods_cart_id'][pscid='"+cartid+"']");
			tmp_list.remove();
			$(".shop_cart_goods_sum,#ff_shop_cart_totalsum,#minicarttotalsum,#ff_shop_cart_total_num").html(data.cart_total_qn);
			$(".shop_cart_goods_price,#minicarttotalprice,#ff_shop_cart_total_price").html(data.cart_total_price);
			$(".minicarttotalpoint").html(data.cart_total_points);
		}else{
			alert(lodo_lang_js.functions.tip_21,0);	
		}
																	  
	})
	
}

//重新加载浏览记录相关信息
function shop_browse_load(){
	$("#shop_ff_cart_info").html("<img src='"+lodo_web_path+"js/ajax-loader.gif' title='"+lodo_lang_js.functions.tip_17+"'>"+lodo_lang_js.functions.tip_20);
	$.get(lodo_web_path+"ajax_cart_data.asp?act=loadvisit",function(data){
		$("#shop_ff_browse_info").html(data);
		$("#ff_shop_browse_totalsum").html($("input[name='lodo_goods_visit_id']").size());
	});
}

//重新加载收藏夹相关信息
function shop_collection_load(){
	if($("#ff_shop_collection_list")[0]){
		$("#ff_shop_collection_list").html("<img src='"+lodo_web_path+"js/ajax-loader.gif' title='"+lodo_lang_js.functions.tip_17+"'>"+lodo_lang_js.functions.tip_20);
		$.get(lodo_web_path+"ajax_cart_data.asp?act=loadcollection",function(data){
			$("#ff_shop_collection_list").html(data);
			$("#ff_shop_collection_totalsum").html($("input[name='lodo_goods_collection_id']").size());
		});
	}
}

//重新加载购物车相关信息
function shop_cart_load(){
	$("#shop_top_cart_info,#shop_ff_cart_info").html("<img src='"+lodo_web_path+"js/ajax-loader.gif' title='"+lodo_lang_js.functions.tip_17+"'>"+lodo_lang_js.functions.tip_20);
	$.get(lodo_web_path+"ajax_cart_data.asp?act=loadcart",function(data){
		tmp_data=data.split("<!--/</#_#/>/-->");
		if($("#shop_top_cart_info")[0]){$("#shop_top_cart_info").html(tmp_data[0]);}
		if($("#shop_ff_cart_info")[0]){
			$("#shop_ff_cart_info").html(tmp_data[1]);
			$("#ff_shop_cart_totalsum").html($("input[name='lodo_goods_cart_id']").size());
		}
	})
}

function ajax_loadMsg(options){
	this.options={
			objid:null,
			Complete:null,
			Error:null,
			Send:null,
			Start:null,
			Success:null,
			Stop:null
		}
	if(options!="undefined"){$.extend(this.options, options);}
	var config=this.options;
	var obj=$(config.objid);
	if(config.Complete!=null){obj.ajaxComplete(config.Complete);}
	if(config.Error!=null){obj.ajaxError(config.Error);}
	if(config.Send!=null){obj.ajaxSend(config.Send);}
	if(config.Start!=null){obj.ajaxStart(config.Start);}
	if(config.Success!=null){obj.ajaxSuccess(config.Success);}
	if(config.Stop!=null){obj.ajaxStop(config.Stop);}
}

var ajax_tip_loadno=false;

function tb_detectMacXFF() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}

function bg_showmask(){
	if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
		$("body","html").css({height: "100%", width: "100%"});
		$("html").css("overflow","hidden");
		if (document.getElementById("TB_tip_maskHideSelect") === null) {//iframe to hide select elements in ie6
			$("body").append("<iframe id='TB_tip_maskHideSelect'></iframe><div id='TB_tip_maskoverlay'></div><div id='TB_tip_maskwindow'></div>");
		}
	}else{//all others
		if(document.getElementById("TB_tip_maskoverlay") === null){
			$("body").append("<div id='TB_tip_maskoverlay'></div><div id='TB_tip_maskwindow'></div>");
		}
	}
	if(tb_detectMacXFF()){
		$("#TB_tip_maskoverlay").addClass("TB_tip_overlayMacFFBGHack");//use png overlay so hide flash
	}else{
		$("#TB_tip_maskoverlay").addClass("TB_tip_overlayBG");//use background and opacity
	}
	var maskDiv=$("<div id='TB_tip_maskLoad'></div>").html($("#ajax_loading_msg").html()).hide();
	$("body").append(maskDiv);
	$("#TB_tip_maskLoad").show();
}

function bg_closeMaskDiv(){
	$("#TB_tip_maskLoad,#TB_tip_maskoverlay,#TB_tip_maskHideSelect,#TB_tip_maskwindow").remove();
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		$("body","html").css({height: "auto", width: "auto"});
		$("html").css("overflow","");
	}
	return false;
}


//初始化
$(function(){
	//ajax加载初始设置
	ajax_loadMsg({objid:"#ajax_loading_msg",Complete:function(){
			if(ajax_tip_loadno){bg_closeMaskDiv();ajax_tip_loadno=false;}
		},Start:function(){
			if(ajax_tip_loadno){bg_showmask();}
		},Error:function(event,request,settings){
			//alert("出错页面:"+settings.url+"\n信息:"+request.responseText);
		}
	});
	//页面购物车信息处理
	ShopCart();
	ChExpand();
	buildsubmenus();
	setuser();
	loadaddgoodstocart();
   //捆绑事件
	ShopingToCart();
   //投票
	load_vote();
   //验证码
	load_getcode_set();
})

function load_getcode_set(){
	$("span[id$='_img'] img.code").live("click",function(){
		$(this).attr("src",lodo_web_path+"js/ajax-loader.gif?bn="+Math.random());
		$(this).attr("src",lodo_web_path+"inc/getcode.asp?"+Math.random());
	});
	$("input.getcode").live("focus",function(){
		var formobj=$(this).parentsUntil("form");
		var iName=$(this).attr("id");
		var imgObj=formobj.find("#"+iName+"_img");
		imgObj.find("img.code:first").click();
		imgObj.show();
	});
}

function loadding(e,title,loadcls,shtyp){
	if(title==undefined){title="";}
	if(shtyp==undefined){shtyp=1;}
	if(loadcls==undefined){loadcls="";}
	var tmp_obj=e;
	if(typeof(tmp_obj)=="string"){tmp_obj=$("#"+tmp_obj);}
	tmp_obj=$(tmp_obj);
	var loaddiv=tmp_obj.next("span.loaddiv");
	if(loaddiv.size()<=0){loaddiv=$("<span class='loaddiv "+loadcls+"'><img src='"+lodo_web_path+"js/ajax-loader.gif'><em>"+title+"</em></span>");}
	tmp_obj.after(loaddiv);
	if(shtyp==1){
		tmp_obj.show();
	}else{
		tmp_obj.hide();
	}
	loaddiv.show();
}

function removeloadding(e){
	var tmp_obj=e;
	if(typeof(tmp_obj)=="string"){tmp_obj=$("#"+tmp_obj);}
	$(tmp_obj).show().next("span.loaddiv").remove();
}

//投票
function load_vote(){
	$("#btn_vote_save").click(function(){
		//alert($("#Vform").size());
		$("#Vform").ajaxForm();
		return false;
	});
}

function fix_CartBtn_show(dominfo,tipno){
	var fc=$("#fix-CartBtn");
	if(!fc[0]){
		fc=$("<div id='fix-CartBtn'></div>");
		fc.css({"position":"absolute","background":"#ffffff","zIndex":2000,"opacity":.3,"left":"0px","top":"0px"}).hide();
		$(document.body).append(fc);
	}
	$(dominfo).each(function(){
		$(this).append(fc);
		fc.css({"width":$(this).width()+"px","height":$(this).height()+"px","left":"0px","top":"0px"}).show();
		var position=fc.position();
	});
}
function fix_CartBtn_hide(){
	$("#fix-CartBtn").hide();
}

//提示
var MessageBox=new function(){
	function createBox(msg,a){
		var b=$("<div></div>");
		b.css({position:"absolute",zIndex:99999,left:($(window).width()/2-140)+"px","top":($(window).height()/2+$(document).scrollTop()-80)+"px"}).hide();
		$("body").append(b);		
		b.addClass(a).html("<ul style='clear:both;height: 33px;'><li style='float:left;width:38px; height:33px; background:url("+lodo_web_path+"images/Control/aL.gif);'></li><li style='float:left;background-image: url("+lodo_web_path+"images/Control/aM.gif);font-size: 16px;font-weight: bold;background-color: #FFCC00;height:33px; line-height:33px; white-space:nowrap;'>"+msg+"</li><li style='float:left;width:5px; height:33px; background:url("+lodo_web_path+"images/Control/ar.gif);'></li></ul>").show().delay(3000).animate({left:0,opacity:0},1000,function(){$(this).remove();});
		return b;
	}
	return {
		error:function(b,a){
			return createBox(b||lodo_lang_js.functions.tip_23,"err_msginfo");
		},
		success:function(b,a){
			return createBox(b||lodo_lang_js.functions.tip_24,"success");
		},
		show:function(b,a){
			return createBox(b||lodo_lang_js.functions.tip_24,"success");
		}
	}
}
//关闭操作成功时的提示信息
function hiddenMsg(){$("#msgInfo").remove();}
//显示操作成功时的提示信息
function MsgInfoShow(msg){
	//scroll(0,0);
	MessageBox.error(msg);
}


var chtype="";
var pass_formname=null;//要提交的表单名
var pass_options={};//要提交的表单options数据

function submitform(url,formname,return_type,r_exte){
	var r_type="html";
	if(formname==undefined||formname==null||formname==""){pass_formname=$("#upform");}else{pass_formname=$("#"+formname);}
	if(url!=""||url==undefined){pass_formname.attr("action",url);}
	if(return_type!=""&&return_type!=undefined){r_type=return_type;}
	if(r_type=="ajax"){
		pass_options={
			dataType:"json",
			success:function(data){
				if($.isFunction(r_exte)){r_exte(data);}
				if(data.gotono){location.href=data.gotourl.replace("&amp;","&");}
				if(data.msgno){MsgInfoShow(data.msg);}
				if(data.errno){alert(data.msg);return false;}
				return false;
			}
		}
	}
	if(r_type=="ajax"){pass_formname.ajaxSubmit(pass_options);}else{pass_formname.submit();}
}