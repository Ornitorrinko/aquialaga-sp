var _xml2js = require('xml2js')
var _options = { mergeAttrs: true, explicitArray: false }


module.exports = { 
	toObjectJS : function ( xml , callBack ) {
		var parser = new _xml2js.Parser( _options )
		parser.parseString( xml, function ( error, object ) {
			if ( error )
				console.trace ( 'trace#3:' , error )

			 callBack( error , object )
		})
	}
}
