//	lib.monoSnippets.js
//	Evadne Wu at Iridia Productions
//	Version as of Mar. 13, 2010










/* Created by Martin Hintzmann 2008 martin [a] hintzmann.dk
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 *
 * Version: 0.2
 * Requires: jQuery 1.2+
 * http://plugins.jquery.com/project/textshadow
 *
 */
(function($) {
	$.fn.textShadow = function(option) {
		if (!$.browser.msie) return;
		var IE6 = $.browser.version < 7;
		return this.each(function() {
			var el = $(this);
			var shadow = el.textShadowParse(this.currentStyle["text-shadow"]);
			shadow = $.extend(shadow, option);

			el.textShadowRemove();

			if (shadow.x == 0 && shadow.y == 0 && shadow.radius == 0) return;

			if (el.css("position")=="static") {
				el.css({position:"relative"});
			}
			el.css({zIndex:"0"});
			if (IE6) {
				el.css({zoom:"1"});
			}
			
			var span=document.createElement("span");
			$(span).addClass("jQueryTextShadow");
			$(span).html(el.html());
			$(span).css({
				padding:		this.currentStyle["padding"],	
				width:		el.width(),
				position:	"absolute",
				zIndex:		"-1",
				color:		shadow.color!=null?shadow.color:el.css("color"),
				left:			(-parseInt(shadow.radius)+parseInt(shadow.x))+"px",
				top:			(-parseInt(shadow.radius)+parseInt(shadow.y))+"px"
			});
			
			if (shadow.radius != 0) {
				if (shadow.opacity != null) {
					$(span).css("filter", "progid:DXImageTransform.Microsoft.Blur(pixelradius="+parseInt(shadow.radius)+", enabled='true', makeShadow='true', ShadowOpacity="+shadow.opacity+")");
				} else {
					$(span).css("filter", "progid:DXImageTransform.Microsoft.Blur(pixelradius="+parseInt(shadow.radius)+", enabled='true')");
				}
			}	
			el.append(span);
		
	  });
	};
	
	$.fn.textShadowParse = function(value) 
	{
		value = String(value)
			.replace(/^\s+|\s+$/gi, '')
			.replace(/\s*!\s*important/i, '')
			.replace(/\(\s*([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^\)]+)\s*\)/g, '($1/$2/$3/$4)')
			.replace(/\(\s*([^,\)]+)\s*,\s*([^,\)]+)\s*,\s*([^\)]+)\s*\)/g, '($1/$2/$3)')
	
		var shadow = {
			x      : 0,
			y      : 0,
			radius : 0,
			color  : null
		};

		if (value.length > 1 || value[0].toLowerCase() != 'none') {
			value = value.replace(/\//g, ',');
			var color;
			if ( value.match(/(\#[0-9a-f]{6}|\#[0-9a-f]{3}|(rgb|hsb)a?\([^\)]*\)|\b[a-z]+\b)/i) && (color = RegExp.$1) ) {
				shadow.color = color.replace(/^\s+/, '');
				value = value.replace(shadow.color, '');
			}

			value = value
				.replace(/^\s+|\s+$/g, '')
				.split(/\s+/)
				.map(function(item) {
						return (item || '').replace(/^0[a-z]*$/, '') ? item : 0 ;
					});

			switch (value.length)
			{
				case 1:
					shadow.x = shadow.y = value[0];
					break;
				case 2:
					shadow.x = value[0];
					shadow.y = value[1];
					break;
				case 3:
					shadow.x = value[0];
					shadow.y = value[1];
					shadow.radius = value[2];
					break;
			}
			if ((!shadow.x && !shadow.y && !shadow.radius) || shadow.color == 'transparent') {
				shadow.x = shadow.y = shadow.radius = 0;
				shadow.color = null;
			}
		}

		return shadow;
	};

	$.fn.textShadowRemove = function() {
		if (!$.browser.msie) return;
		return this.each(function() {
			$(this).children("span.jQueryTextShadow").remove();
		});
	};
})(jQuery);

if(typeof Array.prototype.map == 'undefined') {
	Array.prototype.map = function(fnc) {
		var a = new Array(this.length);
		for (var i = 0; i < this.length; i++) {
			a[i] = fnc(this[i]);
		}
		return a;
	}
}


