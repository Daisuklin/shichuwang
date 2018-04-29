/*
-------------------------------------------------------------
*****************  乐度网店系统(lodoeshop)  *****************

作者：福州市好格网络技术有限公司
网站：http://www.lodoeshop.com
版权：版权属于福州市好格网络技术有限公司，不得拷贝、修改，侵权必究。

*************************************************************
-------------------------------------------------------------
*/
var lodo_web_path="/";//网站路径
var lodo_DecimalPoint=1;//是否有小数点(1有,0没有)
var lodo_lang_yuan=lodo_lang_js.func.yuan;//金额符号
function FormatNumber(srcStr,nAfterDot){
　　var resultStr,nTen;
	if(lodo_DecimalPoint==0){
		resultStr=parseInt((srcStr*1)+0.5);
		return resultStr;
	}
	srcStr = ""+srcStr+"";
　　strLen = srcStr.length;
　　dotPos = srcStr.indexOf(".",0);
　　if (dotPos == -1){
　　　　resultStr = srcStr+".";
　　　　for (FNi=0;FNi<nAfterDot;FNi++){
　　　　　　resultStr = resultStr+"0";
　　　　}
　　　　return resultStr;
　　}else{
　　　　if ((strLen - dotPos - 1) >= nAfterDot){
　　　　　　nAfter = dotPos + nAfterDot + 1;
　　　　　　nTen =1;
　　　　　　for(FNj=0;FNj<nAfterDot;FNj++){
　　　　　　　　nTen = nTen*10;
　　　　　　}
　　　　　　resultStr = Math.round(parseFloat(srcStr)*nTen)/nTen;
　　　　　　return resultStr;
　　　　}else{
　　　　　　resultStr = srcStr;
　　　　　　for (FNi=0;FNi<(nAfterDot - strLen + dotPos + 1);FNi++){
　　　　　　　　resultStr = resultStr+"0";
　　　　　　}
　　　　　　return resultStr;
　　　　}
　　}
}


if(!Array.prototype.indexOf){
	Array.prototype.indexOf=function(B){
		var A=this.length;
		var C=Number(arguments[1])||0;
		C=(C<0)?Math.ceil(C):Math.floor(C);
		if(C<0){C+=A}
		for(;C<A;C++){
			if(C in this&&this[C]===B){return C}
		}
	return -1}
}

if(!Array.prototype.lastIndexOf){
	Array.prototype.lastIndexOf=function(B){
		var A=this.length;
		var C=Number(arguments[1]);
		if(isNaN(C)){
			C=A-1
		}else{
			C=(C<0)?Math.ceil(C):Math.floor(C);
			if(C<0){
				C+=A
			}else{
				if(C>=A){C=A-1}
			}
		}
		for(;C>-1;C--){
			if(C in this&&this[C]===B){return C}
		}
		return -1
	}
}


Array.prototype.remove=function(A){
	var B=this.indexOf(A);
	if(B!=-1){this.splice(B,1)}
};

String.prototype.length2 = function(){
    var cArr = this.match(/[^x00-xff]/ig);
    return this.length + (cArr == null ? 0 : cArr.length);
}

String.prototype.replaceAll=function(pattern,text,ignoreCase) { 
	if(RegExp.prototype.isPrototypeOf(pattern)) {alert(lodo_lang_js.func.replaceerr);return;}
	return this.replace(new RegExp(pattern,"gi"),text);
}

function isDigit(s){
	var patrn=/^[0-9]{1,20}$/;
	if (!patrn.exec(s)) return false
	return true
}

function isfloat(sDouble){
  var re = /^\d+(?=\.{0,1}\d+$|$)/;
  return re.test(sDouble);
}

function substitute(S,E,L){
	var I,H,G,O,P,R,N=[],F,J="dump",M=" ",D="{",Q="}";
	for(;;){
		I=S.lastIndexOf(D);
		if(I<0){break;}
		H=S.indexOf(Q,I);
		if(I+1>=H){break;}
		F=S.substring(I+1,H);
		O=F;
		R=null;
		G=O.indexOf(M);
		if(G>-1){R=O.substring(G+1);O=O.substring(0,G);}
		P=E[O];
		if(L){P=L(O,P,R);}
		if(!(typeof(P)=="string")&&!((typeof(P)=="number")&&isFinite(P))){
			P="~-"+N.length+"-~";
			N[N.length]=F;
		}
		S=S.substring(0,I)+P+S.substring(H+1);
	}
	for(I=N.length-1;I>=0;I=I-1){
		S=S.replace(new RegExp("~-"+I+"-~"),"{"+N[I]+"}","g");
	}
return S;
}

function selChAll(myform){
	var checked=$(myform).find("#ChAll").attr("checked")=="checked"?true:false;
	$(myform).find("input:checkbox[name='chid'],input:checkbox[name='hotID']").attr("checked",checked);
}

