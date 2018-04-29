var conversion = {
	init:function(){
		this.zhuanhuan()
		this.zhuanhuan1()
	},
	zhuanhuan:function(){
		$('.new-change-eleven-a').click(function(){
			$('.new-change-eleven-a1').css('display','inline-block')
			$('.new-change-eleven-a').hide()

		})
	},
	zhuanhuan1:function(){
		$('.new-change-eleven-a1').click(function(){
			$('.new-change-eleven-a').css('display','inline-block')
			$('.new-change-eleven-a1').hide()

		})
	}
}
conversion.init()