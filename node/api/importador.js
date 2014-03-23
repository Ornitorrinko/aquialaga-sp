

var helpers = require('../helpers')
    , mysql  = require('mysql')
    , models = require('../models')
	, config = helpers.config
	, CETOcorrencia = models.CETOcorrencia
	;

var _sql =' SELECT'
		 +' str_to_date(ocorrencia.CHEGADA, "%d/%m/%Y %H:%i") AS CHEGADA,'
		 +' ocorrencia.LOCALDAOCORRENCIA  LOCALDAOCORRENCIA,'
		 +'    ocorrencia.ALTURANUMERICA AS ALTURANUMERICA,'
		 +'    cetocorrencia.latitude AS latitude,'
		 +'    cetocorrencia.longitude AS longitude,'
		 +'    count(0) AS quantidade,'
		 +'    ocorrencia.CODIGO AS codigo'
		 +' FROM ocorrencia '
		 +'   left join CETOcorrencia as cetocorrencia on( cetocorrencia.endereco = ocorrencia.LOCALDAOCORRENCIA '
		 +'   	                      and ocorrencia.ALTURANUMERICA = cetocorrencia.numero )'
		 +' where ocorrencia.dataimportacao is null '
		 +'   and ocorrencia.CODIGO = ' + config.parametrosImportacao.codigoAlagamento
		 +' group by ocorrencia.CHEGADA'
		 +'         , ocorrencia.LOCALDAOCORRENCIA'
		 +'         , ocorrencia.ALTURANUMERICA'
		 +'         , cetocorrencia.latitude'
		 +'         , cetocorrencia.longitude'
		 +' limit 1000'
		 ;

	

	var _updCMD = "update ocorrencia set dataImportacao = NOW()\n"
	              +"where dataImportacao is null and LOCALDAOCORRENCIA = :LOCALDAOCORRENCIA\n"
	              +"and (   (:ALTURANUMERICA is null     and ALTURANUMERICA is null)\n"
	              +"	 or (:ALTURANUMERICA is not null and ALTURANUMERICA = :ALTURANUMERICA )\n"
	              +")"
	

	

var _importando = []
var Importador = function (){
	var _connection;
	return {
		 updateOcorrencia : function( item, cb ) {
			if (item.ALTURANUMERICA && typeof item.ALTURANUMERICA != 'string')
				item.ALTURANUMERICA = item.ALTURANUMERICA.toString();
		    

	   		_connection.query( _updCMD, item , function(){
				CETOcorrencia.findOrCreate({ endereco : item.LOCALDAOCORRENCIA
				                          , numero : item.ALTURANUMERICA
				                          , quantidade : item.quantidade
				                          , dataOcorrencia : item.data
				                          , longitude : item.longitude
				                          , latitude : item.latitude
				                          , nivel : config.parametrosImportacao.nivelAlagamentoPadrao
				                          , })
				.error(function(){
					console.log(JSON.stringify(arguments));
					cb()
				}).success( function( row, created ) {
					if (!created) {
						row.updateAttributes( { quantidade : row.quantidade + item.quantidade } )
						.error(function(){
							cb()
						})
						.success(function(){
							cb()
						})
					} else 
						cb()
				})
		    })

		 },
		 importarOcorrencia : function(i, rows, cb ){
		 	var self = this
		 	if (i < rows.length)
		 		self.updateOcorrencia(rows[i], function(){
		 			self.importarOcorrencia( i +1 , rows, cb)	
		 		})
		 	else
		 		cb()

		 }
		 ,importar : function() {
		 	var self = this
			 require('../repositorios').createConnectionEx(function(connection){		
			 	_connection = connection
				if (_importando['importar']) return;
				_importando['importar'] = true;
			    
				_connection.query(_sql, function(err, rows) {
					self.importarOcorrencia( 0, rows, function(){
						_connection.release();
						_importando['importar'] = false;
					})
			    });

			 });
	
		},

		preencherLatLng : function(){
			if (_importando['preencherLatLng']) return;

			_importando['preencherLatLng'] = true;

			var chainer = new (require('Sequelize')).Utils.QueryChainer
			var atualizarCoord;
			
			atualizarCoord = function (i, rows, cb){
				if ( i < rows.length ) {
					var row = rows[i]
					helpers.maps.byAddress( row.getEnderecoFormatado(), function(err, coord){
						if (!err) {
							row.latitude = coord.lat;
							row.longitude = coord.lng;
							chainer.add(row.save())
							atualizarCoord( i + 1, rows , cb )
						}
					});
				} else
					cb()
			}

			CETOcorrencia.findAll( {  where : {latitude : null , longitude : null} 
				                   , limit : 20 
				                   })
			.success(function(rows){
				atualizarCoord( 0 , rows, function(){
					chainer.run()
					.error(function(){
						_importando['preencherLatLng'] = false;
						console.log('error:', JSON.stringify(arguments))
					})
					.success(function(results){
						_importando['preencherLatLng'] = false;
						console.log('foi:',results.length)
					})
				})


				
			})
		}
	}

}	
	
module.exports.api = Importador
module.exports.apiRoutes = function () {
	return []
}()

