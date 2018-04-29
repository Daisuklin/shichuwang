//全局对象,不扩展JQ是为考虑移值，保持最小集
var qg = {} || qg;

qg.event = {
    throttle:function (method, timeout) {
        return function () {
            timeout = timeout || 100;
            var that = this, args = arguments;
            clearTimeout(method.tId);
            method.tId = setTimeout(function () {
                method.apply(that, args);
            }, timeout);
        };
    }
}

qg.ui = {
    active:function (selector, className) {
        $(selector).addClass(className);
        $(selector).siblings().removeClass(className);
    },

    goto: function(id) {
        $("body,html").animate({scrollTop:$('#' + id).offset().top});
//        $("body,html").scrollTop($('#' + id).offset().top);
    },

    /**
     * @description 创建浮动层
     * @param {String|Element|Array|jQuery} layer 浮动层
     * @param {Object} [options] 选项
     */
    floatLayer:function (layer, options) {
        options = $.extend({ top:0, style: 'float-layer', floatBefore: function() {}, floatAfter: function() {}  }, options);
        var jLayer = $(layer);
        if ($.browser.version != "6.0") {
            jLayer.css("top", options.top);
        }
        var top = 0;
        if (jLayer.offset()) top = jLayer.offset().top;
        var originalTopPosition = top;
        $(window).scroll(QeeGoo.util.throttle(function () {
            if (jLayer.is("." + options.style)) {
                if ($(this).scrollTop() <= originalTopPosition) {
                    $("#optionBarHidden").hide();
                    jLayer.removeClass(options.style);
                    options.floatBefore();
                }
            } else {
                if ($(this).scrollTop() > originalTopPosition) {
                    $("#optionBarHidden").show();
                    jLayer.addClass(options.style);
                    options.floatAfter();
                }
            }
        }, 50));
    }
}


//jquery的hover方法的延迟方法
$.fn.lazyhover = function (fuc_on, fuc_out, de_on, de_out) {
    var self = $(this);
    var flag = 1;
    var h;
    var handle = function (elm) {
        clearTimeout(h);
        if (!flag)
            self.removeData('timer');
        return flag ? fuc_on.apply(elm) : fuc_out.apply(elm);
    };
    var time_on = de_on || 0;
    var time_out = de_out || 500;
    var timer = function (elm) {
        h && clearTimeout(h);
        h = setTimeout(function () {
            handle(elm);
        }, flag ? time_on : time_out);
        self.data('timer', h);
    };
    self.hover(function (event) {
        event.stopPropagation();
        event.preventDefault();
        flag = 1;
        this.event = event;
        timer(this);
    }, function (event) {
        event.stopPropagation();
        event.preventDefault();
        flag = 0;
        this.event = event;
        timer(this);
    });
};


$.fn.extend({
    selectbox:function (options) {
        return this.each(function () {
            new jQuery.SelectBox(this, options);
        });
    }
});