/*function ifQ(e,eID,lv,lvtype){
	var tempQ=$('#lodo_goods_quantity_'+eID);
	if(!isDigit(e.value)){
		alert('只能由数字组成！');
		e.value=lv;
		e.focus();
		return false;
	}
	if((eval(tempQ.val())!=-1)&&(eval(tempQ.val())<eval(e.value))&&eval(tempQ.val())>0){
		alert("此商品最多只能购买"+tempQ.value+"件");
		e.value=lv;
		e.focus();
		return false;
	}

if(lvtype==0){
if ( (e.value<=0 || (e.value % lv) != 0)){
		alert("购买数量只能是"+lv+"的整数倍！");
		e.value=lv;
		e.focus();
		return false;
	}
}else{
	if(e.value<lv){
		alert("此商品最低购买量不能少于"+lv+"件");
		e.value=lv;
		e.focus();
		return false;
		}
	}
}*/


/*获取页面高度*/
function scrollPos(){
if (typeof window.pageYOffset != 'undefined') { 
    return window.pageYOffset;
} 
else if (typeof document.compatMode != 'undefined' && 
      document.compatMode != 'BackCompat') { 
    return document.documentElement.scrollTop; 
} 
else if (typeof document.body != 'undefined') { 
    return document.body.scrollTop; 
}
}

//属性扩展
function augmentObject(l,k){
	if(!k||!l){
		throw new Error("Absorb failed, verify dependencies.")
	}
	for(var m in k){
		if(!(m in l)){l[m]=k[m]}
	}
	return l;
}


var HomepageFavorite = {
    //设为首页
    Homepage: function () {
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(window.location.href);
        }
        else if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true");
                    history.go(-1);
                }
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', window.location.href);
        }
    }
    ,
    //加入收藏
    Favorite: function Favorite(sURL, sTitle) {
        try {
            window.external.addFavorite(sURL, sTitle);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "");
            }
            catch (e) {
                alert(lodo_lang_js.func.favoriteErr);
            }
        }
    }
}


//加入收藏夹
function addfavorite(Url,NameStr){
	HomepageFavorite.Favorite(Url,NameStr);
}

//设为首页
function setHomePageInFF(Url){
	HomepageFavorite.Homepage();
}

function showGoodsClass(){
	var ClassList=$("#all-categoriesx");
	if(ClassList[0]){
		if(!ClassList.html()||ClassList.html()=="Loading..."){
			ClassList.html("Loading...");
			ClassList.load(lodo_web_path+"GoodsClassList.asp?bn="+Math.random());
		}
	}
}

//弹窗
var dialog_cls=function(url,title,typ,options){
	var lodo_tmp_tc_info=$("#lodo_tmp_tc_info");
	if(!lodo_tmp_tc_info[0]){lodo_tmp_tc_info=$("<div id='lodo_tmp_tc_info'></div>");}else{lodo_tmp_tc_info.dialog("close");}
	$("body").append(lodo_tmp_tc_info);
	lodo_tmp_tc_info.html(lodo_lang_js.func.loadding);
	var tmp_options={
		title:title,
		width: "auto",
		modal: true,
		resizable:false,
		close:function(){
			lodo_tmp_tc_info.remove();
		}
	}
	if(options){$.extend(tmp_options,options);}
	lodo_tmp_tc_info.dialog(tmp_options);
	function showdialog(data,title,options){
	var lodo_tmp_tc_info=$("#lodo_tmp_tc_info");
	if(!lodo_tmp_tc_info[0]){lodo_tmp_tc_info=$("<div id='lodo_tmp_tc_info'></div>");}else{lodo_tmp_tc_info.dialog("close");}
	$("body").append(lodo_tmp_tc_info);
		lodo_tmp_tc_info.html(data);
		lodo_tmp_tc_info.dialog(tmp_options);
	}
	
	if(typ=="html"){
		showdialog(url,title);
		return false;
	}
	ajax_tip_loadno=true;
	$.get(url,function(data){
		showdialog(data,title);
	})
}
//图片本地浏览事件
function getFullPath(obj){ 
    if(obj){ 
        if($.browser.msie){// ie
            obj.select();
            return document.selection.createRange().text; 
        }
        else if($.browser.mozilla){ // firefox
            if(obj.files){ 
                return obj.files.item(0).getAsDataURL(); 
            } 
            return obj.value;
        } 
        return obj.value;
    }
}
function imagePreview(fileId, imgId){
    var fullPath;
    if(typeof FileReader === 'undefined'){
        $("#" + fileId).change( function(){
            // 对html5中FileReader支持的，用它，如在Chrome中
            fullPath = getFullPath( this );
            $("#"+imgId).show().attr("src", fullPath);
        });
    }else{
        $("#" + fileId).change( function(){
            var file = this.files[0];
            if(!/image\/\w+/.test(file.type)){
                alert(lodo_lang_js.func.nopicext);
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e){
                fullPath = e.target.result;
                $("#"+imgId).show().attr("src", fullPath);
            }
        });
    }
}
//判断是否手机站
function uaredirect(murl){  
    try {
            if(document.getElementById("bdmark") != null){  
                return;  
            }  
            var urlhash = window.location.hash;  
            if (!urlhash.match("fromapp")){  
                if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i))) {  
                        location.replace(murl);  
                }  
            }  
        } catch(err){}  
}