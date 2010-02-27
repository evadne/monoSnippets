//	monoSnippets.js — Requires jQuery.  Last updated Feb. 25, 2010.










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





function d (message){

	if (!window.console) return;

	if (typeof debugMode != "boolean" || debugMode != true) return;
	window.console.log(message);
	
	if (typeof debugModeVerbose != "boolean" || debugModeVerbose != true) return;
	var calleeObject = arguments.callee.caller.toString();
	var calleeName = calleeObject.match(/function\s+(\[^\s\(]+)/);		
	window.console.log(calleeObject);

}





function monoValidate(stringToBeValidated, proposedCategory) {

//	So we can leniently call monoValidate to validate against nothing; that way everything that is not required to be validated is valid

	if (stringToBeValidated == '' || proposedCategory == '') return true;		
	var options = $.extend({
	
		'caseSensitive': false
	
	}, arguments[2]);

	var schemata = {
	
		'email': new RegExp(/[a-z0-9!#$%&'*+//=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+//=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}||com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/),
		
		'uri': new RegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/),
		
		'ipv6': new RegExp(/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/)
	
	}
	
	if (!options.caseSensitive) stringToBeValidated = String(stringToBeValidated).toLowerCase();
	
	if (schemata[String(proposedCategory)] == undefined) return false;
	
	return (String(stringToBeValidated).match(schemata[String(proposedCategory)]) != null);

}










var mono = {

	log: d,
	
	error: function(message) {
	
		if (!window.console) return;
		console.error(message);
		
	},
	
	groupStart: function(title) {
		
		if (!window.console) return;
		console.group(title);
		
	},
	
	groupEnd: function() {
	
		if (!window.console) return;
		console.groupEnd();
		
	},
	
	logChanged: function(changedElement, changedKey, oldValue, newValue) {
	
		mono.log(changedElement + "['" + changedKey + "']: " + oldValue + " => " + newValue);
		
	},

	CSS: function monoLoadExternalStylesheet(stylesheetLocationURI) {

		$('head').append('<link rel="stylesheet" type="text/css" href=' + stylesheetLocationURI + '>');
	
	},
	
	def: function isDefined(objectToCheck) {
		
		return (!(typeof objectToCheck == "undefined"));
		
	}

}