$.SelectBox = function (selectobj, options) {

    var opt = options || {};
    opt.inputClass = opt.inputClass || "selectbox";
    opt.containerClass = opt.containerClass || "selectbox-wrapper";
    opt.hoverClass = opt.hoverClass || "current";
    opt.currentClass = opt.selectedClass || "selected"
    opt.debug = opt.debug || false;

    var elm_id = selectobj.id;
    var active = 0;
    var inFocus = false;
    var hasfocus = 0;
    //jquery object for select element
    var $select = $(selectobj);
    // jquery container object
    var $container = setupContainer(opt);
    //jquery input object
    var $input = setupInput(opt);
    // hide select and append newly created elements
    $select.hide().before($input).before($container);


    init();

    $input
        .click(function () {
        if (!inFocus) {
            $container.toggle();
        }
    })
        .focus(function () {
            if ($container.not(':visible')) {
                inFocus = true;
                $container.show();
            }
        })
        .keydown(function (event) {
            switch (event.keyCode) {
                case 38: // up
                    event.preventDefault();
                    moveSelect(-1);
                    break;
                case 40: // down
                    event.preventDefault();
                    moveSelect(1);
                    break;
                //case 9:  // tab
                case 13: // return
                    event.preventDefault(); // seems not working in mac !
                    $('li.' + opt.hoverClass).trigger('click');
                    break;
                case 27: //escape
                    hideMe();
                    break;
            }
        })
        .blur(function () {
            if ($container.is(':visible') && hasfocus > 0) {
                if (opt.debug) console.log('container visible and has focus');
            } else {
                // Workaround for ie scroll - thanks to Bernd Matzner
//			  if($.browser.msie /*|| $.browser.safari*/){ // check for safari too - workaround for webkit
//			        if(document.activeElement.getAttribute('id') && document.activeElement.getAttribute('id').indexOf('_container')==-1){
                hideMe();
//			        } else {
//			          $input.focus();
//			        }
//		      } else {
//		        hideMe();
//		      }
            }
        });


    function hideMe() {
        hasfocus = 0;
        $container.hide();
    }

    function init() {
        $container.append(getSelectOptions($input.attr('id'))).hide();
        var width = $input.css('width');
        $container.width(width);
    }

    function setupContainer(options) {
        var container = document.createElement("div");
        $container = $(container);
        $container.attr('id', elm_id + '_container');
        $container.addClass(options.containerClass);

        return $container;
    }

    function setupInput(options) {
        var input = document.createElement("input");
        var $input = $(input);
        $input.width(72);
        $input.attr("id", elm_id + "_input");
        $input.attr("type", "text");
        $input.addClass(options.inputClass);
        $input.attr("autocomplete", "off");
        $input.attr("readonly", "readonly");
        $input.attr("tabIndex", $select.attr("tabindex")); // "I" capital is important for ie

        return $input;
    }

    function moveSelect(step) {
        var lis = $("li", $container);
        if (!lis || lis.length == 0) return false;
        active += step;
        //loop through list
        if (active < 0) {
            active = lis.size();
        } else if (active > lis.size()) {
            active = 0;
        }
        scroll(lis, active);
        lis.removeClass(opt.hoverClass);

        $(lis[active]).addClass(opt.hoverClass);
    }

    function scroll(list, active) {
        var el = $(list[active]).get(0);
        var list = $container.get(0);

        if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
            list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
        } else if (el.offsetTop < list.scrollTop) {
            list.scrollTop = el.offsetTop;
        }
    }

    function setCurrent() {
        var li = $("li." + opt.currentClass, $container).get(0);
        var ar = ('' + li.id).split('_');
        var el = ar[ar.length - 1];
        $select.val(el);
        $input.val($(li).html());
        return true;
    }

    // select value
    function getCurrentSelected() {
        return $select.val();
    }

    // input value
    function getCurrentValue() {
        return $input.val();
    }

    function getSelectOptions(parentid) {
        var select_options = new Array();
        var ul = document.createElement('ul');
        $select.children('option').each(function () {
            var li = document.createElement('li');
            li.setAttribute('id', parentid + '_' + $(this).val());
            li.innerHTML = $(this).html();
            if ($(this).is(':selected')) {
                $input.val($(this).html());
                $(li).addClass(opt.currentClass);
            }
            ul.appendChild(li);
            $(li)
                .mouseover(function (event) {
                    hasfocus = 1;
                    if (opt.debug) console.log('over on : ' + this.id);
                    jQuery(event.target, $container).addClass(opt.hoverClass);
                })
                .mouseout(function (event) {
                    hasfocus = -1;
                    if (opt.debug) console.log('out on : ' + this.id);
                    jQuery(event.target, $container).removeClass(opt.hoverClass);
                })
                .click(function (event) {
                    var fl = $('li.' + opt.hoverClass, $container).get(0);
                    if (opt.debug) console.log('click on :' + this.id);
                    $('#' + elm_id + '_container' + ' li.' + opt.currentClass).removeClass(opt.currentClass);
                    $(this).addClass(opt.currentClass);
                    setCurrent();
                    //$select.change();
                    $select.get(0).blur();
                    hideMe();
                    var index_s = $select.val();
                    if (!$.browser.msie) {
                        $("#keyWords").attr("placeholder", $("#qgSle").find("option:eq(" + index_s + ")").attr("placeholder"));
                    } else {
                        $("#keyWords").attr("placeholder", $("#qgSle").find("option:eq(" + index_s + ")").attr("placeholder"));
                        document.getElementById("keyWords").value = $("#qgSle").find("option:eq(" + index_s + ")").attr("placeholder");
                    }
                });
        });
        return ul;
    }


};

