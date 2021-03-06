// 广告 关闭
var closeAd = function () {
    var handleClose = function () {
        $(this).parent().hide();
        return false;
    };
    $('.ad .close').click(handleClose);
};

// 搜索下拉
var searchSelect = function () {
    var showSelect = function () {
        var selectWrap = $(this).parent();
        selectWrap.toggleClass('search_box_hover');
        return false;
    };
    var hideSelect = function () {
        $('.search_box_1').removeClass('search_box_hover');
    };
    var handleSelect = function () {
        var selectWrap = $(this).parents('.search_box_1');
        selectWrap.find('strong').html(this.innerText);
        selectWrap.removeClass('search_box_hover');
    };
    $('.search_box_1 li').click(handleSelect);
    $('.search_box_1 strong').click(showSelect);
    if ($('.search_box_1 strong').length > 0) {
        $(document.body).click(hideSelect);
    }
};

// 分类导航
var menu = function () {
    var list = $('.sort');
    var menuLinks = $('.menu li');
    
    $('.close-sort').click(function () {
        list.hide();
        menuLinks.removeClass('on');
        return false;
    });
    
    menuLinks.hover(function () {
        $(this).addClass('on');
        list.eq($(this).index()).show();
    }, function () {
        $(this).removeClass('on');
        list.eq($(this).index()).hide();
    });
    list.hover(function () {
        $(this).show();
        menuLinks.eq($(this).index() - 1).addClass('on');
    }, 
    function () {
        $(this).hide();
        menuLinks.eq($(this).index() - 1).removeClass('on');
    });
};

// tab
var tab = function () {
    $('.tab_t').click(function () {
        var conSelector = '.' + $(this).attr('data-to');
        
        $(this).parents('.tab').find('.tab_t').removeClass('on');
        $(this).addClass('on');
        
        $(this).parents('.tab').find('.tab_c').addClass('hide');
        $(this).parents('.tab').find(conSelector).removeClass('hide');
    });
};

// scrollTop
var scrollTop = function () {
    var speed = 30
    move2.innerHTML = move1.innerHTML
    function Marquee(){
        if (move1.scrollHeight - move.scrollTop <= 0) 
            move.scrollTop -= move1.offsetHeight
        else {
            move.scrollTop++
        }
    }
    
    var MyMar = setInterval(Marquee, speed)
    move.onmouseover = function(){
        clearInterval(MyMar)
    }
    move.onmouseout = function(){
        MyMar = setInterval(Marquee, speed)
    }
};

// 渐变焦点图
var Focus = function (wrapId) {
    if (typeof wrapId === 'String') {
        this.wrap = $('#' + wrapId);
    } else {
        this.wrap = wrapId;
    }
    
    this.items = this.wrap.find('.item');
    this.pointLinks = this.wrap.find('.carousel-indicators li');
    this.now = 0;
    this.interval; 
    
    this.init();
};
Focus.prototype.move = function () {
    this.pointLinks.removeClass('active');
    this.pointLinks.eq(this.now).addClass('active');
    
    this.items.fadeOut();
    this.items.eq(this.now).fadeIn(1000);
};

Focus.prototype.toLeft = function () {
    this.now--;
    if (this.now < 0) {
        this.now = this.items.length - 1;
    }
    this.move();
    return false;
};

Focus.prototype.toRight = function () {
    this.now++;
    if (this.now > this.items.length - 1) {
        this.now = 0;
    }
    this.move();
    return false;
};

 Focus.prototype.handleSlide = function (link) {
     var _this = this;
     var slide = $(link).attr('data-slide-to');
     clearInterval(this.interval);
     
     this.now = slide;
     this.move();
     
     this.interval = setInterval(
     function () {
        _this.toRight();
     }, 3000);
 };
Focus.prototype.init = function () {
    var _this = this;
    this.interval = setInterval(
    function () {
       _this.toRight();
    }, 
    3000);

    this.pointLinks.click(
    function () {
        _this.handleSlide(this);
    });
};

// 展开分类
var startMenu = function () {
    var menu  = $('.menu');
    
    $('.nav_all').hover(
        function () {
            menu.show();
        },
        function () {
            menu.hide();
        });
    
    menu.hover(
        function () {
            $(this).show();
        },
        function () {
            $(this).hide();
        });
    
};

// 显示特定区域
var toggleShowArea = function () {
    
    $('.tree_title').click(function () {
        
        $(this).parents('.show_btn').toggleClass('on');
        if ($(this).attr('data-show')) {
            $($(this).attr('data-show')).toggleClass('hide');
        }
        
        return false;
    });
};


