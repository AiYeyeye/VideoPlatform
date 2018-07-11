// 首页JS zjf20170321
$(function(){
  // 搜索下拉
  $('#SearchSelect li').click(function(){
    var thtml = $(this).html();
    $('#SearchSelect p').html(thtml);
    if($(this).attr('sear') == 2){
      $("#searchM").val('lecturer');
    }
  })

  // 搜索关键字
  var sTimer = function(){},sList = $("#associationList"),sq=''
  $("#searchQ").focus(function(){
      $(".hotKey").hide();
      sListShow()
  }).blur(function(){
    if($.trim($(this).val()).length!=0) return false;
      $(".hotKey").show();
  }).keyup(function(e){
    if(e.keyCode == 13){return false}
    var v = $.trim($(this).val())
    if(e.keyCode == 38){
      sList.find('.cur').prev().addClass('cur').siblings().removeClass('cur')
      return false;
    }
    if(e.keyCode == 40){
      //
      if(sList.find('.cur').length == 0){
        sList.children().eq(0).addClass('cur')
        return false;
      }
      //
      sList.find('.cur').next().addClass('cur').siblings().removeClass('cur')
      return false;
    }
    clearTimeout(sTimer)
    if(v.length==0){
      sListHide(true)
      return false;
    }
    sTimer = setTimeout(function(){
      association(v)
    },500)
    e.preventDefault()
    return false;
  }).keydown(function(e){
    if(e.keyCode == 13 && sList.children().length>0 && sList.find('.cur').text().length>0){
      $(this).val(sList.find('.cur').text())
      sListHide(true)
      return false;
    }
  });
  $("#SearchCon").mouseleave(function(){
    sListHide()
  })
  function association(v){
    console.log(v)
    if(sq==v){
      sListShow()
      return false;
    }
    sq = v;
    sListHide(true)
    if(v.length==0) return false;
    $.get(_centerURL+'course/index/search-suggest',{q:v},function(res){
      if(res.status == 1){
        $.each(res.data,function(i,e){
          var item = $('<a href="'+_centerURL+'course/index/search?q='+e.title+'" target="_blank">'+e.title+'</a>').click(function(){
            sListHide()
          })
          sList.append(item)
          //if(i==0) item.addClass('cur');

        })
        sList.children().mouseenter(function(){
          $(this).addClass('cur').siblings().removeClass('cur')
        })
        sListShow()
      }else{
        sListHide(true)
      }
    },'json')
  }
  function sListHide(e){
    sList.parent().hide()
    if(e){
      sq=''
      sList.empty()
    }
  }
  function sListShow(){
    if(sList.children().length>0) sList.parent().show()
  }

  // 绑定滚轴：侧导航和顶部导航
  var IndexSlider = function(arrList){
    this.arrList = arrList;
  }
  IndexSlider.prototype.IndexSliderTop = function (){
    // 侧导航高度
    var me = $(this);
    $('#Side_list').css({'height': me[0].arrList.sideHeight+'px','margin-top': -me[0].arrList.sideTop+'px'});
  };
  IndexSlider.prototype.IndexSliderShowBtn = function (){
    // 侧导航点击高亮显示当前按钮
    var me = $(this);
    $('.Side_right a').click(function(){
      $('.Side_right a').removeClass('on');
      $(this).addClass('on');
    })
  };
  IndexSlider.prototype.IndexNav = function (){
    // 吸顶条
    var me = $(this);
    if( me[0].arrList.winTop >= me[0].arrList.navTop){
      $(".Header3.white").show()
    }else{
      $(".Header3.white").hide()
    }
  };
  IndexSlider.prototype.IndexSliderShow = function (){
    // 左导航是否显示
    var me = $(this);
    if(me[0].arrList.winTop > me[0].arrList.winHeight && me[0].arrList.winWidth > 1366){
        $('#Side_list').show();
    }else{
        $('#Side_list').hide();
    }
  };
  IndexSlider.prototype.IndexSliderModel = function (){
    // 做导航绑定模块
    var me = $(this);
    $('.course_height').each(function(i){
      var meTop = $('#nav'+i).offset().top;
      if(me[0].arrList.winTop >= meTop){
        $('.Side_right a').eq(i).addClass('on').siblings().removeClass('on');
      }
    })
  };

  $(window).bind('scroll resize',function(){
    setSliderBox();
     setUser();
  })

  setSliderBox();
  function setSliderBox(){
    var arrList = {
        winTop: $(window).scrollTop(),
        winWidth: $(window).width(),
        winHeight: $(window).height()-400,
        navLeft: ($(window).width()-1200)/2,
        navTop: $('.NavTop').offset().top,
        sideHeight: $('.Side_right_bg').height(),
        sideTop: $('.Side_right_bg').height()/2
    };
    var IndexBox = new IndexSlider(arrList);
        IndexBox.IndexSliderTop();
        IndexBox.IndexSliderShowBtn();
        IndexBox.IndexNav();
        IndexBox.IndexSliderShow();
        IndexBox.IndexSliderModel();
  }

  setUser();
  function setUser(){
    // 用户名下拉
    var login_box = $('.login_box_wid'),
        tab_more = $('.tab_teacher'),
        login_box_wid = login_box.width();
    if(login_box_wid > 111){
      login_box.css({'width': login_box_wid+'px'});
      tab_more.css({'width': login_box_wid+'px'})
    }else{
      login_box.css({'width': '111px'});
      tab_more.css({'width': '111px'})
    }
  }

  // 不知道是什么
  var ib = new IndexBanner();
  $(".IndexBannerPics").mouseover(function(){
    $(".IBPB_L,.IBPB_R").show();
    ib.setMousState(true);
  }).mouseout(function(){
    $(".IBPB_L,.IBPB_R").hide();
    ib.setMousState(false);
  });
  //Lv2
  $(".IndexBannerDown li").mouseenter(function(){
    $(this).children('dl').fadeIn(200);
    $(this).siblings('li').find('dl').fadeOut(100);
  });
  $(".IndexBannerDown li").mouseleave(function(){
    $(this).children('dl').fadeOut(100);
  });
  //Lv5
  var tln = $(".IndexLecturerList").length;
  var tlnS = 1;
  var _mouseInIndexLecturer = false;
  $(".IndexLecturer").mouseenter(function(){
    _mouseInIndexLecturer = true;
  }).mouseleave(function(){
    _mouseInIndexLecturer = false;
  });
  setInterval(function(){
    if(_mouseInIndexLecturer == true) return false;
    $(".IndexLecturerList").eq(tlnS).fadeIn(300).siblings('.IndexLecturerList').hide();
    $('.ILLLsC a').eq(tlnS).addClass('ILLLsCur').siblings().removeClass('ILLLsCur');
    tlnS++;
    if(tlnS >=tln){tlnS = 0};
  },5000);
  $('.ILLLsC a').click(function(){
    $(this).addClass('ILLLsCur').siblings().removeClass('ILLLsCur');
    $(".IndexLecturerList").eq($(this).index()).fadeIn(300).siblings('.IndexLecturerList').hide();
    tlnS = $(this).index();
    if(tlnS >=tln){tlnS = 0};
  });
  //Lv6
  var IcItems = $('.IndexCoopList ul li');
  $('.IndexCoopList ul').width(207*IcItems.length);
  var icn = IcItems.length-4;
  var icnS = 0;
  $(".IndexCoopLeft").click(function(){
    if(icnS>0){
      icnS-=2;
      $('.IndexCoopList ul').animate({'margin-left':-207*icnS});
      if(icnS==0){$(this).addClass('IndexCoopLeftNone');}
    }
    $(".IndexCoopRight").removeClass('IndexCoopRightNone');
  });
  $(".IndexCoopRight").click(function(){
    if(icnS<icn){
      icnS+=2;
      $('.IndexCoopList ul').animate({'margin-left':-207*icnS});
      if(icnS>=icn){$(this).addClass('IndexCoopRightNone');}
    }
    $(".IndexCoopLeft").removeClass('IndexCoopLeftNone');
  });
});