$.ajaxSetup({
    dataFilter:function (data, type) {
        if (data!=undefined&&data.indexOf("</html>") != -1) {
            QeeGoo.widget.placeholder("#keyWords");//alert("请重新登录");
            location.href = context + "/login.do";
            $(this).abort();//stop ajax
            return "";
        }
        return data;
    },
    complete:function (jqXHR, textStatus) {
//    	if("error"==textStatus){
//    		QeeGoo.widget.alert("系统错误-A","系统错误");
//    	}
    }
});


/**
 * @namespace QeeGoo namespaces.
 */
var QeeGoo = {} || QeeGoo;
/**
 * @namespace QeeGoo util namespace.
 */
QeeGoo.util = {
    /**
     * @description 对调用函数进行节流，适用于被快速调用的函数，减少调用次数，传递给该方法一个Function，会返回一个节流的版本
     * @param {Function} method 调用函数
     * @param {Number} [timeout] 节流时间间隔
     * @return {Function} 调用函数的节流版本
     */
    throttle:function (method, timeout) {
        return function () {
            timeout = timeout || 100;
            var that = this, args = arguments;
            clearTimeout(method.tId);
            method.tId = setTimeout(function () {
                method.apply(that, args);
            }, timeout);
        };
    },

    delay:function (method, delay) {
        var delayId = setTimeout(method, delay);
        return {
            cancel:function () {
                clearTimeout(delayId);
            }
        };
    },
    open:function (url, isBlank) {
        isBlank = isBlank == void 0 ? false : isBlank;
        url = QeeGoo.util.remove(url, "p_id");
        url = QeeGoo.util.remove(url, "p_ext");
        url = (url.indexOf("?") != -1) ? url + "&p_id=" + $("#hp_id").val() + "&p_ext=" + $("#hp_ext").val() : url + "?p_id=" + $("#hp_id").val() + "&p_ext=" + $("#hp_ext").val();
        url = encodeURI(url);
        if (isBlank) {
            window.open(url, "_blank");
        } else {
            window.location.href = url;
        }
    },
    remove:function clearItemFromCurUrl(url, key) {
        if (url) {
            var myRegex = new RegExp(key + '=[^&]+');
            url = url.replace(myRegex, '');
        }
        return url;
    },
    /*
     * url 目标url(http://www.phpernote.com/)
     * arg 需要替换的参数名称
     * arg_val 替换后的参数的值
     * return url 参数替换后的url
     */
    replaceURLArg:function (url, arg, arg_val) {
        var pattern = arg + '=([^&]*)';
        var replaceText = arg + '=' + arg_val;
        if (url.match(pattern)) {
            var tmp = '/(' + arg + '=)([^&]*)/gi';
            tmp = url.replace(eval(tmp), replaceText);
            return tmp;
        } else {
            if (url.match('[\?]')) {
                return url + '&' + replaceText;
            } else {
                return url + '?' + replaceText;
            }
        }
        return url + '\n' + arg + '\n' + arg_val;
    }
};

QeeGoo.event = {
    eventPool:{},

    bind:function (jElements, eventType, callback) {
        var listeners = this.eventPool[eventType];
        if (!listeners) {
            listeners = [];
            this.eventPool[eventType] = listeners;
        }
        listeners.push([$(jElements), callback]);
    },

    trigger:function (eventType, eventObject) {
        var listeners = this.eventPool[eventType];
        if (listeners) {
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                listener[0].each(function () {
                    listener[1].call(this, eventObject);
                });
            }
        }
    },
    spread:function (hoversrc, showAndhidetar) {
        var timer = 0;
        $(hoversrc).hover(function () {
            $(showAndhidetar).show();
        }, function () {
            timer = setTimeout(function () {
                $(showAndhidetar).hide();
            }, 300);
        });
        $(showAndhidetar).mouseover(function () {
            clearTimeout(timer);
        });
    }
};

/**
 * @namespace QeeGoo 界面控件
 */
