        var Filter = function(){
            this.active = null;//显示的filter
            this.tipsArray = [];//提示二维数组
            this.selectArray = [];//已选择的项二维数组
            this.tipsWidth = 0;//提示的宽度
            this.cityList = {};
            this.cityIndex = 0;
            this.currentCity = null;
        };
        Filter.prototype = {
            constructor : Filter,
            init : function(){
                var self = this;
                this.bindEvent();
                //界面设置
                this.tipsWidth = $('.sf_layer').width() - 128;
                $('.words_10').css({'max-width' : this.tipsWidth});
                $('.right .words_10').css({'max-width' : this.tipsWidth - 10});
                $(".mod_list .mid_list_hr").css({'width' : $('.sf_layer').width() + 20});
                $(".mod_list .sub_list_hr").css({'width' : $('.sf_layer').width() + 10});
            },
            bindEvent : function(){
                $('.arrow_li').on('click', $.proxy(this.showFilter, this));
                $('#filterBBtn').on('click', $.proxy(this.cancel, this));
                $('.option').on('click', $.proxy(this.selectDeliver, this));
                $('.check_li').on('click', $.proxy(this.check_li, this));
                $('.with_sub_title').on('click', '.super_li', $.proxy(this.open_li, this))
                    .on('click', '.areaSelect', $.proxy(this.selectArea, this))
                    .on('click', '.mid_list', $.proxy(this.open_li, this));
                $('.with_sub_title').on('click', '.super_li_city', $.proxy(this.showArea, this));
                //$('.sub_list li').on('click', $.proxy(this.selectCate, this));
                $("[filter-type=type]").on('click', $.proxy(this.selectCate, this));
                $("[filter-type=category]").on('click', $.proxy(this.selectCate, this));
                $("[filter-type=brand]").on('click', $.proxy(this.selectCate, this));
                $('#filterSureBtn').on('click', $.proxy(this.sure, this));
                $('[btntype=filterPriceBtn]').on('click', $.proxy(this.priceSure, this));
                $('#filterClearBtn').on('click', $.proxy(this.flushAll, this));
            },
            showFilter : function(e){
                var self = this;
                $elem = $(e.currentTarget);
                this.setTips('');
                console.info($elem.data('filter') + "-content");
                this.active = $elem.data('filter');
                $('.sf_layer_con').hide();

                if(!$elem.data('filter')){
                    //地区
                    console.info($.trim($elem.text()));
                    self.currentCity = $.trim($elem.text());
                    var cityData = this.cityList.citylist;
                    var cityIndex = 0;
                    cityData.forEach(function(e, i){
                        if(e.p.indexOf(self.currentCity) > -1){
                            cityIndex = i;
                            self.cityIndex = i;
                            return;
                        }
                    })
                    console.info(cityData[cityIndex]);

                    var cityList = "";                  
                    //城市：
                    cityData[cityIndex].c.forEach(function(e, i){
                        cityList += "<li class=\"super_li_city\"><div class=\"list_inner\"><div class=\"big\">"+e.n+"<\/div><div class=\"right\"><\/div><ul class=\"sub_list hide_define\">";
                        var array = e.n + '内';
                        if(!(e.a instanceof Array)) e.a = [{'s':array}];
                        e.a.forEach(function(area, areaIndex){
                            cityList += "<li class=\"areaSelect\" cid=\"798\" cname=\""+area.s+"\" fname=\""+self.currentCity+"-"+e.n+"-"+area.s+"\" rd=\"0-11-5\"><div class=\"list_inner\" rd=\"0-11-5\"><div class=\"big\" rd=\"0-11-5\">"+area.s+"<span class=\"small\" rd=\"0-11-5\"><\/span><\/div><\/div><\/li>";
                        })
                        cityList += "<\/ul><\/div><\/li>";
                    })
                    
                    $(".city-content .mod_list").empty();
                    $(".city-content .mod_list").append(cityList);
                    // if(localStorage.getItem('selectedArea')) this.setTips(localStorage.getItem('selectedArea'))
                    $('.city-content').show();
                }

                var name = $(e.currentTarget).data('filter');
                var $content = $("." + name + "-content");
                $content.show()
                $('#filterSelBlock').show();
                

                //按钮
                $('#filterCBtn').hide();
                $('#filterBBtn').show();
                $('#filterFinishBtn').hide();
                if($elem.attr('data-filter') !== 'price') $('#filterSureBtn').show();

                //清除所有选择的项
                $content.find('.check_li').removeClass('checked');

                //从数组中读出上次选择的项目
                if(this.selectArray[name] != undefined){
                    for(var i = 0; i < this.selectArray[name].length;i++){
                        $('[tname='+this.selectArray[name][i]+']').addClass('checked');
                    }                   
                }


                var $checked_li = $('.'+$elem.data('filter')+'-content').find('.checked');
                if($elem.hasClass('category')){
                    //分类
                    var text = $checked_li.attr('fname');
                    this.setTips(text);
                }else if($elem.attr('filter-type') == 'area'){
                    this.setTips(self.currentCity);
                }else{
                    var arr = this._arr_factory($elem.attr('filter-type'));
                    arr.length = 0;

                    for(var i = 0; i < $checked_li.length; i++){
                        this._arr_factory($elem.attr('filter-type')).push($checked_li.eq(i).attr('tname'));
                    }
                    this.setTips(this._arr_factory($elem.attr('filter-type')).join('、'));
                    $('.etc').remove();
                    if($('#filterSelTips').width() > this.tipsWidth - 5){
                        $('#filterSelBlock').append('<span class="etc">等'+this._arr_factory($elem.attr('filter-type')).length+'项</span>');
                    }
                }
            },
            _arr_factory : function(name){
                if(typeof(this.tipsArray[name]) == "undefined"){
                    //没有定义！
                    this.tipsArray.push(name);
                    this.tipsArray[name] = new Array();
                    return this.tipsArray[name];
                }else{
                    return this.tipsArray[name];
                }
            },
            showArea : function(e){
                var self = this;
                console.info($(e.currentTarget).find('.big').eq(0).text());
                var city = $(e.currentTarget).find('.big').eq(0).text();
                this.setTips($('#filterSelTips').text()+'-'+city);
                var cityList = "";                  
                //城市：
                this.cityList.citylist[this.cityIndex].c.forEach(function(e, i){
                    
                    var array = e.n + '内';
                    if(!(e.a instanceof Array)) e.a = [{'s':array}];
                    e.a.forEach(function(area, areaIndex){
                        if(e.n == city)
                            cityList += "<li class=\"areaSelect\" fname=\""+self.currentCity+"-"+e.n+"-"+area.s+"\"><div class=\"list_inner\"><div class=\"big\">"+area.s+"<\/div><div class=\"right\"><\/div><ul class=\"sub_list hide_define\"><li class=\"areaSelect\" cid=\"798\" cname=\""+area.s+"\" fname=\""+self.currentCity+"-"+e.n+"-"+area.s+"\" rd=\"0-11-5\"><div class=\"list_inner\" rd=\"0-11-5\"><div class=\"big\" rd=\"0-11-5\">"+area.s+"<span class=\"small\" rd=\"0-11-5\"><\/span><\/div><\/div><\/li><\/ul><\/div><\/li>";
                    })
                })      

                $(".city-content .mod_list").empty();
                $(".city-content .mod_list").append(cityList);
            },
            hideFilter : function(e){
                $('#filterInner').show();
                $('.with_sub_title').hide();
                $('#filterSelBlock').hide();
                //按钮
                $('#filterCBtn').show();
                $('#filterBBtn').hide();
                $('#filterFinishBtn').show();
                $('#filterSureBtn').hide();

                var $words = $('#filterInner .words_10');
                for(var i = 0; i < $words.length;i++){
                    if($words.eq(i).width() > this.tipsWidth - 16){
                        $words.eq(i).parents('.right').append('<span class="etc">等'+this._arr_factory($words.eq(i).parents('.arrow_li').attr('data-filter')).length+'项</span>');
                    }                        
                }
            },
            selectDeliver : function(e){
                $elem = $(e.currentTarget);
                if($elem.hasClass('selected')){
                    $elem.removeClass('selected');
                }else{
                    $elem.addClass('selected');
                }
            },
            check_li : function(e){
                e.stopPropagation();
                $elem = $(e.currentTarget);

                if($elem.hasClass('checked')){
                    $elem.removeClass('checked');
                }else{
                    $elem.addClass('checked');
                };

                //tips:
                var tips = $('#filterSelTips').text();
                $checked_li = $elem.parents('.with_sub_title').find('.checked');

                var arr = this._arr_factory($elem.attr('filter-type'));
                arr.length = 0;
                for(var i = 0; i < $checked_li.length; i++){
                    this._arr_factory($elem.attr('filter-type')).push($checked_li.eq(i).attr('tname'));
                }
                this.setTips(this._arr_factory($elem.attr('filter-type')).join('、'));
                $('.etc').remove();
                if($('#filterSelTips').width() > this.tipsWidth - 5){
                    $('#filterSelBlock').append('<span class="etc">等'+this._arr_factory($elem.attr('filter-type')).length+'项</span>');
                }
            },
            open_li : function(e){
                $elem = $(e.currentTarget);
                console.log($elem);
                if(!$elem.hasClass('opened')){
                    if ($elem.hasClass('mid_list'))
                        $elem.removeClass('opened').find('.sub_list').addClass('hide_define');
                    else{
                        $('.super_li').removeClass('opened').find('.sub_list').addClass('hide_define');
                        $('.super_li').find('.sub_list_hr').addClass('hide_define');

                        $('.super_li').find('.mid_list').addClass('hide_define');
                        $('.super_li').find('.mid_list_hr').addClass('hide_define');
                    }
                    
                    $elem.addClass('opened');
                    if ($elem.find('.mid_list').length > 0) {
                        $elem.find('.mid_list').removeClass('hide_define');
                        $elem.find('.mid_list_hr').removeClass('hide_define');
                    }
                    else {
                        $elem.find('.sub_list').removeClass('hide_define');
                        $elem.find('.sub_list_hr').removeClass('hide_define');
                    }
                }else{
                    $elem.removeClass('opened').find('.sub_list').addClass('hide_define');
                    $elem.find('.sub_list_hr').addClass('hide_define');
                    if ($elem.find('.mid_list').length > 0) {
                        $elem.find('.mid_list').removeClass('opened').addClass('hide_define');
                        $elem.find('.mid_list_hr').addClass('hide_define');
                    }
                }
                
                if ($elem.children('.mid_list').length == 0) 
                    return false;
            },
            selectArea : function(e){
                var selectedArea = $(e.currentTarget).attr('fname');
                $('[data-filter=area]').find('.right').text(selectedArea);
                localStorage.setItem('selectedArea', selectedArea);
                this.hideFilter();
            },
            selectCate : function(e){
                e.stopPropagation();
                $elem = $(e.currentTarget);

                console.log($elem);
//                alert(1111);
                if($elem.hasClass('checked')){
                    $elem.removeClass('check_li checked');
                }else{
                    $('.category-content').find('li').removeClass('check_li checked');
                    $elem.addClass('check_li checked').siblings().removeClass('check_li checked');
                }
                
                var type = $elem.attr('filter-type');

                if(type == 'category'){
                    type = type + "2";
                }

                var text = $elem.attr('cname');
//              $('.'+type).find('.right').text(text);
                var filterType = $elem.attr('filter-type');
                var gcid = $elem.attr('gcid');
                var bid = $elem.attr('bid');
                var m_type = $elem.attr('mType');
                if(typeof(filterType != "undefined") && filterType == "category"){
                	 $('.'+type).find('.right').html("<p name='param-serch' gcid='"+gcid+"' cname='" + text + "' f-type='" + filterType + "'> " + text + " </p>");
                }else if(typeof(filterType != "undefined") && filterType == "brand"){
                	 $('.'+type).find('.right').html("<p name='param-serch' bid='"+bid+"' cname='" + text + "' f-type='" + filterType + "'> " + text + " </p>");
                }else if(typeof(filterType != "undefined") && filterType == "type"){
                    $('.'+type).find('.right').html("<p name='param-serch' m_type='"+m_type+"' cname='" + text + "' f-type='" + filterType + "'> " + text + " </p>");
                }
                
              //alert("<p name='param-serch' cname='"+text+"' f-type="+filterType+">"+text+"</p>");
               
                this.setTips($elem.data('fname'));
                this.hideFilter();
            },
            setTips : function(text){
                $('#filterSelTips').text(text);
            },
            clearTips : function(){
                $('#filterSelTips').text('');
            },
            cancel : function(){
                try{
                    var text = this.selectArray[this.active].join('、');
                }catch(e){}
                $('[data-filter='+this.active+']').find('.words_10').text(text);
                this.hideFilter();
            },
            sure : function(){
                $active_elem = $("[data-filter="+this.active+"]");
                $active_elem.find('.words_10').text($('#filterSelTips').text());

                // var length = $('.'+this.active+'-content').find('.checked').length;
                // if($active_elem.find('.words_10').width() > this.tipsWidth - 15){
                //     $active_elem.find('.right').append('<span class="etc">等'+length+'项</span>');
                // }
                // this.selectArray = null;
                this.selectArray = this.tipsArray;
                this.hideFilter();
            },
            priceSure : function(){
                
                $active_elem = $("[data-filter="+this.active+"]");
                var text = '￥'+$('#filterMinPrice').val()+' - ￥'+$('#filterMaxPrice').val();
                $active_elem.find('.right').text(text);
                this.hideFilter();
            },
            flushAll : function(){
                $('.option').removeClass('selected');
                $('.check_li').removeClass('checked');
                $('#filterInner .right').text('');
                $('.category').find('.right').text('全部分类');
                $('.price').find('.right').text('全部价格');
            }
        }
        new Filter().init();










