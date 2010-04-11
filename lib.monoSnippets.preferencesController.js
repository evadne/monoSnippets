//	lib.monoSnippets.preferencesController.js
//	Evadne Wu at Iridia Productions

mono.preferencesController = function (aPreferencesDictionary) {

	var _holder = aPreferencesDictionary || {};
	
	return function (aKey, aPlausibleValue) {
	
		if (!aKey)
		return undefined;
		
		if (!aPlausibleValue)
		return undefined || _holder[aKey];
		
		_holder[aKey] = aPlausibleValue;
		return _holder[aKey];
	
	}

}