QeeGoo.widget = {
    /**
     * @description 为一个checkbox添加对一组checkbox全选和全部取消选择的功能
     * @param {String|Element|Array} controller String类型应为CSS选择器，用于控制全选的checkbox
     * @param {String|Element|Array} checkbox String类型应为CSS选择器，用于被控制的checkbox
     * @param {Function} [callback] 触发全选后的回调函数，接受两个参数，分别为选中状态和被控制的checkbox的集合
     */
    selectAllCheckbox:function (controller, checkbox, callback) {
        $(controller).click(function () {
            var checkboxState = this.checked;
            var checkboxList = $(checkbox).attr("checked", this.checked);
            if (callback) {
                callback(checkboxState, checkboxList);
            }
        });
    },
    /**
     * 与上实现的功能一样
     * 使用方法:<input name="check_all" type="checkbox" />多选
     *         <input name="check_item" id="${rs.id}" type="checkbox" />列表
     */
    checkAll:function () {
        $("input[name='check_all'][type='checkbox']").click(function () {
            $("input[name='check_item'][type='checkbox']").attr("checked", $(this).attr("checked"));
        });
    },

    /**
     * @description 控制一个区域的显示和隐藏
     * @param {String|Element|Array} controller 显示隐藏的控制按钮
     *        按钮显示样式: button.initStyle---始初化样式　,hideStyle---隐藏时样式,showStyle---显示时样式
     * @param {String|Element|Array} controlled 被控制的区域
     * @param {String|Element|Array} controller 控制按钮显示隐藏时的按钮显示值
     * @param {Object} [options] 回调函数
     */
    showAndHideController:function (controller, controlled, options) {
        var controllerEl = $(controller);
        if (controllerEl.data("initStyle")) {
            controllerEl = controllerEl.html(controllerEl.data("initStyle"));
        }

        controllerEl.data("show", true).click(function () {
            var controlledElements = $(controlled);
            var shown = controllerEl.data("show");
            if (shown) {
                controllerEl.removeClass("slide_down").data("show", false);
                if (controllerEl.data("hideStyle")) {
                    controllerEl.html(controllerEl.data("hideStyle"));
                }
                controlledElements.hide();
            } else {
                controllerEl.addClass("slide_down").data("show", true);
                if (controllerEl.data("showStyle")) {
                    controllerEl.html(controllerEl.data("showStyle"));
                }
                controlledElements.show();
            }
            if (options && options.callback) {
                options.callback(!shown, controlledElements);
            }
        });
    },

    /**
     * @description 为不支持placeholer属性的浏览器添加此功能
     * @param {String|Element|Array} target 要添加placeholder功能的表单域
     */
    placeholder:function (target) {
        var self = QeeGoo.widget.placeholder;
        if (self.supported === undefined) {
            var mod = document.createElement("input");
            self.supported = "placeholder" in mod;
        }
        if (!self.supported) {
            $(target).focus(
                function () {
                    var placeholderString = $(this).attr('placeholder');
                    if (this.value == placeholderString) {
                        this.value = '';
                        this.style.color = "#555555";
                    }
                }).blur(
                function () {
                    if (this.value.length == 0) {
                        var plh = $(this).attr('placeholder');
                        if (plh) {
                            this.value = $(this).attr('placeholder');
                            this.style.color = "#6D6D6D";
                        }
                    }
                }).blur();
        }
    },

    fixedWidget:function (widget, docked, options) {
        options = $.extend({
            left:0,
            right:0,
            bottom:0,
            top:0,
            showFlag:false
        }, options);

        var dockedWidget = $(docked);
        // 为按钮添加回到顶部的点击事件
        var el = $(widget);
        // 初始化按钮的样式
        if ($.browser.msie && $.browser.version == "6.0") {
            el.css({ position:"absolute"});
        } else {
            el.css({ position:"fixed", bottom:options.bottom, right:options.right });
        }

        // 窗口滚动的监听器，进行了函数节流
        var scrollListener = QeeGoo.util.throttle(function () {
            var scrollTop = $(document).scrollTop();
            if (!options.showFlag) {
                if (scrollTop > options.top) {
                    if (el.is(":hidden")) el.fadeIn();
                } else {
                    el.fadeOut();
                }
            }
            // IE6的兼容方案
            if ($.browser.msie && $.browser.version == "6.0") {
                scrollTop = document.documentElement.scrollTop - 100;
                var windowHeight = $(window).height();
                el.css("top", scrollTop + windowHeight - widget.height() - options.bottom);
            }
        });

        // 初始化按钮的位置，同样进行了函数节流
        var initPosition = QeeGoo.util.throttle(function () {
            var offsetLeft = dockedWidget.offset().left + dockedWidget.width() + options.left;
            //el.css("left",offsetLeft);
        });
        initPosition();
        // 注册滚动事件和resize事件
        $(window).scroll(scrollListener).resize(initPosition);
    },

    /**
     * @description 返回顶部按钮
     * @param {String|Element|Array} widget 按钮
     * @param {String|Element|Array} docked 停靠的元素
     * @param {Object} [options] 选项,目前支持两个选项.left:停靠元素的向左偏移量.bottom:与底部的偏移量
     */
    backToTopButton:function (widget, docked, options) {
        var button = $(widget);
        QeeGoo.widget.fixedWidget(button, docked, options);
    },

    /**
     * @description 创建浮动层
     * @param {String|Element|Array|jQuery} layer 浮动层
     * @param {Object} [options] 选项
     */
    floatLayer:function (layer, options) {
        options = $.extend({ top:0 }, options);
        var jLayer = $(layer);
        if ($.browser.version != "6.0") {
            jLayer.css("top", options.top);
        }
        var originalTopPosition = jLayer.offset().top;
        $(window).scroll(QeeGoo.util.throttle(function () {
            if (jLayer.is(".float-layer")) {
                if ($(this).scrollTop() < originalTopPosition) {
                    $("#optionBarHidden").hide();
                    jLayer.removeClass("float-layer");
                }
            } else {
                if ($(this).scrollTop() > originalTopPosition) {
                    $("#optionBarHidden").show();
                    jLayer.addClass("float-layer");
                }
            }
        }, 50));
    },

    alert:function (message, title, okCallback, closeFlag) {
        okCallback = okCallback == void 0 ? function () {
        } : okCallback;
        if (!QeeGoo.widget.alert.inited) {
            $("body").append("<div style='display:none' id='qeegoo-dialog'></div>");
            QeeGoo.widget.alert.inited = true;
        }
        $("#qeegoo-dialog").html(message);
        $("#qeegoo-dialog").dialog({
            zIndex:10000,
            modal:true,
            resizable:false,
            title:title,
            buttons:{确定:function () {
                okCallback();
                $(this).dialog("close");
            }},
            close:function () {
                if (closeFlag) {
                    okCallback();
                }
            }
        });
    },
    confirm:function (message, title, okCallback, cancelCallback) {
        cancelCallback = cancelCallback == void 0 ? function () {
        } : cancelCallback;
        if (!QeeGoo.widget.alert.inited) {
            $("body").append("<div style='display:none' id='qeegoo-dialog'></div>");
            QeeGoo.widget.alert.inited = true;
        }
        $("#qeegoo-dialog").html(message);
        $("#qeegoo-dialog").dialog({
            modal:true,
            resizable:false,
            title:title,
            buttons:{确定:function () {
                okCallback();
                $(this).dialog("close");
            }, 取消:function () {
                cancelCallback();
                $(this).dialog("close");
            }}
        });
    },
    /**
     * @param eventId   : default backToTopButton
     * @param scrollTop : default 0
     * @param speed     : default 120
     */
    scrolltoclick:function (options) {

        options = $.extend({ eventId:"#backToTopButton", scrollTop:0, speed:120}, options);

        var e_id = options.eventId;

        var returnTop = $(e_id);

        $(returnTop).live('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            var body = $("html, body");
            $(this).click(function () {
                body.animate({ scrollTop:parseInt(options.scrollTop) }, parseInt(options.speed));
            });
        });
    },
    scrollto:function (options) {
        options = $.extend({ scrollTop:0, speed:120}, options);
        var body = $("html, body");
        body.animate({ scrollTop:parseInt(options.scrollTop) }, parseInt(options.speed));
    },
    move:function (obj) {
        var isMove = false;
        obj.mousedown(
            function () {
                isMove = true;
            }).mouseup(function () {
                isMove = false;
            });
        $(document).mousemove(function (e) {
            if (!isMove) {
                return;
            }
            ;
            var X = e.clientX - parseInt(obj.width() / 2);
            var Y = e.clientY - parseInt(obj.height() / 2);
            obj.css({"left":X, "top":Y, "cursor":"move"});
        });
    }
};

