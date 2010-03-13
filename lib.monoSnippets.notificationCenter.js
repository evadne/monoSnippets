//	lib.monoSnippets.notificationCenter.js
//	Evadne Wu at Iridia Productions
//	Version as of Mar. 13, 2010


if (jQuery === undefined) return;
if (mono === undefined) return;

mono.notificationCenter = {

		_notificationListeners: {},

		registerForNotificationWithKeyAndListener: function (aKey, aListenerReference) {
		
			if (mono.notificationCenter['_notificationListeners'][aKey] != undefined)
			return mono.info("listener reference " + aListenerReference + " for key " + aKey + " is already defined, skipping");

			mono.notificationCenter._notificationListeners[aKey] = aListenerReference;
		
		},
		
		dispatchNotificationWithKeyAndPredicate: function(aKey, aPredicate) {
			
			$.each(mono.notificationCenter._notificationListeners, function(notificationListenerIndex, plausibleNotificationListener) {
				
				if (plausibleNotificationListener !== undefined) {
				
					plausibleNotificationListener(aPredicate);
					return;
				
				}
				
				mono.info("Listener " + plausibleNotificationListener + " is undefined, skipping and removing it from notification named " + aKey +  ".");
	
				delete mono.notificationCenter._notificationListeners[notificationListenerIndex];
				
				return;
				
			});
			
		}

};