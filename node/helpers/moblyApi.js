var helper = require('./index')
var urlBase =  helper.config.apiUrl
var validarModel = helper.validarModel
var chamadoModel = require('../db/chamado')
var emailError = '*email*error'

var moblyApi = function ( ) {
	
	return {
		motoboy : function ( )  {
		 	return new require('../api/apiMotoboy').api()
		 },
		 
		usuario : function ( )  {
		 	return new require('../api/apiUsuario').api()
		},

		chamado : function ( chamadoModel ) {
		 	return new require('../api/apiChamado').api( chamadoModel )
		 },
		corrida : function (  ) {
		 	return new require('../api/apiCorrida').api( )
		 }		 
	}
}

module.exports = moblyApi
