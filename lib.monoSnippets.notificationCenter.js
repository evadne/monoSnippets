//	lib.monoSnippets.notificationCenter.js
//	Evadne Wu at Iridia Productions
//	Version as of Mar. 15, 2010

if (jQuery === undefined) return;
if (mono === undefined) return;

mono.notificationCenter = {

	_notificationListeners: {},

	registerForNotificationWithKeyAndListener: function (aKey, aListenerReference) {
	
		if (mono.notificationCenter['_notificationListeners'][aKey] != undefined) {
		
			mono.info("listener reference " + aListenerReference + " for key " + aKey + " is already defined, skipping");
		
			return false;
		
		}

		mono.notificationCenter._notificationListeners[aKey] = aListenerReference;
		
		return true;
	
	},
	
	dispatchNotificationWithKeyAndPredicate: function(aKey, aPredicate) {
		
		if (typeof arguments[2] == 'object')
		if (arguments[2]['asynchronously'] === true)
		return window.setTimeout(mono.notificationCenter.dispatchNotificationWithKeyAndPredicate(aKey, aPredicate), 0);
		
		$.each(mono.notificationCenter._notificationListeners, function(notificationListenerIndex, plausibleNotificationListener) {
			
			if (plausibleNotificationListener !== undefined) {
			
				plausibleNotificationListener(aPredicate);
			
			}
			
			mono.info("Listener " + plausibleNotificationListener + " is undefined, skipping and removing it from notification named " + aKey +  ".");

			delete mono.notificationCenter._notificationListeners[notificationListenerIndex];
			
			return;
			
		});
		
	}

};