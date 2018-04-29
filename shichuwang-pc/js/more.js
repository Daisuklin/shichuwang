var more = {
	init:function(){
		this.more('.more','.main-nav-ul1-1')
		this.more('.more1','.main-nav-ul2')
	},
	more:function(a,b){
		$(a).click(function(){
			var changdu = $(''+b+' li').length
			var sum= Math.ceil(changdu/17)
			var gao = $(b).height()
			if(gao==24){
				 $(b).animate({
				     height:sum*24+'px'
			     })
			}else{
				 $(b).animate({
				     height:'24px'
			     })
			}
			
		})
	}
}
more.init()