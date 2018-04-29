// JavaScript Document
var Speed = 10; //速度(毫秒)
	var Space = 20; //每次移动(px)
	var PageWidth = 182 * 1; //翻页宽度
	var interval = 3000; //翻页间隔时间
	var fill = 0; //整体移位
	var MoveLock = false;
	var MoveTimeObj;
	var MoveWay="right";
	var Comp = 0;
	var AutoPlayObj=null;
	function GetObj(objName){if(document.getElementById){return eval('document.getElementById("'+objName+'")')}else{return eval('document.all.'+objName)}}
	function AutoPlay(){clearInterval(AutoPlayObj);AutoPlayObj=setInterval('ISL_GoDown();ISL_StopDown();',interval)}
	function ISL_GoUp(){if(MoveLock)return;clearInterval(AutoPlayObj);MoveLock=true;MoveWay="left";MoveTimeObj=setInterval('ISL_ScrUp();',Speed);}
	function ISL_StopUp(){if(MoveWay == "right"){return};clearInterval(MoveTimeObj);if((GetObj('ISL_Cont').scrollLeft-fill)%PageWidth!=0){Comp=fill-(GetObj('ISL_Cont').scrollLeft%PageWidth);CompScr()}else{MoveLock=false}
	AutoPlay()}
	function ISL_ScrUp(){if(GetObj('ISL_Cont').scrollLeft<=0){GetObj('ISL_Cont').scrollLeft=GetObj('ISL_Cont').scrollLeft+GetObj('List1').offsetWidth}
	GetObj('ISL_Cont').scrollLeft-=Space}
	function ISL_GoDown(){clearInterval(MoveTimeObj);if(MoveLock)return;clearInterval(AutoPlayObj);MoveLock=true;MoveWay="right";ISL_ScrDown();MoveTimeObj=setInterval('ISL_ScrDown()',Speed)}
	function ISL_StopDown(){if(MoveWay == "left"){return};clearInterval(MoveTimeObj);if(GetObj('ISL_Cont').scrollLeft%PageWidth-(fill>=0?fill:fill+1)!=0){Comp=PageWidth-GetObj('ISL_Cont').scrollLeft%PageWidth+fill;CompScr()}else{MoveLock=false}
	AutoPlay()}
	function ISL_ScrDown(){if(GetObj('ISL_Cont').scrollLeft>=GetObj('List1').scrollWidth){GetObj('ISL_Cont').scrollLeft=GetObj('ISL_Cont').scrollLeft-GetObj('List1').scrollWidth}
	GetObj('ISL_Cont').scrollLeft+=Space}
	function CompScr(){if(Comp==0){MoveLock=false;return}
	var num,TempSpeed=Speed,TempSpace=Space;if(Math.abs(Comp)<PageWidth/2){TempSpace=Math.round(Math.abs(Comp/Space));if(TempSpace<1){TempSpace=1}}
	if(Comp<0){if(Comp<-TempSpace){Comp+=TempSpace;num=TempSpace}else{num=-Comp;Comp=0}
	GetObj('ISL_Cont').scrollLeft-=num;setTimeout('CompScr()',TempSpeed)}else{if(Comp>TempSpace){Comp-=TempSpace;num=TempSpace}else{num=Comp;Comp=0}
	GetObj('ISL_Cont').scrollLeft+=num;setTimeout('CompScr()',TempSpeed)}}
	function picrun_ini_1(){
	GetObj("List2").innerHTML=GetObj("List1").innerHTML;
	GetObj('ISL_Cont').scrollLeft=fill>=0?fill:GetObj('List1').scrollWidth-Math.abs(fill);
	GetObj("ISL_Cont").onmouseover=function(){clearInterval(AutoPlayObj)}
	GetObj("ISL_Cont").onmouseout=function(){AutoPlay()}
	AutoPlay();
	}	