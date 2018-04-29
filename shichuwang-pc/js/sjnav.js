
var sjnav={
	init:function(){
		this.odh()
		this.odh2()
	},
	odh:function(){
		$('.f2-ul .f2-ul-li .f2-ul-li-span').click(function(){
			var index = $('.f2-ul .f2-ul-li .f2-ul-li-span').index(this)
			var sum = $(this).parent().find('.f2-ul-li2').length
			if($('.f2-ul-li-ul').eq(index).height()==0){
				$(this).css("backgroundImage","url(images/cpt/jian1.png)"); 
				$('.f2-ul-li-ul').eq(index).animate({
					height:35*sum
				})
			}else{
				$(this).css("backgroundImage","url(images/cpt/push1.png)"); 
				$('.f2-ul-li-ul').eq(index).animate({
					height:'0px'
				})
			}

		})
	},
	odh2:function(){
		$('.f2-ul-li-ul .f2-ul-li2 .f2-ul-li2-span2').click(function(){
			var index = $('.f2-ul-li-ul .f2-ul-li2 .f2-ul-li2-span2').index(this)
			var sum = $(this).parent().find('.f2-ul-li2-ul li').length
			var gao = $('.f2-ul-li2-ul').eq(index).height()
			var fjgao = $(this).parent().parent().height()
			if(gao==0){
				$(this).css("backgroundImage","url(images/cpt/jian1.png)"); 
				var zgao=fjgao+sum*30
				$(this).parent().parent().animate({
					height:zgao
				})
				$('.f2-ul-li2-ul').eq(index).animate({
					height:30*sum+'px'
				})
			}else{
				$(this).css("backgroundImage","url(images/cpt/push1.png)");
				var jiangao=$(this).parent().parent().height()
				var bgao = $('.f2-ul-li2-ul').eq(index).height()
				var bejgao = jiangao -bgao
				$(this).parent().parent().animate({
					height:bejgao
				})
				$('.f2-ul-li2-ul').eq(index).animate({
					height:'0px'
				})
			}
		})
	}
}
sjnav.init()