var models = require('../models')
	, rangeToFindOcorrenciasKm = 1
	, rangeToFindOcorrenciasDegree = rangeToFindOcorrenciasKm/111
	, Q = require('q')
    , CETOcorrencia = models.CETOcorrencia
	, UsuarioOcorrencia = models.usuarioOcorrencia
	, _sql =  '  select sum(qtdCET) qtdCET, sum(qtdUSER) qtdUsuario,latitude, longitude'
			+ '  from('
			+ '  select sum(quantidade) qtdCET, 0 qtdUSER,latitude, longitude'
			+ '   from CETOcorrencia'
			+ ' where (latitude between :latMin and :latMax)'
 			+ ' and (longitude between :lngMin and :lngMax)'
			+ ' group by latitude, longitude'
			+ ' union'
			+ ' select 0, count(1), latitude, longitude'
			+ '  from usuarioOcorrencia'
		 	+ ' where (latitude  between :latMin and :latMax)'
 		 	+ ' and (longitude between :lngMin and :lngMax)'
			+ ' group by latitude, longitude ) tb'
			+ ' group by latitude, longitude'
			;

function ocorrencias(){
	return{
		findByGeolocation: function(latitude, longitude, callback){
			
			 require('../repositorios').createConnectionEx(function(_connection){
				latitude = parseFloat(latitude)
				longitude = parseFloat(longitude)

				var   where = { latMin : latitude - rangeToFindOcorrenciasDegree, latMax : latitude + rangeToFindOcorrenciasDegree
				              , lngMin : longitude - rangeToFindOcorrenciasDegree , lngMax :longitude + rangeToFindOcorrenciasDegree 
				              }
			    _connection.query( _sql, where , function(err, rows){
			    	_connection.release();
			    	callback(err, rows)
			    })
			 })
		}
		, salvar: function(ocorrencia, callback){
			ocorrencia
				.save()
				.success(function(novaOcorrencia){
					callback(null, novaOcorrencia);
				})
				.error(function(error){
					callback({error: error.code}, null);
				});
		}
	}
};

module.exports = ocorrencias;