exports.easyGet = easyGet;
exports.easySave = easyGet;
exports.validarModel = validarModel;

function easyGet( modelsGetter, callSuccess, callBackError ) {
	
	var sequelize = require('sequelize')
	query = new sequelize.Utils.QueryChainer()
	
	modelsGetter.forEach( function ( item ) {
		query.add( item )
	});
	
	query.run().error( function (msg) { 
		console.trace('error => ', msg )
		if (callBackError)
			callBackError ( { message : 'Problema na busca'} )
		else
			callSuccess ( false,  { message : 'Problema na busca'} )
			
	} ).success( function ( results ) {
		if ( !callBackError )
			callSuccess ( true, results )
		else 
			callSuccess ( results )
	} );
}

function validarModel  ( model , campos ) {
		var gerouErro = false
		var msg = { messages : "" }

		for ( var i = 0; i < campos.length; i++) {
			var fieldName = campos[i]
			var value = model[fieldName[0]]
			
			if ( value == null ) {
				gerouErro = true
				msg.messages += "É obrigatório informar {0}\n".format( (campos[i])[1] )
			}
		}
		return { erro : gerouErro, msg : msg }
	}
