var path = require('path')

function getMethodAsAPI( route, method ){
	return function( req, res ) {
		method( req , function( value ){
			for (var i = value.length - 1; i >= 0; i--) {
				var val = value[i]
			};
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "X-Requested-With");
			res.json(value)
		})

	}
}
var config = require('../helpers').config

exports.createRoutes = function ( app , prefix ) {
	prefix = (prefix || '').trim()

	var apis = config.apiNames
	for (var i = apis.length - 1; i >= 0; i--) {
		
		var apiFileName = path.join(__dirname, apis[i] );
		var apiModule = require( apiFileName )
		var apiRoutes = apiModule.apiRoutes
		if (apiRoutes && Array.isArray( apiRoutes) )
			for (var j = apiRoutes.length - 1; j >= 0; j--) {
				var api = apiRoutes[j]
				var route = prefix + api.route
				console.log(api)
				app[api.httpMethod || 'get' ]( route, getMethodAsAPI( route, api.func ) )
			};

	}
}