//二级菜单
$(document).ready(function() {
	$(".button_sh").click(function() {
		$(".llist").toggle(500)
	})
});
$(document).ready(function() {
	$(".button_show").click(function() {
		$(".llist_s").toggle(500)
	})
});


// select
var selectSearch = function () {
    
    $('.checkbox_list .submit_btn').click(function () {
        var list = $(this).parents('.checkbox_list');
        var hrefParams = [];
        
        list.find('input[name="list_val"]').each(function () {
            if ($(this).prop('checked')) {
                hrefParams.push($(this).val());
            }
        });
        
        location.href = $(this).attr('data-href') + '?data=' + hrefParams.join();
        
        return false;
    });
    
    
    $('.checkbox_list .checkbox_more_btn').click(function () {
        var list = $(this).parents('.checkbox_list');
        
        $(this).hide();
        
        list.addClass('checkbox_selected');
        list.find('.control_btns').show();
        
        list.find('.submit_btn').addClass('disabled_btn');
        
        return false;
    });
    
    
    $('.checkbox_list input').click(function () {
        
        if ($('.checkbox_list input:checked').length > 0) {
            $('.checkbox_list .submit_btn').removeClass('disabled_btn');
        }
    });
    $('.checkbox_list .cancel_btn').click(function () {
        $('.checkbox_list input').prop('checked', false);
        
        $('.checkbox_more_btn').show();
        $('.checkbox_list').removeClass(' checkbox_selected');
        $('.checkbox_list').find('.control_btns').hide();
        
        return false;
    });
};


var showBigPic = function () {
    // 详情页显示图片
    
    var detailImg = $('.detail_img');
    var links = detailImg.find(' .overview li');
    
    links.hover(function () {
        links.removeClass('on')
        $(this).addClass('on');
        
        detailImg.find('#origin_img img').attr('src', $(this).attr('data-pic'));
		detailImg.find('#zoom_img img').attr('src', $(this).attr('data-zoom-pic'));
    });
};

var changeNum = function () {
    // 详情页增加减少数量
    
    var lessBtn = $('.change_less');
    var moreBtn = $('.change_more');

	var isDisabledClick = function (btn) {
		return btn.parents('.change_num').attr('data-disabled') === 'true';
	};
    
    lessBtn.click(function () {
		if (isDisabledClick($(this))) return;

        var num = $(this).parents('.change_num').find('input');
		var numVal = Number(num.val()) - 1;
        num.val(numVal ? numVal : 1);
    });
    
    moreBtn.click(function () {
		if (isDisabledClick($(this))) return;

		var num = $(this).parents('.change_num').find('input');
		var numVal = Number(num.val()) + 1;
        num.val(numVal);
    });
};

var backService = function () {
    var root = $('.back_service');
    
    root.find('span').click(function () {
        root.find('span').removeClass('on');
        $(this).addClass('on')
    });
};
var backService1 = function () {
    var root = $('.back_service1');
    
    root.find('span').click(function () {
        root.find('span').removeClass('on');
        $(this).addClass('on')
    });
};






var addFhLast = function () {
	var btn = $('.fh_last_add');
	var addArea = $('.fh_last');

	btn.click(function () {
		addArea.after(addArea.clone());
	});
};

/*
 * 表单
 */

var focusInput = function () {
    var inputs = $('.focus');
    inputs.focus(function () {
        $(this).parent().addClass('input_focus');
    });
    inputs.blur(function () {
        $(this).parent().removeClass('input_focus');
    });
};

/*

	方案批量删除
*/
var deleteList = function () {
	var checkAllElem = $('.config_list_check_all');
	var deleteElem = $('.config_list_delete');

	var listItem = $('.config_list_check');

	if (!checkAllElem.length || !deleteElem.length) return;

	var checkAll = function (isTrue) {
		listItem.prop('checked', isTrue);
	};

	checkAllElem.on('change', function () {
		checkAll(this.checked);
	});

	deleteElem.on('click', function () {
		listItem.each(function () {
			if (this.checked) $('.win_wrap, .win_back').show();
		});
		return false;
	});


	var close =  $('.win_close');
	var done = $('.win_done');
	var deleteOne = $('.config_list_delete_item');

	close.on('click', function () {
		var win = $('.win_wrap, .win_back');

		win.hide();
		
		if (win.data('oneItem')) win.data('oneItem').find('input').prop('checked', false);

		return false;
	});
	
	done.on('click', function () {
		listItem.each(function () {
			if (this.checked) $(this).parents('li').remove();
		});

		$('.win_wrap, .win_back').hide();
		return false;
	});

	deleteOne.on('click', function () {

		$('.win_wrap, .win_back').show().data('oneItem', $(this).parents('li'));

		listItem.prop('checked', false);
		$(this).parents('li').find('.config_list_check').prop('checked', true);

		return false;
	});



};


