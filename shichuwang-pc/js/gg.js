/*
-------------------------------------------------------------
*****************  乐度网店系统(lodoeshop)  *****************

作者：福州市好格网络技术有限公司
网站：http://www.lodoeshop.com
版权：版权属于福州市好格网络技术有限公司，不得拷贝、修改，侵权必究。

*************************************************************
-------------------------------------------------------------
*/
var Syfullscreen=true;
var TemphiddenLayer=document.getElementById('interstitialframe');
function changediv(){
	TemphiddenLayer.style.display = "block";
	setTimeout("hidediv()",STime*1000)
}
function hidediv(){
	TemphiddenLayer.style.display="none";
	SYtag=2;
}
function showfull(){
setTimeout("changediv()",200); 
}
showfull();