//首页轮播
var IndexBanner = function(parms){
  this.init(parms);
}
IndexBanner.prototype.init = function(parms) {
  var me = this;
  this.mouseInPic = false;
  this.total = $(".IBPLBs_Iemt").length;
  this.items = $(".IndexBannerPicsList li");
  $('.IBPB_L').click(function(){
    me.showPrev();
  });
  $('.IBPB_R').click(function(){
    me.showNext();
  });
  $(".IndexBannerPicsList_Btn li").mouseenter(function(){
    if($(".IndexBannerPicsList li").eq($(this).index()).is(":hidden")){
      me.showExact($(this).index())
    }
  });
  //set position
  $(".IndexBannerPicsList_Btn").css({
    'margin-left':-((this.total*38)/2)-63,
    'display':'block'
  });
  //
  this.items.eq(0).show();
  $(".IndexBanner").css('background',this.items.eq(0).attr('color'));
  this.show = 0;
  var autoNext = setInterval(function(){
    if(!me.mouseInPic) me.showNext();
  },8000);// (ms)
};
IndexBanner.prototype.showPrev = function() {
  this.items.eq(this.show).hide();
  this.show--;
  this.show = this.show<0?this.total-1:this.show;
  this.showAct();
};
IndexBanner.prototype.showNext = function() {
  this.items.eq(this.show).hide();
  this.show++;
  this.show = this.show>=this.total?0:this.show;
  this.showAct();
};
IndexBanner.prototype.showExact = function(n) {
  this.items.eq(this.show).hide();
  this.show = n;
  this.showAct();
};
IndexBanner.prototype.showAct = function() {
  $(".IndexBanner").css('background',this.items.eq(this.show).attr('color'));
  this.items.eq(this.show).fadeIn(300);
  $(".IndexBannerPicsList_Btn li").eq(this.show).addClass('IBPLBs_IemtCur').siblings().removeClass('IBPLBs_IemtCur');
}
IndexBanner.prototype.setMousState = function(b) {
  this.mouseInPic = b;
};
//首页轮播 End