//QeeGoo.shoppingCart = {
//    showMyCart: function () {
//        var carListBox = $("#cartListBoxId");
//        var carInfo = $("#cartInfoId").length > 0 ? $("#cartInfoId") : $("#memberCartInfoId");
//        var myCart = carInfo;
//        var vClass = $("#cartInfoId").length > 0 ? "cart" : "shop_nav_cart_col";//$("#cartInfoId").length > 0?"cart_info":"m_cart_info";
//        myCart.lazyhover(function () {
//            var url = context + "/shoppingcart/getMiniShoppingCart.do";
//            if (carListBox.css("display") == "none") {
//                //carInfo.attr("class", vClass + "_over");
//                carListBox.html("请稍后...").show();
//                $.ajax({
//                    type: "GET",
//                    url: url,
//                    async: false,
//                    beforeSend: function () {
//                    },
//                    success: function (data) {
//                        carListBox.html(data).show();
//                    }
//                });
//                QeeGoo.hideDiv("#cartListBoxId");
//                $(document).one("click", function () {
//                    carListBox.hide();
//                });
//            }
//        }, function () {
//            var relatedTarget = $(this.event.relatedTarget);
//            if (relatedTarget.closest("#cartListBoxId").length == 0) {
//                carInfo.attr("class", vClass);
//                carListBox.hide();
//            }
//        }, 200, 200);
//        carListBox.bind("mouseleave", function (event) {
//            var relatedTarget = $(event.relatedTarget);
//            if (relatedTarget.closest("#" + carInfo.attr("id")).length == 0) {
//                carInfo.attr("class", vClass);
//                $(this).hide();
//            }
//            event.stopPropagation();
//            event.preventDefault();
//        });
//
//        $("#cartListBoxId").click(function (event) {
//            event.stopPropagation();
//            event.preventDefault();
//            var target = $(event.target);
//            if (target.is("#cartListBoxId")) {
//                $(document).click();
//            } else if (target.is(".cart_pay")) {
//                location.href = context + "/shoppingcart/shoppingcart.do";
//            }
//        });
//    },
//    delMinCart: function (Key) {
//        $.post(context + "/shoppingcart/deletegoods.do", {cartKey: Key}, function (data, textStatus) {
//            $("#cart-item-count,#cart-item-count2").html(data.split(":")[0]);
//            $("#buyCount").html(data.split(":")[0]);
//            if (data.split(":")[0] <= 0) {
//                $("#buyCount").parent().parent().hide();
//            } else {
//                $("#buyCount").parent().parent().show();
//            }
//            $("#txtCount-" + Key).val(0);
//            $("#txtCount-" + Key).attr("old-count", 0);
//            $.post(context + "/shoppingcart/getMiniShoppingCart.do", function (data, textStatus) {
//                $("#cartListBoxId").html(data);
//            }, "html");
//        });
//    },
//    saveMycart: function (callback) {
//        $.ajax({
//            type: 'POST',
//            url: context + "/shoppingcart/saveShoppingCart.do",
//            error: function (XMLHttpRequest, textStatus, errorThrown) {
//                QeeGoo.widget.alert("系统繁忙，请稍后再试", "提示信息");
//            },
//            success: function () {
//                QeeGoo.widget.alert("购物车中的商品已成功寄存！", "提示信息", function () {
//                    if (callback) {
////					window.location.href = context + "/shoppingcart/shoppingcart.do";
//                        QeeGoo.util.open(context + "/shoppingcart/shoppingcart.do");
//                    }
//                });
//            }
//        });
//    }
//	synMyCart:function(){
//		$.post(context+"/shoppingcart/synCartGoodsCount.do",{},function (data, textStatus){
//			  $("#cart-item-count,#cart-item-count2").html(data);
//		});
//	}
//};

