/**
 * Created by Administrator on 2016/7/28.
 */
var Introduce, IntroduceFn = function(){
  this.init()
}
IntroduceFn.prototype = {
  init:function(){
    this.dom = $('<div></div>')
    this.dom.css({
      background:'url('+imgpath+'../../center/images/bg50.png)',
      position:'fixed',
      left:'0',
      top:'0',
      width:'100%',
      height:'100%',
      'z-index':10000000
    }).append('<div style="z-index:10000001;width:200px;height:100px;background:#FFF url('+imgpath+'../../center/images/loading.gif) no-repeat center;position:absolute;left:50%;top:50%;margin-left:-100px;margin-top:-50px;"></div>').hide()
    $('body').append(this.dom)
  },
  show:function(){
    this.dom.show()
  },
  hide:function(){
    this.dom.hide()
  }
}

setTimeout(function(){
  Introduce = new IntroduceFn()
},100)



function ThisCur(dom,name){
  var a = name?name:'cur'
  dom.addClass(a).siblings().removeClass(a)
}

typeof(_Export)!='undefined' && _Export()
function goLoginPage(){
  location.href="/user/login.html";
}
function getUrl(id,type){
  // type=[course,lec,pack,wejob,spec]
  var type = type?type:'course'
  return _urls[type].replace('888',id)
}

// 
(function(){

  if((typeof(_play_lesson_video_tjm)) == "undefined"){ //tjm
    $.get(_centerURL+'/index/index/direct',function(res){
      if(res.status!=1){
        $("#ALLCourse").remove()
        return false
      }
      for(var i=0;i<res.data.length;i++){
        $("#ALLCourseList").append(_directItem(res.data[i]))
      }
    },'json')
  }

function _directItem(e){
   var item = $('<div class="item"></div>')
  .append(_directItem_Lv1(e.parent_ids,e.first_name,e.parent_ids_url))
  .append(_directItem_Lv2(e.list))
  .append(_directItem_More(e.list,e.other,e.first_name).append('<a href="'+e.img_link+'" target="_blank"><img src="'+e.img_url+'"></a>'))
  return item
}
function _directItem_Lv1(ids,names,urls){
  var item = $('<h2></h2>')
  for(var i=0;i<ids.length;i++){
    item.append('<a href="'+urls[i]+'" target="_blank">'+names[i]+'</a>')
    if(i<ids.length-1){
      item.append('<span></span>')
    }
  }
  return item
}
function _directItem_Lv2(e){
  var item = $('<p></p>')
  for(var i=0;i<e.length;i++){
    if(e && e[i] && e[i][0] && e[i][0].parent_id) item.append('<a href="'+e[i][0].url+'" target="_blank">'+e[i][0].second_name+'</a>')
  }
  return item
}
function _directItem_More(e,v,names){
  var main = $('<div class="main"></div>')
  for(var i=0;i<e.length;i++){
    var dl = $('<dl></dl>');
    dl.append('<dt>'+names[i]+'</dt>')
    .append(_directItem_DD(e[i]))
    main.append(dl)
  }
  main.append(_directItem_Other(v))
  return $('<div class="more"></div>').append(main)
}
function _directItem_DD(e){
  var dd = $('<dd></dd>');
  for(var i=0;i<e.length;i++){
    dd.append(_directItem_DDLv2(e[i]))
  }
  return dd;
}
function _directItem_DDLv2(e){
  var a = $('<p class="fl mr10"></p>')
  .append('<a href="'+e.url+'" target="_blank">'+e.second_name+'</a>')
  return a;
}
function _directItem_Other(e){
  var dd = $('<dd></dd>')
  ,item = $('<dl></dl>')
  .append('<dt>管家推荐</dt>')
  .append(dd)
  for(var i=0;i<e.length;i++){
    dd.append('<p><a href="'+e[i].rec_link+'" target="_blank">'+e[i].rec_name+'</a></p>')
  }
  return item
}
})()

$(function(){
  $('body').on('click','.vipBig,.vipMedium,.vipSmall,.vipSide,.vipBig_gray,.vipMedium_gray,.vipSmall_gray,.vipSide_gray,i.vip.icon',function(){
    window.open('http://home.51cto.com/members/in-fo')
    return false;
  })
  new EDU_Topic()
})

//topic
var EDU_Topic = Class.create()
EDU_Topic.prototype.initialize = function() {
  var me = this;
  $(".edu-ad").each(function(i,e){
    me.getCon($(this))
  })
};
EDU_Topic.prototype.getCon = function(dom) {
  var ps = {
    info_id : dom.attr('info_id'),
    ad_id : dom.attr('ad_id'),
    type : dom.attr('type')
  }
  $.get(_centerURL+'/advert/index/index',ps,function(res){
    dom.html(res.ad_content)
  },'json')
};