(function(){
  var s = 0,isShow = [];
  $('.course_height').each(function(i,e){
    isShow.push(false)
  })
  $(window).scroll(function(){
    $('.course_height').each(function(ii,e){
      var top = $(this).offset().top
      if(($(window).scrollTop()+$(window).height())>top && !isShow[ii]){
        isShow[ii] = true
        $.ajax({
          url:web_url+'center/index/index/get-hot',
          data:{id:fls[ii].cate_id},
          dataType:'json',
          success:function(res){
            new LoadHot("Cates_"+ii,res.data,ii)
          }
        })
      }
    })
  })
})()

/*
*定义对话框
*/
var Dialog = function(parms){
  this.initialize(parms)
}
Dialog.prototype.initialize = function(parms){
  this.setting = {
    cBtn:true,
    Yes:'确定',
    No:'取消',
    title:'提示信息',
    content:'提示信息'
  };
  if(typeof(parms)=='string'){
    this.setting.content = parms;
  }else{
    $.extend(this.setting,parms);
  }
  this.mask = $('<div class="mask"></div>');
  this.box = $('<div class="Dialog"></div>');
  this.boxMain = $('<div class="Main"></div>');
  this.boxBtns = $('<div class="Btns"></div>');
  this.box.append(this.boxMain)
  $('body').append(this.mask).append(this.box);
  this.build();
}

Dialog.prototype.build = function(){
  var me = this;
  //关闭按钮
  // this.closeBtn = $('<button class="close"></button>')
  // this.closeBtn.bind('click',function(){
  //  me.hide()
  // })
  // if(this.setting.cBtn) this.boxMain.append(this.closeBtn);
  //标题
  // this.title = $('<div class="title"></div>');
  // if(this.setting.title){
  //  this.boxMain.append(this.title);
  //  this.title.html(this.setting.title);
  // }
  //内容
  this.content = $('<div class="content"></div>');
  if(this.setting.content){
    this.boxMain.append(this.content);
    this.content.append(this.setting.content);
  }
  //按钮
  this.boxMain.append(this.boxBtns);
  if(this.setting.Yes){
    this.Yes = $('<button class="ok">'+this.setting.Yes+'</button>');
    this.Yes.bind('click',function(){
      me.yc();
    });
    this.boxBtns.append(this.Yes);
  }
  if(this.setting.No){
    this.No = $('<button class="cancel">'+this.setting.No+'</button>');
    this.No.bind('click',function(){
      me.nc();
    });
    this.boxBtns.append(this.No);
  }
}

Dialog.prototype.show = function(){
  this.mask.fadeIn(200);
  this.box.fadeIn(500);
}
Dialog.prototype.hide = function(){
  this.mask.fadeOut(500);
  this.box.fadeOut(200);
}
Dialog.prototype.yc = function(){}
Dialog.prototype.nc = function(){
  this.hide();
}
Dialog.prototype.setTitle = function(s){
  this.setting.title = s;
  this.title.html(s);
}
Dialog.prototype.setContent = function(s){
  this.setting.content = s;
  this.content.empty().append(s);
}