//隐藏弹出层
QeeGoo.hideDiv = function (obj) {
    var div = ["#categoryListId", "#cartListBoxId", ".car-type-dialog"];
    $.each(div, function (i, n) {
        if (obj != n) {
            $(n).hide();
        }
    });
};

QeeGoo.msg = {
    normal:function (id, times) {
        var obj = $("#" + id);
        obj.css("background-color", "#F3F1F2");
        if (times < 0) {
            return;
        }
        times = times - 1;
        setTimeout("QeeGoo.msg.error('" + id + "'," + times + ")", 150);
    },
    /**
     * 大搜索框，如果没有输入，则背景闪烁进行提示
     * @param id 为控件的id
     * @param times 为闪烁次数
     * */
    error:function (id, times) {
        var obj = $("#" + id);
        obj.css("background-color", "#F6CECE");
        times = times - 1;
        setTimeout("QeeGoo.msg.normal('" + id + "'," + times + ")", 150);
    }
};
//设定工具栏展开区域的位置
function toolsListPosition() {
    var obj = jQuery("#toolsList dl");

    num = 0;
    for (var i = 0; i < obj.length; i++) {
        /*if(i<7)
         {*/
        num = i * 33;
        obj.eq(i).css("top", num + "px");
        /*}
         else
         {*/
        //obj.eq(i).css("top",num+"px");
        /*}*/
    }
}

