var helper = require('../helpers/index')
var usuarioOcorrenciasDb = require('../repositorio/usuarioOcorrencias')

var gm = require('googlemaps');
      gm.geocode(fullAdressString, function(err2, data){
        try{
          self.lat = data.results[0].geometry.location.lat;
          self.lng = data.results[0].geometry.location.lng; 
      }catch(e){
        self.errors = ['Endereço informado invalido'];
      };


var apiOcorrencias = function ( model ) {
	return {
		metodo1 : function( callBack ) {
		},
		metodo2 : function( callBack ) {
		}			
	}
}


module.exports.apiRoutes = function () {
	return [
		{ httpMethod : 'post', route : '/v1/corrida/criar'
		, func : 
			function( req, callback ) {
				var	model = req.body
				model.usuarioId = model.usuarioId || model.usuario

				var api = new apiCorrida()
				api.criar( model, function( error , corridasResponse ) {
					var result = {}
					
					if (error) {
						console.log('***error:',error)
						var response = { result : "0" }
						if (typeof error == "boolean") {
							if (corridasResponse.msg && corridasResponse.msg.messages )
								response.message = corridasResponse.msg.messages;
						} else {

							if (error.msg )
								response.message = error.msg.messages;
						}

						result = response
					} else {
						result =  corridasResponse
					}

					var i = utils.formaters.tryInt(result.id_corrida ? result.id_corrida : 0)
					if (i > 0 ) 
				  		api.corridaStatusPorId ( i , function( corridaDb ){
				  			result.corrida = utils.formaters.corridaSituacao( corridaDb ).corrida
				  			callback (  result )

				  		} )
				  	else
				  		callback( result )
				})
			}
		}, 
				
		{ httpMethod : 'post', route : '/v1/usuario/corrida/aguardando'
		, func : 
		    function( req, callback ) {
		  		var api = new apiCorrida()
		  		api.corridaAguardandoRespostaMotoboy ( req.body.idUser , function( corrida ){
		  			callback ( utils.formaters.corridaSituacao( corrida ) )
		  		} )
		  	}
		}
	]
}()


