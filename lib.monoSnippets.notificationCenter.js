//	lib.monoSnippets.notificationCenter.js
//	Evadne Wu at Iridia Productions
//	Version as of Mar. 15, 2010

if (jQuery === undefined) return;
if (mono === undefined) return;

mono.notificationCenter = {

	_notificationListeners: {
	
	//	notificationKey: [listenerReference, listenerReference, listenerReference, …];
	
	},

	registerForNotificationWithKeyAndListener: function (aKey, aListenerReference) {

		if (aKey === undefined)
		return mono.error("Call to mono.notificationCenter.registerForNotificationWithKeyAndListener lacks a key.");

		if (aListenerReference === undefined)
		aListenerReference = arguments.callee;
		
		var listenerArray = mono.notificationCenter['_notificationListeners'][aKey];
	
		if (typeof listenerArray != 'array')
		listenerArray = [];
	
		if ($.inArray(aListenerReference, listenerArray) != -1) {
		
			mono.info("listener reference " + aListenerReference + " for key " + aKey + " is already registered.  Skipping.");
			
			return true;
		
		}
		
		mono.notificationCenter._notificationListeners[aKey].push(aListenerReference);
		
		return true;
	
	},
	
	retireFromNotificationWithKeyAndListener: function(aKey, aListenerReference) {
	
		if (aKey === undefined) {
		
			mono.error("Call to mono.notificationCenter.retireFromNotificationWithKeyAndListener lacks a key.");
			
			return false;
			
		}
		
		if (aListenerReference === undefined)
		aListenerReference = arguments.callee;
		
		var listenerArray = mono.notificationCenter['_notificationListeners'][aKey];
		
		if (typeof listenerArray != 'array') {
		
			mono.info("Key ", aKey, " does not even have any listeners");
			return true;
		
		}
		
	},
	
	dispatchNotificationWithKeyAndPredicate: function(aKey, aPredicate) {
	
	//	Asynchronous notification?
		
		if (typeof arguments[2] == 'object')
		if (arguments[2]['asynchronously'] === true)
		return window.setTimeout(mono.notificationCenter.dispatchNotificationWithKeyAndPredicate(aKey, aPredicate), 0);
		
	
	
	
	
	//	Listener array reference.
	
		var listenerArray = mono.notificationCenter['_notificationListeners'][aKey];
		
		
		
		
			
	//	Any listeners?	
	
		if (listenerArray === undefined || listenerArray.length == 0) {
		
			mono.info("Key ", aKey, " does not have any registered listener so actually no notification would be sent.");
			
			return true;
		
		}
	
	
	
	
	
	//	Go!
	
		$.each(listenerArray, function(notificationListenerIndex, plausibleNotificationListener) {
			
			if (plausibleNotificationListener !== undefined) {
			
				plausibleNotificationListener(aPredicate);
			
			} else {
			
				mono.info(
				
					"Listener ", plausibleNotificationListener, 
					"for key ", aKey, " is undefined."
				
				);
				
				return false;
			
			}
			
		});
		
		return true;
		
	}

};