/*
*获取用户信息
*/
function signday(day){
  var myday = day;
  if(myday < 10){
    myday = '0' + myday;
  }else{
    myday = myday + '';
  }
  if(myday<1000&&myday>=100){
    $('.daysnum_2').addClass('daysnum_3')
  }else if(myday>=1000){
    $('.daysnum_2').addClass('daysnum_4')
  }
  var days = myday.split('');
  //day
  var str =''
  for(var i=0;i<days.length;i++){
    str+='<b>'+days[i]+'</b>'
  }
  
  $('.daysnum_2').html(str)

}
$.getJSON(web_url+'center/user/index/userinfo',{},function(data){
  //console.log(data)
  if(data.user_id){
    var goldUrl = web_url+'center/orders/order/get-order-list';
    if(data.islecturer==1){
      goldUrl = web_url+'center/profit/index/get-sales-record-list';
    }
    var sign = '';
    var sign_status = data.is_sign;
    var creatday = parseInt(data.join_day)  //连续签到天数
    var me_isvip = data.is_vip 
    if(sign_status == 1){
      sign = $('<button><span class="signtext1">立即签到</span><span class="signtext2">＋'+data.willgetmsg+'</span></button>')
      if(me_isvip != 1){
        sign = $('<button><span class="signtext1">立即签到</span><span class="signtext2">＋'+data.willgetmsg+'<em style="font-style:normal; color:#fff;">（会员翻倍）</em></span></button>')
      }
    }else{
      sign = $('<button class="sign_lock"><span class="signtext1">明日签到</span><span class="signtext2">＋'+data.willgetmsg+'</span></button>')
      if(me_isvip != 1){
        sign = $('<button class="sign_lock"><span class="signtext1">明日签到</span><span class="signtext2">＋'+data.willgetmsg+'<em style="font-style:normal; color:#fff;">（会员翻倍）</em></span></button>')
      }
    }   
    signday(creatday)
    $("#BannerBtn").html(sign) 
    // zjf20170217 vip
    if (me_isvip == 1) {
      $("#UserName").html('<a class="fl" href="'+web_url+'center/course/user/index" target="_blank">'+data.username+'</a><a class="vipSide" style="left: 2px;top: 3px;*top: 7px;" href="http://home.51cto.com/members/in-fo?edu" target="_blank"><a>');
      $(".on_day_sign_box").append('<b class="vipbeis"></b>')
    }else{
      $("#UserName").html('<a href="'+web_url+'center/course/user/index" target="_blank">'+data.username+'</a><a class="vipSide_gray" style="left: 2px;top: 3px;*top: 7px;" href="http://home.51cto.com/members/in-fo?edu" target="_blank"></a>');
    }
    $("#UserScore").html('学分 <a href="'+web_url+'center/course/user/index" target="_blank"><span class="blue mescore">'+data.totalCredit+'</span> </a><span class="gray">|</span> 余额 <a href="'+goldUrl+'" target="_blank"><span class="red">'+data.wuyougold+'</span></a>');
    var head = $('<img src="http://ucenter.51cto.com/avatar.php?uid='+data.user_id+'&size=small" style="width:100%;height:100%;">');
    $("#UserAvatar").replaceWith(head);
    head.next().css('cursor','pointer').click(function(){
      location.href=web_url+'center/course/user/index';
    });
    //   
    $("#BannerBtn").click(function(){     
      var btn = $(this)      
      if(sign_status==1){
        _hmt.push(['_trackEvent', '首页签到', '点击']);
        sign_status=0
      } 
              
      $.ajax({
        url: web_url+'center/user/index/task',
        type: 'GET',
        dataType: 'json',
        success:function(e){
          //console.log(e)
          var sign2 = ''          
          if(me_isvip==1){
            sign2 = $('<button class="sign_lock"><span class="signtext1">明日签到</span><span class="signtext2">＋'+e.credit.willgetmsg+'</span><b class="vipbeis"></b></button>')
          }else{
            sign2 = $('<button class="sign_lock"><span class="signtext1">明日签到</span><span class="signtext2">＋'+e.credit.willgetmsg+'<em style="font-style:normal; color:#fff;">（会员翻倍）</em></span></button>')
          }     
          $("#BannerBtn").html(sign2)
          signday(e.credit.date)
          $("#UserScore .mescore").text(e.credit_user)
          var item = $('<div class="newsigns"></div>')
          var item1 = $('<div class="popins"><span class="sign_closebtn"></span></div>')
          var List_Top = ''          
          if(me_isvip==1){
            List_Top = $('<div class="List_Top"><div class="minstit clearfix2"><strong>签到</strong><span class="sign_decicon"></span></div><div class="line1">已有学分<span>'+e.credit_user+'</span>分</div><div class="line2">'+e.credit.msg+'</div></div>')
          }else{
            List_Top = $('<div class="List_Top"><div class="minstit clearfix2"><strong>签到</strong><span class="sign_decicon"></span></div><div class="line1">已有学分<span>'+e.credit_user+'</span>分</div><div class="line2">'+e.credit.msg+'<a style="font-style:normal; color:#ee624f;text-decoration:underline;"  href="http://home.51cto.com/members/in-fo" target="_blank">（会员签到学分翻倍）</a></div></div>')
          }
          var sign_dec = '<div class="sign_dec"><div class="sign_decin"><span class="ic"></span><div class="texts">1.奖品周期为7天<br />2.连续签到即可获得对应的奖励，每连续签到7天，奖励7天会员<br />3.会员学分奖励双倍</div></div></div>'
          var Top_step =$('<div class="steps clearfix2"><span class="round"><em class="em1">+5</em><em class="em2"></em></span><b></b><span class="round"><em class="em1">+5</em><em class="em2"></em></span><b></b><span class="round"><em class="em1">+10</em><em class="em2"></em></span><b></b><span class="round"><em class="em1">+10</em><em class="em2"></em></span><b></b><span class="round"><em class="em1">+15</em><em class="em2"></em></span><b></b><span class="round"><em class="em1">+15</em><em class="em2"></em></span><b></b><span class="round roundlast"><i></i><a href="http://home.51cto.com/members/in-fo" target="_blank" style=" display:inline-block; width:74px;height:74px;"><em class="em1">7天会员</em><em class="em2">+20</em></a></span></div>')
          
          List_Top.append(sign_dec).append(Top_step)         
          //玩转学分
          var List_Two = $('<div class="List_Two"><div class="minstit"><a href="'+web_url+'center/about/index/help" target="_blank">什么是学分？</a>玩转学分</div></div>')
          var List_Two_mins = $('<div class="sxminins clearfix2"></div>')
          var List_Two_tils = ['学分购课程','APP免费抽奖','APP学分兑换'];
          var List_Two_txt1 = ['100学分=1元充当购课资金','使用学分可额外获得抽奖机会','使用学分可兑换实体书等精美礼品'];
          var List_Two_txt2 = ['去选课','手机专属','手机专属'];
          var List_Two_link = [web_url+'courselist/index.html','javascript:;','javascript:;'];
          var List_Two_in = ''
          for(var i = 0; i<3;i++){
            var hover_code = ''
            if(i==1){
              hover_code = '<div class="hover_code"></div><div class="code_t code_l">扫<br />码<br />下<br />载</div><div class="code_t code_r">每<br />日<br />抽<br />奖</div>'
            }
            if(i==2){
              hover_code = '<div class="hover_code"></div><div class="code_t code_l">扫<br />码<br />下<br />载</div><div class="code_t code_r">兑<br />换<br />豪<br />礼</div>'
            }
            List_Two_in+='<div class="ins ins'+(i+1)+'">'+hover_code+'<div class="hover_b"><div class="line1">'+List_Two_tils[i]+'</div><div class="line2">'+List_Two_txt1[i]+'</div><div class="line3"><a href="'+List_Two_link[i]+'" target="_blank">'+List_Two_txt2[i]+'</a></div></div></div>'
          }
          List_Two_mins.append(List_Two_in)
          List_Two.append(List_Two_mins)
          
          //轻松得学分
          var List_Three = $('<div class="List_Three"><div class="minstit mt20">轻松得学分</div></div>')
          var List_Three_mins = $('<div class="sxminins clearfix2"></div>')
          var List_Three_tils = ['学习打卡','发表笔记','回复问题','分享课程/课时'];
          var List_Three_txt1 = ['每天观看视频30分钟','观看视频后发表一篇笔记','回复一个他人提出的问题','分享至朋友圈、微博、QQ空间，被访问奖励2学分，每天至多100学分'];
          var List_Three_txt2 = ['+20学分','+20学分','+20学分','+100学分'];
          var List_Three_txt3 = [5,1,3,4];
          var List_Three_in ='';
          for(var i = 0; i<4;i++){
            var cmp = '';
            if(e.info[List_Three_txt3[i]]==1){
              cmp = '<span class="instatus">已完成</span>';
            }
            List_Three_in+='<div class="ins ins'+(i+1)+'">'+ cmp +'<div class="line1">'+List_Three_tils[i]+'</div><div class="line2">'+List_Three_txt1[i]+'</div><div class="line3"><span>'+List_Three_txt2[i]+'</span></div></div>'
          }
          List_Three_mins.append(List_Three_in)
          List_Three.append(List_Three_mins)     
          item1.append(List_Top).append(List_Two).append(List_Three)
          item.append(item1)
          $('body').append(item).append('<div class="signmask"></div>')
          $(".newsigns").css('margin-top',-(parseInt($(".newsigns").height()/2)))
          $(".newsigns,.signmask").show()
          $(".newsigns .sign_closebtn").click(function(event) {
            $(".newsigns,.signmask").remove()
          });
          //进度
          if(me_isvip==1){         
            $('.steps').addClass('steps_vip')
            $('.steps .roundlast .em2').text('+20×2')
          }
          var cur_step = parseInt(e.credit.sign_id)     
          $('.steps .round').each(function(index, el){
            if(index < cur_step){
              $(el).addClass('round_cur');
            }
          });
          $('.steps b').each(function(index, el) {
            if(index < (cur_step-1)){
              $(el).addClass('b_cur');
            }
          });
          $('.List_Two .ins').each(function(index, el){
            if(index >0){
              $(el).hover(function() {
                $(el).addClass('ins_hover')
                $(el).find('.hover_b').hide();
              }, function() {
                $(el).removeClass('ins_hover')
                $(el).find('.hover_b').show();
              });
            }
          });
          $('.sign_decicon').hover(function() {
            $('.List_Top .sign_dec').show();
          }, function() {
            $('.List_Top .sign_dec').hide();
          });

        }
      })      

    })
    
  }
});

