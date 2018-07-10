var LoadHot = Class.create()
LoadHot.prototype.initialize = function(domId,data,num) {
  this.domId = domId
  this.datas = data
  this.num = num
  this.cBox = []

  var item = this.listItem(data,num)
  $("#"+domId).replaceWith(item)
  this.success(item)
};
LoadHot.prototype.listItem = function(e,n){
  this.cBox[n] = {}
  var me = this,
  item = $('<div class="atment_bg course_height bgff w1160""></div>')
  // .append('<div class="atment_box fl"><a class="titleName" href="'+web_url+'course/courseList/id-'+fls[n].cate_id+'" target="_blank">'+fls[n].cname+'</a><div class="atment atment_s"><a href="'+e.content.img_arr[0].img_link+'" target="_blank"><img src="'+e.content.img_arr[0].img_url+'"></a><div class="bottom"></div></div></div>')
  .append('<div class="atment_box fl"><a class="titleName" href="'+web_url+'courselist/'+fls[n].cate_id+'.html" target="_blank">'+fls[n].cname+'</a><div class="atment atment_s"><a href="'+e.content.img_arr[0].img_link+'" target="_blank"><img src="'+e.content.img_arr[0].img_url+'"></a><div class="bottom"></div></div></div>')
  var textArr = item.find('.bottom');
  for(var tv in e.content.text_arr){
    textArr.append('<a href="'+e.content.text_arr[tv].ad_link+'" target="_blank">'+e.content.text_arr[tv].ad_title+'</a>')
  }
  if(e.content.img_arr.length==5){
    item.find(".atment").removeClass('atment_s')
  }
  ////
  var contentBox = $('<div class="course_box fl"></div>'),
  tit = $('<div class="ititle_box fl"></div>'),
  defaultLi = $('<li>热门</li>'),
  titUL = $('<ul class="ititle_list fl"></ul>')
  .append(defaultLi);

  var cbc = $('<div class="course_box_con fl"></div>'),
  defaultList = $('<ul class="course_abc course_list_01 course_list_01s  fl"></ul>'),
  cList = $('<ul class="course_abc course_list_02 course_list_02s show fl"></ul>')
  for(var i=1;i<4;i++){
    var d = e.content.img_arr[i]?e.content.img_arr[i]:{img_link:"",img_url:""}
    defaultList.append('<li><a href="'+d.img_link+'" target="_blank"><img src="'+d.img_url+'"></a></li>');
  }
  if(e.content.img_arr.length==5){
    defaultList.removeClass('course_list_01s').find('li').eq(1).addClass('two').append('<a href="'+e.content.img_arr[4].img_link+'" target="_blank"><img src="'+e.content.img_arr[4].img_url+'"></a>')
    cList.removeClass('course_list_02s')
  }

  contentBox.append(tit.append(titUL).append('<span class="ititle_btn fl"></span><div class="clear"></div>')).append(cbc.append(defaultList).append(cList))

  item.append(contentBox).append('<div class="clear"></div>')
  $(e.cate_sec).each(function(i,e){
    var cates = $('<li>'+e.cname+'</li>')
    titUL.append(cates)
    cates.click(function(){
      $(this).addClass('show').siblings().removeClass('show')
      cList.show()
      defaultList.hide()
      if(typeof(me.cBox[n][e.cate_id])=='undefined'){
        me.getCateDatas(e.cate_id,cList,n)
      }else{
        me.buildCourseList(me.cBox[n][e.cate_id],cList)
      }
    })
    if(i==0) cates.addClass('show');
  })
  defaultLi.click(function(){
    $(this).addClass('show').siblings().removeClass('show')
    cList.hide()
    defaultList.show()
  })
  me.getCateDatas(e.cate_sec[0].cate_id,cList,n)
  return item
}

LoadHot.prototype.getCateDatas = function(cid,list,n){
  var me = this;
  $.ajax({
    url:web_url+'center/index/index/get-cate-rec',
    data:{id:cid},
    dataType:'json',
    success:function(res){
      me.cBox[n][cid] = res.data
      me.buildCourseList(res.data,list)
    }
  })
}
LoadHot.prototype.cateItem = function(v){
  var item = $('<li></li>')
  .append('<div class="course_div"><a class="course_img" href="'+web_url+'course/course_id-'+v.course_id+'.html" target="_blank"><img src="'+v.img_url+'"><p>共'+v.lession_nums+'课时</p></a></div>')
  .append('<a class="course_title" href="'+web_url+'course/course_id-'+v.course_id+'.html" target="_blank">'+v.title+'</a>')
  if(v.actinfo.newPrice){
    item.append('<p class="course_price"><span class="first">￥'+v.actinfo.newPrice+'</span><span class="last">原价￥'+v.price+'</span></p>')
  }else{
    if(v.price == 0){
      item.append('<p class="course_price"><span class="first">会员免费</span></p>')
    }else{
      item.append('<p class="course_price"><span class="first">￥'+v.price+'</span></p>')
    }
  }
  return item
}
LoadHot.prototype.buildCourseList = function(v,list){
  var me = this
  list.empty()
  $.each(v,function(i,e){
    list.append(me.cateItem(e))
  })
}
LoadHot.prototype.success = function(e){
  if(e.find('.ititle_list').height()>50){
     $(this).next('.ititle_btn').show();
  }
}

// 限时免费
course_time_free()
function course_time_free(){
  var time_url = web_url+'center/course/index/index-course-free';
  $.getJSON(time_url, function(data){
    var e = data.data.list;
    var li = '';
    if(data.status == 1){
      $.each(e,function(n,m){
        li += '<li><div class="course_div"><a class="course_img" href="'+m.course_url+'" target="_blank"><img src="'+m.img+'" /><p>共'+m.lession_nums+'课时</p></a></div><a class="course_title" href="'+m.course_url+'" target="_blank">'+m.title+'</a><p class="course_price"><span class="three fl">￥'+m.price+'</span><span class="xsmf fl pl10">限时免费</span><span class="time fr">'+m.msg+'</span></p></li>';
      })
      $('#course_time_free').append(li).append('<div class="clear"></div>')
    }
  });
}