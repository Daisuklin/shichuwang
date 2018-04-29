
//导航
$(function(){
	$("#nav").bind("click",function(){				
		if(!$(this).is(".njian")){
			$(this).removeClass("njia").addClass("njian");
			$(this).parent().parent().find(".nav_con").fadeIn();
		}else{
			$(this).removeClass("njian").addClass("njia");
			$(this).parent().parent().find(".nav_con").fadeOut();
		}
	});
})


//学校新闻
function nTab(thisObj,Num){ 
	if(thisObj.className == "active")return; 
		var tabObj = thisObj.parentNode.id; 
		var tabList = document.getElementById(tabObj).getElementsByTagName("li"); 
	for(i=0; i <tabList.length; i++) 
	{ 
		if (i == Num) 
		{ 
	   		thisObj.className = "active"; 
		  	document.getElementById(tabObj+"_Content"+i).style.display = "block"; 
		}else{ 
	   		tabList[i].className = "normal"; 
	   		document.getElementById(tabObj+"_Content"+i).style.display = "none"; 
		} 
	} 
}



//选择数量
function addUpdate(jia){		
	var c = jia.parent().find(".n_ipt").val();
	c=parseInt(c)+1;	
	jia.parent().find(".n_ipt").val(c);
}

function jianUpdate(jian){    
	var c = jian.parent().find(".n_ipt").val();
	if(c==1){    
		c=1;    
	}else{    
		c=parseInt(c)-1;    
		jian.parent().find(".n_ipt").val(c);
	}
} 

