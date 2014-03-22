var gm = require('googlemaps');

function maps(){
	return{
		byAddress: function(fullAddress, callback){
			var geo = {};

			gm.geocode(fullAddress, function(err, data){
				try{
					geo.lat = data.results[0].geometry.location.lat;
					geo.lng = data.results[0].geometry.location.lng;
				  	callback(null, geo);
				}catch(e){
					callback(true, 'Não encontrei registros com o endereço fornecido');
				}
			});
		}
		, byGeolocation: function(latitude, longitude, callback){

			var lat_lng = [latitude, longitude].map(function(ll){
				return ll.toString();
			});

			gm.reverseGeocode(lat_lng.join(','), function(err, results){
				if(err)
			    	callback({error: 'The search failed due to: ' + err}, null);
			    else
			      	callback(null, results);
			});
		}
	}
};

module.exports = maps;