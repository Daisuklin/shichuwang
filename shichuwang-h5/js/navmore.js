var navmore = {
	init:function(){
		this.show()
		this.more()
		this.more1()
		this.bordercolor('.list-nav-div1-ul')
		this.bordercolor('.list-nav-div2-ul')
		this.bordercolor('.list-nav-div3-ul')
		this.xiamian()
		this.huanse()
	},
	show:function(){
		$('.con_button').click(function(){
			var gao = $('.list-nav-xl').height()
			if(gao==0){
				$('.list-nav-xl').animate({
				       height:'50rem'
			        },650)
			}else{
				$('.list-nav-xl').animate({
				       height:'0'
			        },550)
			}
			
		})
	},
	huanse:function(){
		$('.new-change-eleven').click(function(){
			$('.new-change-eleven').removeClass('active')
			$(this).addClass('active')
		})
	},
	more:function(){
		$('.list-nav-div2-more').click(function(){
			var changdu = $(this).parent().find('li').length
			var sum = Math.ceil(changdu/6)*1.75
			var gao = $(this).parent().height()
			if(gao==56){
				$(this).find('a .list-nav-div2-more-span').css('backgroundImage','url(images/list-pic/top1.png)')
				$(this).parent().animate({
					height:sum+'rem'
				})
			}else{
				$(this).find('a .list-nav-div2-more-span').css('backgroundImage','url(images/list-pic/bottom1.png)')
				$(this).parent().animate({
					height:'3.5rem'
				})
			}
		})
	},
	more1:function(){
			$('.list-nav-div3-more').click(function(){
			var changdu = $(this).parent().find('li').length
			var sum = Math.ceil(changdu/6)*1.6
			var gao = Math.ceil($(this).parent().height())
			if(gao==26){
				$(this).find('a .list-nav-div3-more-span').css('backgroundImage','url(images/list-pic/top1.png)')
				$(this).parent().animate({
					height:sum+'rem'
				})
			}else{
				$(this).find('a .list-nav-div3-more-span').css('backgroundImage','url(images/list-pic/bottom1.png)')
				$(this).parent().animate({
					height:'1.6rem'
				})
			}
		})
	},
	bordercolor:function(a){
		$(''+a+' li').click(function(){
			$(''+a+' li').css('border','1px solid #fff')
			$(''+a+' li a').removeClass('yangshi-active')
			$(this).find('a').addClass('yangshi-active')
			$(this).css('border','1px solid #e7301e')
		})
	},
	xiamian:function(){
		$('.djhuiqu').click(function(){
			$('.list-nav-xl').animate({
				height:'0'
			},550)
		})
	}
}
navmore.init()