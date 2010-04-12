//	lib.monoSnippets.js
//	Evadne Wu at Iridia Productions
//	Version as of Mar. 13, 2010






var mono = {





//	Logging and Debugging
	
	log: function(message) {

		if (!!!debugMode) return mono;
		
		if (window.console == undefined) return mono;

		try {

			console.log.apply(console, arguments);
		
		} catch (e) {}
		
		return mono;
		
	},
	
	info: function(message) {
	
		if (!!!debugMode) return mono;
		
		if (window.console == undefined) return mono;
		
		try {

			console.info.apply(console, arguments);
		
		} catch (e) {}
		
		return mono;
		
	},
	
	error: function(message) {
	
		if (!!!debugMode) return mono;
		
		if (window.console == undefined) return mono;
		
		try {

			console.error.apply(console, arguments);
		
		} catch (e) {}
		
		return mono;
		
	},
	
	groupStart: function(title) {
		
		if (!!!debugMode) return mono;
		
		if (window.console == undefined) return mono;
		
		try {

			console.group.apply(console, arguments);
		
		} catch (e) {}

		return mono;
		
	},
	
	groupEnd: function() {
	
		if (!!!debugMode) return mono;
		
		if (window.console == undefined) return mono;
		
		try {

			console.groupEnd.apply(console, arguments);
		
		} catch (e) {}

		return mono;
		
	},
	
	logChanged: function(changedElement, changedKey, oldValue, newValue) {
	
		if (!!!debugMode) return mono;
		
		if (window.console == undefined) return mono;
		
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
	
	getFunctionName: function(aFunctionReference) {
	
		aFunctionReference = String(aFunctionReference);
	
		var plausibleFunctionReferenceElements = undefined;
		
		try {
		
		plausibleFunctionReferenceElements = /function\s([a-zA-Z]+)\(/ig.exec(aFunctionReference)[1];
		
		} catch (e) {}
	
		return plausibleFunctionReferenceElements;
		
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







