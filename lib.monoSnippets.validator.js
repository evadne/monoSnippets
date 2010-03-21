//	lib.monoSnippets.validator.js
//	Evadne Wu at Iridia Productions
//	Version as of Mar. 21, 2010

if (jQuery === undefined) return;
if (mono === undefined) return;

mono.validate = function (stringToBeValidated, proposedCategory) {

	var schemata = {
	
		'email': new RegExp(/[a-z0-9!#$%&'*+//=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+//=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}||com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/),
		
		'uri': new RegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/),
		
		'ipv6': new RegExp(/^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/)
	
	}

	
	
	
		
//	We can leniently call mono.validate against nothing; that way everything that is not required to be validated is valid

	if (stringToBeValidated == '' || proposedCategory == '') return true;		

	var options = $.extend({
	
		'caseSensitive': false
	
	}, arguments[2]);

	
	
	if (!options.caseSensitive) stringToBeValidated = String(stringToBeValidated).toLowerCase();
	
	if (schemata[String(proposedCategory)] == undefined) return false;
	
	return (String(stringToBeValidated).match(schemata[String(proposedCategory)]) != null);

};