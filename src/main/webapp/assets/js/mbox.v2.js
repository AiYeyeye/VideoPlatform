/*
 * 
 * AutoBox
 * 
 * @requires jQuery v1.7 or later
 * @create By 2014-11-12
 * @author Ravens<34263626@qq.com>
 * 
 */


//自定义AutoMessageBox
// parms ={}
// parms.img = {ok|remind|quest}
var AutoBox = function(p){
	this.init(p);
}
AutoBox.prototype = {
	init:function(parms){//定义默认值
		this.ip = imgpath?imgpath:'./images/';
		this.id = (parms.id?'Msg_'+parms.id:'Msg_'+Math.random()*10000);
		this.W = parms.W?parms.W:260;
		this.img = parms.img?parms.img:'ok';
		this.title = parms.title?parms.title:'';
		this.content = parms.content?parms.content:'成功';
		this.Yes = parms.Yes?parms.Yes:false;
		this.No = parms.No?parms.No:false;
		this.t = parms.st?parms.st:1;
		this.noCon = parms.noCon?parms.noCon:false;
		this.noCBtn = parms.noCBtn?parms.noCBtn:false;
		this.ADD = parms.ADD?parms.ADD:false;
		this.src = parms.src?parms.src:false;
		this.cb = parms.cb?parms.cb:function(){};
		this.ok = parms.ok?parms.ok:function(){};
		this.yc = parms.yc?parms.yc:function(){};
		this.nc = parms.nc?parms.nc:function(){};
		this.autoClose = parms.autoClose?parms.autoClose:false;
		this.mask = parms.mask?parms.mask:false;
		this.parent = parms.parent?parms.parent:false;
		this.fixed = parms.fixed?parms.fixed:true;

		this.build();
	},
	build:function(){
		//半透明的边框
		this.mb = $('<div id="'+this.id+'"></div>');
		this.mb.css({
			'position':'fixed',
			'display':'none',
			'left':($(window).width()-this.W)/2+3+'px',
			'z-index':'9999999',
			'overflow':'hidden',
			'width':this.W+'px',
			'background':'#FFF',
			'border-radius':'4px'
		});
		//容器
		this.m = $('<div></div>');
		this.m.css({
			'overflow':'hidden',
			'width':this.W+'px',
			'font-size':'14px',
			'padding':'30px 0'
		});
		if(this.Yes||this.No) this.m.css('padding-bottom','15px');
		if(this.noCon) this.m.css('padding','10px 0');
		//close
		this.cBtn = $('<img src="'+this.ip+'mbox/v2/close.png" />');
		this.cBtn.css({
			'overflow':'hidden',
			'width':'20px',
			'height':'20px',
			'top':'10px',
			'right':'10px',
			'cursor':'pointer',
			'position':'absolute'
		});
		//title
		this.Title = $('<h6>'+this.title+'</h6>');
		this.Title.css({
			'overflow':'hidden',
			'max-width':this.W-32+'px',
			'line-height':'1',
			'font-size':'18px',
			'font-weight':'normal',
			'color':'#000',
		});
		//Con
		this.Con = $('<div></div>');
		this.Con.css({
			'overflow':'hidden',
			'display':'block;',
			'margin':'0 30px',
			'padding-left':'75px',
			'min-height':'50px',
			'background':'url('+this.ip+'mbox/v2/'+this.img+'.png) no-repeat left top'
		});
		//Con
		this.ConFont = $('<p style="line-height:25px;padding-top:10px;">'+this.content+'</p>');

		//bottons
		this.Btns = $('<div style="text-align:center;margin-top:15px"></div>');
		this.BtnYes = $('<button>'+this.Yes+'</botton>');
		this.BtnYes.css({
			'margin':'5px'
		})
		this.BtnNo = $('<button>'+this.No+'</botton>');
		this.BtnNo.css({
			'margin':'5px',
			'background':'#9A9A9A'
		});

		//Mask
		this.Mask = $('<div id="Mask"></div>');
		this.Mask.css({
			'overflow':'hidden',
			'z-index':'9999990',
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
		//
		var me = this;
		this.mb.append(this.m);
		if(this.noCBtn == false){
			this.mb.append(this.cBtn);
		}
		if(this.noCon == false){
			this.m.append(this.Con);
			if(this.title != ''){
				this.Con.append(this.Title);
			}
			this.Con.append(this.ConFont);
		}else{
			this.m.append(this.ADD);
		}
		

		if(me.Yes || me.No){
			this.m.append(this.Btns);
			if(me.Yes){
				this.Btns.append(this.BtnYes)
			};
			if(me.No){
				this.Btns.append(this.BtnNo)
			}
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

		if(this.Yes || this.No){
			$(this.BtnYes).click(function(){//
				me.close();
				me.YesClick();
			});
			$(this.BtnNo).click(function(){//
				me.close();
				me.NoClick();
			});
		}else{
			$(this.mb).find('button.closeMB').click(function(){//
				me.close();
				me.complete();
			});
		}
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
		if(this.parent){
			var p = typeof(this.parent)=='string'?$("#"+this.parent):this.parent
			this.mb.css({
				'position':'absolute',
				'left':(p.width()-this.W)/2+3+'px'
			})
			p.append(this.mb)
		}
	},
	close:function(){
		var me = this;
		$(this.Mask).remove();
		$(this.mb).fadeOut(500,function(){//
			$(this).remove();
		});
		
	},
	closed:function(){
		this.cb();
	},
	complete:function(){
		this.ok();
	},
	YesClick:function(){
		this.yc();
	},
	NoClick:function(){
		this.nc();
	},
	hide:function(){
		this.mb.hide()
	},
	reShow:function(){
		this.mb.show()
	}
}