//前端工具
function toolsHover() {
    var obj = jQuery("#toolsBar dd");
    var _obj = jQuery("#toolsList dl");
    obj.live({
        mouseenter:function () {
            jQuery(this).addClass("active");
            jQuery("#toolsList dl").eq(jQuery("#toolsBar dd").index(this)).show();
        },
        mouseleave:function () {
            jQuery(this).removeClass("active");
            jQuery("#toolsList dl").eq(jQuery("#toolsBar dd").index(this)).hide();
        }
    });

    _obj.live({
        mouseenter:function () {
            jQuery(this).show();
            jQuery("#toolsBar dd").eq(jQuery("#toolsList dl").index(this)).addClass("active");
        },
        mouseleave:function () {
            jQuery(this).hide();
            jQuery("#toolsBar dd").eq(jQuery("#toolsList dl").index(this)).removeClass("active");
        }
    });

}

function suggest() {
    $("#keyWords").keyup(function () {
        var val = $(this).val();
        if (val && $.trim(val) !== '') {
            $.ajax({
                type:"get",
                url:context + "/goods/suggest.do",
                data:{"query":val},
                success:function (data) {
                    if (data) {
                        $("#suggest").remove();
                        var rs = data.suggestResult;
                        var ul = "<ul id='suggest'>";
                        for (var i = 0; i < rs.length; i++) {
                            ul += ("<li>" + rs[i] + "</li>");
                        }
                        ul += "<li class='s_close'>关闭</li>";
                        ul += "</ul>";
                        $("body").append(ul);
                        var that = $("#keyWords");
                        var w = that.width();
                        var offset = that.offset();
                        var left = offset.left;
                        var top = offset.top + that.height() + 1;

                        var css = {
                            "border":"1px solid #950203",
                            "border-top":"#950203",
                            "background":"none repeat scroll 0 0 #FFFFFF",
                            "position":"absolute",
                            "z-index":999,
                            "width":w + 26,
                            "left":left - 24,
                            "top":top
                        };
                        $("#suggest").css(css);
                        $("#suggest li").css({"line-height":"25px", "padding":"1px 6px", "cursor":"pointer"});
                        $("#suggest li:not('.s_close')").mousemove(
                            function () {
                                $(this).css({
                                    "background":"#F3BC14"
                                });
                            }).mouseout(
                            function () {
                                $(this).css({
                                    "background":"#FFFFFF"
                                });
                            }).click(function () {
                                var str = $(this).html();
                                $("#keyWords").val(str);
                                $("#SearchGoods .search_event").click();
                            });
                        $("#suggest li.s_close").css({"border-top":"1px solid #EFEFEF", "text-align":"right"}).click(function () {
                            $("#suggest").remove();
                        });

                    }
                }
            });
        }


    });
}
;

function showError() {
    var error = $("#ERROR_CODE");
    if (error != undefined) {
        if ($("#ERROR_CODE").val() != undefined && $("#ERROR_CODE").val() != '') {
            QeeGoo.widget.alert("系统繁忙,请联系管理员或稍后再试! " + $("#ERROR_CODE").val(), "系统繁忙");
        }
    }
}

function storeEnter() {
    $("#store_button").bind("mouseenter", function () {
        var left = $("#store_button").closest(".sub_nav").outerWidth() - $("#store_button").outerWidth() - 10;
        $('#store_link').css({left:left, top:1});
        $('#store_link').fadeIn("fast");
    });
    $("#store_link").bind("mouseleave", function () {
        $('#store_link').hide();
    });

}


var PageInfo = new Object();
/**
 * @author lihf
 *
 * currentPageNo:需要跳转到的页码
 * url:请求的url
 * data_container:数据返回时，需要填充的页面Id；格式为[container_id1;container_id2;container_id3]
 * search_condition:用于保存页面搜索条件的hidden项，需要后台组织好数据格式，格式为：key1=value1&key2=value2
 *
 */