var AutoAD = Class.create()
AutoAD.prototype = {
  initialize:function(parms){//定义默认值
    this.ip = imgpath?imgpath:'https://static1.51cto.com/edu/images/whitestyle/';
    this.cookie=parms.cookie?parms.cookie:'AutoAD'
    this.ts=parms.ts?parms.ts:86400
    this.W = parms.W?parms.W:500;
    this.H = parms.H?parms.H+'px':'auto';
    this.ADD = parms.ADD?parms.ADD:''
    this.cb = parms.cb?parms.cb:function(){}; 
    this.ok = parms.ok?parms.ok:function(){};
    this.autoClose = parms.autoClose?parms.autoClose:false;
    this.noCBtn = parms.noCBtn?parms.noCBtn:false;
    this.mask = parms.mask?parms.mask:false;
    this.fixed = parms.fixed?parms.fixed:true;
    this.last = parms.last?parms.last:false
    if(this.last && new Date().getTime()>new Date(this.last).getTime()) return false
    if(!getCookie(this.cookie)){
      this.build();
      setCookie(this.cookie,1,this.ts)
    }
  },
  build:function(){
    //半透明的边框
    this.mb = $('<div></div>');
    this.mb.css({
      'position':'fixed',
      'display':'none',
      'left':($(window).width()-this.W)/2+3+'px',
      'z-index':'9999999',
      'overflow':'hidden',
      'width':this.W+'px',
      'height':this.H,
      'padding':'3px'
    });
    //close
    this.cBtn = $('<img src="'+this.ip+'../close_40.png" />');
    this.cBtn.css({
      'overflow':'hidden',
      'cursor':'pointer',
      'position':'absolute',
      'right':0,
      'top':0,
      'z-index':10
    });

    //Mask
    this.Mask = $('<div id="Mask"></div>');
    this.Mask.css({
      'overflow':'hidden',
      'z-index':'9999998',
      'width':'100%',
      'height':$(window).height(),
      'position':'fixed',
      'top':'0px',
      'left':'0px',
      'background':'#FFF',
      'opacity':0.2
    });

    this.builder();
  },
  builder:function(){
    var me = this;
    this.mb.append(this.ADD);
    if(this.noCBtn == false){
      this.mb.append(this.cBtn);
    }
    this.show();
  },
  show:function(){
    var me = this;
    if(this.mask) $('body').append(this.Mask);
    if(typeof(this.mask)=='string') this.Mask.css('background',this.mask)
    if($("#"+this.id).length>0) $("#"+this.id).remove();
    $('body').append(this.mb);
    this.mb.css('top',($(window).height()-this.mb.height())/2);
    if(this.mb.height()>$(window).height()){
      $(window).css('overflow','hidden');
      $(this.mb).css({
        'position':'absolute',
        'top':30+$(window).scrollTop()
      })
    }
    $(this.mb).fadeIn(this.t*1000);
    $(this.mb).find('a.closeMB').click(function(){//
      me.close();
      me.complete();
    });
    //
    $(this.cBtn).click(function(){//
      me.close();
      me.closed();
    }).bind('mouseover',function(){//
      $(this).css('transform','rotate(30deg)');
    }).bind('mouseout',function(){//
      $(this).css('transform','rotate(0deg)');
    });

    $(this.mb).find('button.closeMB').click(function(){//
      me.close();
      me.complete();
    });
    if (this.autoClose) {//
      setTimeout(function(){//
        me.close();
        me.complete();
      },this.autoClose*1000);
    };

    if(this.fixed!==true){
      this.mb.css({
        'position':'absolute',
        'top':$(window).scrollTop()+100
      })
    }
  },
  close:function(){
    var me = this;
    $(this.Mask).remove();
    $(this.mb).remove();
  },
  closed:function(){
    this.cb();
  },
  complete:function(){
    this.ok();
  }
}

$(function(){
  var href01 = location.href.indexOf('http://edu.51cto.com/px');
  var href02 = location.href.indexOf('http://edu.51cto.com/mic-position');
  var timestamp = parseInt(new Date().getTime()/1000);
  var timebegin = parseInt(new Date("2017/11/12 00:00:00").getTime()/1000);
  var timeover = parseInt(new Date("2017/11/17 00:00:00").getTime()/1000);
  var timemid = parseInt(new Date("2017/11/11 18:00:00").getTime()/1000);
  if(href01>-1 || href02>-1 || $(window).width()<600)return false;
  //var timestamp = parseInt(new Date().getTime()/1000);
  
  if(timestamp>timebegin && timestamp<timeover){
    new AutoAD({
      ADD:$('<a href="http://edu.51cto.com/activity/5.html?qd=tk" class="closeMB" target="_blank" styel="display:block;"><img src="https://s1.51cto.com/images/201711/09/db2853e2dc0883a8ecc72beb571ff11e.png"></a><a class="closeMB" style="position: absolute;right:41px;top: 46px;width: 40px;height: 40px;cursor: pointer;" href="javascript:;"></a>'),
      W:600,
      H:500,
      cookie:'Box222',
      mask:"#000",
      noCBtn: true
    })
  }else if(timestamp>timemid && timestamp<timebegin){
    new AutoAD({
      ADD:$('<a href="http://edu.51cto.com/activity/4.html?qd=tk3#qnzh" class="closeMB" target="_blank" styel="display:block;"><img src="https://s1.51cto.com/images/201711/09/759308df1022c6a19c3abf9fa2eb7667.png"></a><a class="closeMB" style="position: absolute;right:90px;top: 24px;width: 54px;height: 54px;cursor: pointer;" href="javascript:;"></a>'),
      W:600,
      H:370,
      cookie:'Box333',
      mask:"#000",
      noCBtn: true
    })

  }else{
    new AutoAD({
      ADD:$('<a href="http://edu.51cto.com/activity/4.html?qd=tk1#qmfx" class="closeMB" target="_blank" styel="display:block;"><img src="https://s1.51cto.com/images/201711/02/566e272bf61c979cd75d65e0fbc7ac1b.png"></a><a class="closeMB" style="position: absolute;right:3px;top: 4px;width: 34px;height: 34px;cursor: pointer;" href="javascript:;"></a>'),
      W:600,
      H:280,
      cookie:'Box1111',
      mask:"#000",
      noCBtn: true,
      last:'2017/11/12'
    }); 
  }
})