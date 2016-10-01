;(function(win){
	/*变量：*/
	var doc = win.document;
	var docEL = doc.documentElement;
	var metaEL = doc.querySelector('meta[name="viewport"]');
	var dpr = 0;
	var scale = 0;
	var timeoutid;

	/*采用已有meta标签viewport设置*/
	if (metaEL) {
		var match = metaEL.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
		if (match) {
			scale = parseFloat(match[1]);
			dpr = parseInt(1/scale);
		}else {
			metaEL= 0;
		}
	}

	/*没有设置meta时，自动设置dpr和scale*/
	/*苹果手机按devicePixelRatio设置，最大为3；其余设备采用dpr=1*/
	if (!dpr) {
		var isIphone = win.navigator.appVersion.match(/iphone/gi);
		var devicePixelRatio = win.devicePixelRatio;
		if (isIphone) {
			if (devicePixelRatio >=3){
				dpr = 3
			}else {
				dpr = devicePixelRatio;
			}
		}else {
			dpr = 1
			//其他设备,dpr默认为1
		}
		scale = 1/dpr;
	}

	/*为html标签添加data-dpr属性*/
	docEL.setAttribute('data-dpr',dpr);

	/*为body设置默认字体大小*/
	if (doc.readyState === 'complete') {
		doc.body.style.fontSize = 16 * dpr + 'px';
	}else {
		doc.addEventListener('DOMContentLoaded',function(e){
			doc.body.style.fontSize = 16 * dpr +'px';
		},false);
	}

	/*没有meta标签时，自动添加标签*/
	if (!metaEL) {
		metaEL = doc.createElement('meta');
		metaEL.setAttribute('name','viewport');
		metaEL.setAttribute('content','initial-scale='+scale+', maximum-scale='+scale+', minimum-scale='+scale+', user-scalable=no');
		var headEL = doc.querySelector('head');
		if (headEL) {
			headEL.appendChild(metaEL);
		}else {
			var wrap = doc.createElement('div');
			wrap.appendChild(metaEL);
			doc.write(wrap.innerHTML);
		}
	}

	/*函数：更新rem，并添加font-size属性到html标签*/
	function refreshRem(){
		/*getBoundingClientRect().width相当于物理像素*/
		var width = win.innerWidth;
		/*width / dpr > 540等于独立像素*/
		if (width / dpr > 540) {
            width = 540 * dpr;
        }
		var rem = width/10;
		docEL.style.fontSize = rem +'px';
	}

	/*添加resize事件,当窗口大小发生变化,调用refreshRem*/
	win.addEventListener('resize',function(){
		clearTimeout(timeoutid);
		timeoutid = setTimeout(refreshRem,300);
	},false);

	/*添加pageshow事件,当重新载入页面时,判断是否是缓存,如果是缓存,调用refreshRem*/
	win.addEventListener('pageshow',function(e){
		if (e.persisted) {
			clearTimeout(timeoutid);
			timeoutid = setTimeout(refreshRem,300);
		}
	},false);

	refreshRem();

})(window);