var selectProduct = function () {
	$('.product span').click(function () {
		$(this).addClass('on').siblings().removeClass('on');	
	});
};

var configMore = function () {
    var configs = $('.config_more');
    
    var wrap, wrapInfo;
    
    $('.config_more_show').click(function () {
        wrap = $(this).parents('li').find('.config_more');
        wrapInfo = $(this).parents('li').find('.config_more_info');
        
        configs.addClass('hide');
        wrap.removeClass('hide');
        return false;
    });
    
    $('.config_more').click(function () {
        return false;
    });
    
    $(document.body).click(function () {
        if (!wrap || !wrap.length) return;
        
        var html = '';
        var inputs = wrap.find('select, input');
        
        var i;
        
        for (i = 0; i < inputs.length;  i++) {
            if (inputs.eq(i).val() != '') html += inputs.eq(i).val() + ' ';
        }
        
        wrap.addClass('hide');
        
        wrapInfo.html(html);
        
        
    });
};

var shopShowBigPic = function () {

	var btn = $('.show_big');
	var wrap = $('.show_pic');
	var win = $('.win_wrap, .win_back');

	btn.click(function () {
		wrap.html($(this).find('.big_pic').clone().show());
		win.show();
	});


	var close =  $('.win_close');

	close.on('click', function () {
		win.hide();
		return false;
	});
};

var comparePriceAddPrice = function () {
    var btn = $('.p_select');
    
    if (!btn.length) return;
    
    var getElemNumVal = function (elem) {
        return elem[0].nodeName === 'INPUT' ? Number(elem.val()) : Number(elem.html());
    };
    
    btn.click(function () {
        var thisBtn = $(this);
        
        var wrap = thisBtn.parents('.p_list');
        var itemWrap = thisBtn.parents('li');
        
        var allNum = wrap.find('.p_all_num');
        var allPrice = wrap.find('.p_all_price');
        
        var num = itemWrap.find('.p_num');
        var price = itemWrap.find('.p_price');

		var changeNum = itemWrap.find('.change_num');
        
        
        if ($(this).prop('checked')) {
            allNum.html(getElemNumVal(allNum) + getElemNumVal(num));
            allPrice.html(getElemNumVal(allPrice) + getElemNumVal(num) * getElemNumVal(price));

			changeNum.attr('data-disabled', true);
        } else {
            allNum.html(getElemNumVal(allNum) - getElemNumVal(num));
            allPrice.html(getElemNumVal(allPrice) - getElemNumVal(num) * getElemNumVal(price));

			changeNum.attr('data-disabled', false);
        }
    });
};

	

/*
 * 初始化
 */
if ($('.login_page, .log2_page').length ||
    $('.step3').length) {
    focusInput();
}
if ($('.detail_page').length) {
    $('#detail_slide').tinycarousel({
        bullets  : true,
        animationTime : 500
    });
    $('#more_shops').tinycarousel({
        bullets  : true,
        axis   : 'y',
        animationTime : 500
    });
    
    showBigPic();
    changeNum();
    backService();
    backService1();
    tab();
    
}
if ($('.list_page').length) {
    menu();
    startMenu();
    searchSelect();
    toggleShowArea();
    selectSearch();
}
if ($('.main_page').length) {

    for (var i = 0; i < $('.slide').length; i++) {
        new Focus($('.slide').eq(i));
    }
    $('#slider1').tinycarousel({
        bullets  : true
    });
    
    
    searchSelect();
    closeAd();
    menu();
    tab();
    scrollTop();

}

if ($('.plan_page').length) {
	deleteList();
	changeNum();
}

if ($('.parity_page').length) {
	selectProduct();
	toggleShowArea();
	changeNum();
	deleteList();
    configMore();
	addFhLast();
}

if ($('.hall_page').length) {
	toggleShowArea();
}

if ($('.shop_page').length) {
	new Focus($('.section1_focus'));
	tab();
	shopShowBigPic();
}

if ($('.solve_page').length) {
    tab();
    $('.slide').tinycarousel();
}

if ($('.child_page').length) {
    changeNum();
    comparePriceAddPrice();
}