//设置COOKIE
function setCookie(name, value, iDay) {
    var oDate = new Date();
  oDate.setTime(oDate.getTime() + iDay*1000); 
  var dateStr = ( iDay == 0 ) ? '' : ';expires='+oDate.toGMTString();
    document.cookie = name+'='+value+dateStr+';path=/';
}
//获取cookie
function getCookie(name) {
    var arr = document.cookie.split('; ');
    var i = 0;
    for(i=0; i<arr.length; i++) {
        var arr2 = arr[i].split('=');
        if(arr2[0] == name) {return arr2[1];}
    }
    return '';
}
//删除cookie
function removeCookie(name) {
    setCookie(name,'',-1);
}

/*isk*/
var iskTimes,iskTimer;
function tt(t){
  if(t<0) t=0;
  var h,m,s;
  h=Math.floor(t/3600),h=h<10?'0'+h:''+h
  m=Math.floor(t%3600/60),m=m<10?'0'+m:''+m
  s=t%3600%60,s=s<10?'0'+s:''+s
  return '<span>'+h+'</span><b>:</b><span>'+m+'</span><b>:</b><span>'+s+'</span>'
}
function buildISK(_now,datas,next){
  var list = $("#isk").show().find('ul').empty().width(datas.goods_data.length*236)
  ,iskInfo = datas.time_data
  ,timerDom = $("#isk").find('p.timer')
  ,ut = parseInt(iskInfo.start_time)
  ,txt = ['下一场次','开始']
  if(next){
    ut = parseInt(iskInfo.end_time)
    txt = ['当前场次','后将结束抢购']
    timerDom.html(txt[0]+tt(ut-_now)+txt[1])
    iskTimer = setInterval(function(){
      _now++;ot=ut-_now;
      if(ot<0){
        clearInterval(iskTimer)
        clearInterval(iskTimes)
        if(next&&next.time_data){
          buildISK(_now,next)
        }else{
          $("#isk").remove()
        }
      }else{
        timerDom.html(txt[0]+tt(ot)+txt[1])
      }
    },1000)
    //实时请求剩余数量
    iskTimes = setInterval(function(){
      $.get(_centerURL+'seckill/index/get-day-seckill-num',{time_id:iskInfo.id},function(_res){
        if(_res.status == 1){
          $.each(_res.data.course_list,function(i,e){
            var item = $("#iskItem_"+e.course_id)
            item.find('.hasNum').html('仅剩'+e.have_num+'个')
            if(e.have_num==0 && item.find('.isEmpty').length==0) item.append('<div class="isEmpty"><p>抢光</p></div>');
          })
        }
      },'json')
    },60*1000)
  }else{
    timerDom.html(txt[0]+' <span>'+fomatDate(ut*1000)+'</span> '+txt[1])
  }
  
  $.each(datas.goods_data,function(i,e){
    var link = e.courseUrl,
    btn = $('<button class="fr">立即购买</button>')
    .click(function(){
      if(user_id==''){goLoginPage();return false;};
      var from = $('<form action="/center/course/index/confirm" method="post"><input type="hidden" name="course_id[]" value="'+e.courseId+'"></form>')
      $('body').html(from);
      from.submit();
    })
    ,info = $('<div class="f16 mt10"></div>')
    .append('<p class="del fl color81 mr10">￥'+e.oldPrice+'</p>')
    .append('<p class="red fl">￥'+e.newPrice+'</p>')
    .append(btn)
    .append('<div class="clear"></div>');
    var item = $('<li id="iskItem_'+e.courseId+'"></li>').append('<div class="course_div" style="position:relative;"><a class="course_img" href="'+link+'" target="_blank"><img src="'+e.imgUrl+'"><p>共'+e.lessonNum+'课时</p></a><p class="hasNum" style="position: absolute;right: 0;top: 0;z-index: 9;background: #e69b2d;padding: 0 5px;color: #FFF;line-height: 18px;">仅剩'+e.haveNum+'个</p></div>')
    .append('<a class="course_title" href="'+link+'" target="_blank">'+e.courseTitle+'</a>')
    .append(info)
    list.append(item)
    if(i==0) item.css('margin-left',0);
    if(!next) btn.remove();
    if(parseInt(e.haveNum)==0) item.append('<div class="isEmpty"><p>抢光</p></div>');
    if(e.cartStatus=='cart_yes') btn.text('已加入购物车').addClass('lock').unbind();  
    if(e.cartStatus=='buy_yes') btn.text('已购买').addClass('lock').unbind()
  })
}