/* Box Shadow first created by Martin Hintzmann 2008 martin [a] hintzmann.dk
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 *
 * Version: 0.1
 *
 * Requires:
 *   jQuery 1.2+
 */
(function($) {
	$.fn.boxShadow = function(xOffset, yOffset, blurRadius, shadowColor) {
		if (!$.browser.msie) return;
		return this.each(function(){
			$(this).css({
				position:	"relative",
				zoom: 		1,
				zIndex:		"2"
			});
			$(this).parent().css({
					position:	"relative"
			});
			
			var div=document.createElement("div");
			$(this).parent().append(div);

			var _top, _left, _width, _height;
			if (blurRadius != 0) {
				$(div).css("filter", "progid:DXImageTransform.Microsoft.Blur(pixelRadius="+(blurRadius)+", enabled='true')");
				_top = 		yOffset-blurRadius-1;
				_left =		xOffset-blurRadius-1;
				_width =		$(this).outerWidth()+1;
				_height =	$(this).outerHeight()+1;
			} else {
				_top = 		yOffset;
				_left =		xOffset;
				_width = 	$(this).outerWidth();
				_height = 	$(this).outerHeight();
			}
			$(div).css({
				top: 			_top,
				left:			_left,
				width:		_width,
				height:		_height,
				background:	shadowColor,
				position:	"absolute",
				zIndex:		1
			});
			
	  });
	};
})(jQuery);





$.fn.defaultValue = function() {

	var elements = this;
	var args = arguments;
	var i = 0;
	
	return elements.each(function() {			

		var el = $(this);
		var def = args[i++];

		el.val(def).addClass("monoDefaultValueEmpty").focus(function() {
		
			if(el.val() == def) el.val("").removeClass("monoDefaultValueEmpty").removeClass("monoDefaultValueEmptyAccessed");
			
		}).blur(function() {
			
			if(el.val() == "") el.val(def).addClass("monoDefaultValueEmpty").addClass("monoDefaultValueEmptyAccessed");

		});

	});

}










$.fn.slowEach = function(interval, callback){

	var array = this;
	if( !array.length ) return;
	var i = 0;
	next();

	function next(){
	
		if( callback.call( array[i], i, array[i] ) !== false )
		if( ++i < array.length )
		setTimeout(next, interval);
	
	}
	
};









































var mono = {





//	Logging and Debugging
	
	log: function(message) {
		
		if (window.console != undefined)
		console.log.apply(console, arguments);

		return mono;
		
	},
	
	info: function(message) {
	
		if (window.console != undefined)
		console.info.apply(console, arguments);
		
		return mono;
		
	},
	
	error: function(message) {
	
		if (window.console != undefined)
		console.error.apply(console, arguments);
		
		return mono;
		
	},
	
	groupStart: function(title) {
		
		if (window.console != undefined)
		console.group.apply(console, arguments);

		return mono;
		
	},
	
	groupEnd: function() {
	
		if (window.console != undefined)
		console.groupEnd.apply(console, arguments);

		return mono;
		
	},
	
	logChanged: function(changedElement, changedKey, oldValue, newValue) {
	
		return mono.log(
		
			changedElement + "['" + changedKey + "']: " +
			oldValue + " => " + newValue
		
		);
		
	},





//	Lazy-Loading

	CSS: function monoLoadExternalStylesheet(stylesheetLocationURI) {

		$("<link />")
		.attr("rel", "stylesheet")
		.attr("type", "text/css")
		.attr("href", stylesheetLocationURI)
		.appendTo("head");
		
		return mono;
	
	},





//	Minions
	
	HTML5: function() {
	
	//	a fork of http://html5shiv.googlecode.com/svn/trunk/html5.js
	
		for (tagToBeInserted in ['abbr', 'article', 'aside', 'audio', 'canvas', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'mark', 'menu', 'meter', 'nav', 'output', 'progress', 'section', 'summary', 'time', 'video']) {

		/*@cc_on
		
			document.createElement(tagToBeInserted)

		@*/
		
		}

	}
	
};