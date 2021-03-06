//	lib.monoSnippets.notificationCenter.js
//	Evadne Wu at Iridia Productions
//	Version as of Mar. 15, 2010

mono.notificationCenter = {

	_notificationListeners: {
	
	//	notificationKey: [listenerReference, listenerReference, listenerReference, …],
	//	…: […, …]
	
	},










	init: function() {
	
		//	Lazily register all handlers
		
		if (!window.hasOwnProperty('_monoNotificationCenterListeners')) return;

		$.each(window._monoNotificationCenterListeners, function(aNotificationKey, aListenerReference) {
			
			mono.notificationCenter.registerForNotificationWithKeyAndListener(aNotificationKey, aListenerReference);
			
		});
		
		delete _monoNotificationCenterListeners;
		
	},
	
	
	
	
	
	
	
	
	
	
	registerForNotificationWithKeyAndListener: function (aKey, aListenerReference) {

	//	TODO: minion that fetches function identifier

		mono.groupStart("Registering a new notification listener to ", aKey).log(mono.getFunctionName(aListenerReference));

		if (aKey === undefined) {

			mono.error("Call to mono.notificationCenter.registerForNotificationWithKeyAndListener lacks a key.").groupEnd();

			return false;
		
		}
		

		if (aListenerReference === undefined) {
		
			mono.error("The listener reference is undefined!").groupEnd();
			return false;
			
		}
		
		
		if (mono.notificationCenter['_notificationListeners'][aKey] === undefined)
		mono.notificationCenter['_notificationListeners'][aKey] = [];
	
		if ($.inArray(aListenerReference, mono.notificationCenter['_notificationListeners'][aKey]) != -1) {
		
			mono.info("This caller has already registered as a listener reference for key " + aKey + ".  Skipping.").groupEnd();
			
			return true;
		
		}
		
		mono.notificationCenter._notificationListeners[aKey].push(aListenerReference);
		mono.groupEnd();
		
		return true;
	
	},
	
	
	
	
	
	
	
	
	
	
	retireFromNotificationWithKeyAndListener: function(aKey, aListenerReference) {
	
		mono.groupStart("Listener with a reference of ", mono.getFunctionName(aListenerReference), " asks to retire from receiving notifications associated with key ", aKey);
	
		if (aKey === undefined) {
		
			mono.error("Call to mono.notificationCenter.retireFromNotificationWithKeyAndListener lacks a key.").groupEnd();
			
			return false;
			
		}

		if (aListenerReference === undefined) {
		
			mono.error("The listener reference is undefined!").groupEnd();
			return false;
			
		}
		
		
		
		
		
		
		
		
		
		
		if (mono.notificationCenter['_notificationListeners'][aKey] === undefined) {
		
			mono.info("Key ", aKey, " does not even have any listeners").groupEnd();
			return true;
		
		}	
		
		if (mono.notificationCenter['_notificationListeners'][aKey].length == 0) {
		
			mono.info("Key ", aKey, " does not even have any listeners").groupEnd();
			return true;
		
		}
		




		mono.notificationCenter['_notificationListeners'][aKey] = $.grep(mono.notificationCenter['_notificationListeners'][aKey], function(element, index){
		
			return element != aListenerReference;

		});
				
	},
	
	
	
	
	
	
	
	
	
	
	dispatchNotificationWithKeyAndPredicate: function dispatchNotificationWithKeyAndPredicate(aKey, aPredicate) {
		
		
		
		
		
	//	Bonus: Asynchronous notification?
		
		if (typeof arguments[2] == 'object')
		if (arguments[2]['asynchronously'] === true)
		return window.setTimeout(mono.notificationCenter.dispatchNotificationWithKeyAndPredicate(aKey, aPredicate), 0);
		
	
	
	
	
	//	Listener array reference.
	
		var listenerArray = mono.notificationCenter['_notificationListeners'][aKey];
		
		mono.groupStart("Dispatching notification with key ", aKey, " . ").log(aPredicate);
		
		
		
		
			
	//	Any listeners?	
	
		if (listenerArray === undefined || listenerArray.length == 0) {
		
			mono.info("Key ", aKey, " does not have any registered listener so actually no notification would be sent.").groupEnd();
			
			return true;
		
		}
	
	
	
	
	
	//	Go!
	
		$.each(listenerArray, function(
		
			notificationListenerIndex, 
			plausibleNotificationListener
			
			) {
			
			if (plausibleNotificationListener !== undefined) {
			
				plausibleNotificationListener(aPredicate);
			
			} else {
			
				mono.info(
				
					"Listener ", plausibleNotificationListener, 
					"for key ", aKey, " is undefined."
				
				).groupEnd();
			
			}
			
		});
		
		mono.groupEnd();
		
		return true;
		
	}

};





mono.notificationCenter.init();