$.get(_centerURL+'seckill/index/get-seckill-data ',{},function(res){
  if(res.status!=1){
    $("#isk").remove()
    return false;
  }
  var datas = res.data;
  if(datas.start.time_data){
    buildISK(datas.now,datas.start,datas.next)
  }else{
    buildISK(datas.now,datas.next)
  }
},'json')


// banner公告
var NewsListtab = function(){
  var NewsList = $(".NewsList")
  var NewsList_item = $(".NewsList").find('li')
  var hei_list = NewsList_item.outerHeight(true);
  var num = 3;//每页展示条数
  var total_num = NewsList_item.length;//列表总条数
  var page_num = Math.ceil(total_num/num)//页数
  var page = 1;//当前页
  NewsList.height(parseInt(hei_list*num))
  function init(pg){   
    NewsList_item.each(function(index, el) {
      if(index<(pg)*num && index>=(pg-1)*num){
        $(this).fadeIn(300);
      }else{
        $(this).fadeOut(300);
      }
    });
  }
  if(page_num>1){
    $(".NewsList_bg").append('<p class="newpages"></p>')
    var str = ''
    for(var i = 0; i<page_num; i++){
      str += '<span></span>'
    }
    $(".newpages").html(str);
    $(".newpages span").eq(0).addClass('cur')
    $(".newpages span").click(function(event) {
      page = $(this).index()+1
      $(this).addClass('cur').siblings().removeClass('cur');
      init(page)
    });
    init(1);
    setInterval(function(){
      page++;
      if(page > page_num){
        page = 1
      }
      init(page);
      $(".newpages span").eq(page-1).addClass('cur').siblings().removeClass('cur')
    }, 5000)
  }else{
    NewsList_item.show();
  }
}
NewsListtab();

