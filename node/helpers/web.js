exports.requestUrlReturnAsJSON = requestUrlReturnAsJSON
exports.requestUrlReturn = requestUrlReturn
exports.requestUrlPostReturn = requestUrlPostReturn

function requestUrlReturnAsJSON( url , func ) {

	require('http').get(url, function(res) {
		var code = res.statusCode;
		var pageData = "";
		var errorMsg = null;
		
		res.on('end', function() {
			if (code != 200){
				func( code, errorMsg || pageData );
				return;
			}
			var xmlHelper = require('./index').xml
			xmlHelper.toObjectJS(pageData, function ( err, result ) {
				if ( err ) {
				 	func( 200, pageData )
				} else {
				   func( 200, result )
				}
			})
		})

		res.on('data', function(chunk) {
			pageData += chunk;
		}).on('error', function(e) {
			errorMsg = e.toString();
		});

	});
}

function requestUrlPostReturn( url , dataPost, timeout, callBack ) {
	
	var options = 	{ method: 'POST'
						, body : dataPost
						, dataType : "form-url-encoded" 
						}
						
	if ( timeout )
		options.timeout = timeout

	var requestify = require('requestify')
	requestify.request( url, options ).then( callBack )
		
}

function requestUrlReturn( url , func ) {

	require('http').get(url, function(res) {
		var code = res.statusCode;
		var pageData = "";
		var errorMsg = null;
		
		res.on('end', function() {
			if (code != 200){
				func( code, errorMsg || pageData );
				return;
			}
			
			func( 200, pageData );
		});

		res.on('data', function(chunk) {
			pageData += chunk;
		}).on('error', function(e) {
			errorMsg = e.toString();
		});

	});
}