//筛选滑出
	$('#filterBtn').click(function(){
	    $('#sfLayerBg').addClass('show');
	    $('#filterBlock').addClass('show').animate({'right':'0'});
	});

	//完成按钮
	$('#sfLayerBg,#filterFinishBtn').click(function(){
	    $('#filterBlock').animate({'right':'-100%'},function(){
	    	$('#filterBlock').removeClass('show').addClass('hide');
	    	$('#sfLayerBg').removeClass('show').addClass('hide');
	    });
	    //获取筛选条件
	    var arr = $(".sf_layer").find("[name='param-serch']");
	    var cname,f_type,gcId,brandId,mType;
        var keyword = $("#keyword").val();
        toUrl = '/leimingtech-front/m/goods/goodslist?groupSearch='+groupSearch+'&word='+keyword;
	    $.each(arr ,function(){
	    	f_type = $(this).attr("f-type");
	    	/* 分类 */
	    	if(typeof(f_type) != "undefined" && f_type == "category"){
	    		gcId = $(this).attr("gcid");
	    		if(typeof(gcId) != "undefined" && gcId != ""){
	    			toUrl = toUrl + "&searchType=gcIdSearch&keyword="+ gcId;
	    		}
	    	}
	    	/* 品牌 */
			if(typeof(f_type)!= "undefined" && f_type == "brand"){
				brandId = $(this).attr("bid");
                if(typeof(brandId) != "undefined" && brandId != ""){
                    toUrl = toUrl + "&filterConditions=[{\"filterName\":\"brandId\",\"conditionData\":\""+brandId+"\"}]";
                }
	    	}
	    	/* 厂商下的型号 */
			if(typeof(f_type)!= "undefined" && f_type == "type"){
                mType = $(this).attr("m_type");
                if(typeof(mType)!= "undefined" && mType != ""){
                    toUrl = toUrl + "&modelsSearch="+mType;
                }
	    	}
	   });
		if(toUrl!=""){
			toSearch(toUrl);
		}
	});


	//取消
	$('#filterCBtn').click(function(){
	    $('#filterBlock').animate({'right':'-100%'},function(){
	    	$('#filterBlock').removeClass('show').addClass('hide');
	    	$('#sfLayerBg').removeClass('show').addClass('hide');
	    });
	});
	
	/* 统一的搜索调用方法 */
	function toSearch(toUrl){
		window.location.href = toUrl;
	}
	$(function(){
        selec("div[gcid='21df91e9ef564ec997b78b369b727432']");
        selec("div[mtype='']");
	});
	//元素展开初始化
    function selec(para){
        $(para).each(
			function(){
                indexParent(this,0).addClass("sel_flag");
                indexParent(this,3).removeClass("hide_define");
                indexParent(this,4).find("hr:first").removeClass("hide_define");
                indexParent(this,6).addClass("opened");

                indexParent(this,6).removeClass("hide_define");
                indexParent(this,7).find("hr:first").removeClass("hide_define");
                indexParent(this,8).addClass("opened");
			}
        )
    }
	//获取指定对象的第index个父节点
	function indexParent(obj,index){
		var obj = $(obj);
		for(var i=0 ; i<index;i++){
            obj = obj.parent();
		}
		return obj;
	}