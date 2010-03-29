//	lib.monoSnippets.js
//	Evadne Wu at Iridia Productions
//	Version as of Mar. 13, 2010






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





//	Stripping

	stripUnits: function(stringToStrip) {

		return Number(String(stringToStrip).replace(/px|em/ig, ''));
 
	},





//	Dying and / or choking.  Minions that does nothing, but enables one-liners.

	die: function() {
	
		return undefined;
	    
	},
	
	choke: function() {

		return {};
	        
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







