//	lib.monoSnippets.defaultValue.js

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