PageInfo.jumpToPage = function (currentPageNo, url, data_container) {
    var data_container_list = data_container.split(";");
    $.ajax({
        type:'POST',
        url:context + url,
        data:"currentPageNo=" + currentPageNo + "&" + $('#search_condition').val(),
        success:function (html) {
            var html_array = html.split('\$B2C');
            var length = html_array.length;
            for (var i = 0; i < length; i++) {
                $('#' + data_container_list[i]).html('').html(html_array[i]);
            }
            //document.documentElement.scrollTop = 0;
        }
    });
};
PageInfo.getToPage = function(currentPageNo, url, condition, data_container,
		callback,goto) {
	var data_container_list = data_container.split(";");
	// var notNeedScrollTop = $.trim($("#notNeedScrollTop").val());
    if($('#filterList').length>0){
        qg.ui.goto('filterList');
    }
	$.ajax({
				type : 'POST',
				url : context + url,
				data : "currentPageNo=" + currentPageNo + "&" + condition,
				beforeSend : function() {
                    if(goto!=false) {
                        $(".loading").show();
                    }
				},
				complete : function(XMLHttpRequest, textStatus) {
                    if(goto!=false) {
                        $(".loading").hide();
                    }
				},
				success : function(html) {
					var html_array = html.split('\$B2C');
					var length = html_array.length;
					for (var i = 0; i < length; i++) {
						$('#' + data_container_list[i]).html('')
								.html(html_array[i]);
						// if (notNeedScrollTop == "") {
						// QeeGoo.widget.scrollto({scrollTop:$('#' +
						// data_container_list[i]).offset().top -
						// 30});//滚动到容器往上30像数的位置
						// }
					}

					if (callback)
						callback();
				}
			});
    if(url.indexOf("ajaxQueryGoodsList.do") != -1){
        url = url.replace("ajaxQueryGoodsList.do", "search.html");
        //url = url.replace("ajaxWearingCategory.do", "wearingCategory.html");
        //url = url.replace("ajaxQueryCategoryGoodsList.do", "partCategory.html");
        url += (url.indexOf("?") == -1) ? "?" : "&";
        url += "currentPageNo=" + currentPageNo + "&" + condition;
        //window.history.pushState({}, null, url);
        QeeGoo.changeAjaxTopUrl(url);
    }
};


/**
 * 验证输入页码的合法性
 */
PageInfo.verify = function (curPage, totalPage) {
    var number = /^\d+$/;
    if (!number.test(curPage)|| parseInt(curPage) <= 0) {
        alert('页号必须为大于1的整数');
        return false;
    }
    if (parseInt(curPage) > totalPage) {
        alert('页号不能大于总页数。');
        return false;
    }
    if (!number.test(curPage) || parseInt(curPage) > totalPage || parseInt(curPage) <= 0) {
        alert('页号必须为大于0的整数，并且不能大于总页数。');
        return false;
    }
    return true;
};

function jumpToPage(currentPageNo, url, condition, data_container, totalPages, callback,goto) {
	if(currentPageNo=="order"){
	    PageInfo.getToPage(1, url, condition, data_container, callback,goto);
	}else{
	    if (!PageInfo.verify(currentPageNo, totalPages)) {
	        return false;
	    }
	    PageInfo.getToPage(currentPageNo, url, condition, data_container, callback,goto);
	};
};

/*
 * ajax异步加载并 改变地址栏的url
 * 并判断ie9以及一下的版本不兼容html5
 */
QeeGoo.changeAjaxTopUrl = function(url){ 
    var ieVesion = isIE_VESION_9();
    if(!ieVesion){
    	//支持H5
    	window.history.pushState({}, null, url);
    }else{
    	//不支持H5
    	window.History.pushState({}, null, url);
    }
};

/*
 * 并判断ie9以及"以下"的版本不兼容html5
 * retrun: boolean
 */
var isIE_VESION_9 = function(){
	var isIE_9 = false;
	var DEFAULT_VERSION = "9";
    var ua = navigator.userAgent.toLowerCase();
    var isIE = ua.indexOf("msie")>-1;
    var safariVersion;
    if(isIE){
        safariVersion =  parseInt(ua.match(/msie ([\d.]+)/)[1]);
        if(safariVersion <= DEFAULT_VERSION ){
        	// IE9及以下版本
        	isIE_9 = true;
        	return isIE_9;
        }else{
        	return isIE_9;
        }
    }else{
    	return isIE_9;
    }
};