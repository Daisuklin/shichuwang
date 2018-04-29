var cpqhObj={
	init:function(){
		this.qiehuayi()
		this.qiehuayi1()
		this.qiehuayi2()
	},
	qiehuayi:function(){
		$('.main-nav-ul li').click(function(){
			$('.main-nav-ul li a').removeClass('main-nav-mr')
			$('.main-nav-ul li a').eq($('.main-nav-ul li').index(this)).addClass('main-nav-mr')
		})
	},
	qiehuayi1:function(){
		$('.main-nav-ul1-1 li').click(function(){
			$('.main-nav-ul1-1 li a').removeClass('main-nav-mr')
			$('.main-nav-ul1-1 li a').eq($('.main-nav-ul1-1 li').index(this)).addClass('main-nav-mr')
		})
	},
	qiehuayi2:function(){
		$('.main-nav-ul2 li').click(function(){
			$('.main-nav-ul2 li a').removeClass('main-nav-mr')
			$('.main-nav-ul2 li a').eq($('.main-nav-ul2 li').index(this)).addClass('main-nav-mr')
		})
	}
}
cpqhObj.init()