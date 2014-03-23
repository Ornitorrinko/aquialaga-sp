var util = require('util')

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};

String.prototype.onlyNumber = function () {
    var str = this;
    var newStr = ''
    
    for( var i = 0;i < str.length; i++)
    	if (  str[i] == '0' || str[i] == '1' || str[i] == '2'
    		|| str[i] == '3' || str[i] == '4' || str[i] == '5'
    		|| str[i] == '6' || str[i] == '7' || str[i] == '8'
    		|| str[i] == '9' || str[i] == ',' || str[i] == '.')
    	newStr += str[i]
    
    return newStr
};

String.prototype.fillWithZero = function (qty) {
    var str = this;
    while (str.length < qty)
      str = '0' + str;
    return str;
};

Array.prototype.contains = function(item) {
  	var i = this.length;

	while (i--) {
		if (this[i] === item) {
		  return true;
		}
	}

  	return false;
};

function format(string, object) {
	return string.replace(/{([^{}]*)}/g, function(match, group_match) {
		
		var data = object[group_match];
		
		try {
			return typeof data === 'string' ? data : ( typeof data === "undefined" ? data : data.toString() );
		} catch ( ex ) {
			console.trace 	( "ex => " , ex.toString()
								, "string => ", string 
								, "object => " , object 
								)
		}

	});
}
String.prototype.format = function() {
   return format ( this, arguments )
}


String.prototype.format_cPlusPlus = function(){
  var args = Array.prototype.slice.call(arguments);
  args.unshift(this.valueOf());
  return util.format.apply(util, args);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////

Number.prototype.fillWithZero = function (qty) {
    return this.toString().fillWithZero(qty)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
var http = require('http');

http.ServerResponse.prototype.sendWithCodeAndJson = function ( code, json ) {

	this.writeHead(code, { 'Content-Type': 'application/json' })
	if (json) {
		
		if (code != 200 && (typeof json == "string" || (typeof json == "object" && json.constructor === String))) {
			json = { message : json }
		}
		
		this.write(JSON.stringify(json))
			
	}
	
	this.end()
}

http.ServerResponse.prototype.sendWithCodeAndXml = function ( code, xml ) {
	this.writeHead( code )
	this.write( xml )
	this.end()
}


http.ServerResponse.prototype.sendWithCodeAndText = function ( code, text ) {
	this.writeHead(code);
	this.write(text);
	this.end();			
}
