var gm = require('googlemaps');

function maps(){
	return{
		byAddress: function(fullAddress, callback){
			var geo = {};

			gm.geocode(fullAdress, function(err, data){
				try{
					geo.lat = data.results[0].geometry.location.lat;
					geo.lng = data.results[0].geometry.location.lng;
				  	callback(null, geo);
				}catch(e){
					geo.errors = ['Endereço informado invalido'];
					callback(geo, null);
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

		, range: function(fullAddress, callback){
			var self = this
				_ = require('underscore')
			    , rangeToFindUnidadesKm = 10
			    , rangeToFindUnidadesDegree = rangeToFindUnidadesKm/111;

			self.byAddress(fullAddress, function(err, geoData){
				var query = {
		            lat: {
		                gte: geoData.lat - rangeToFindUnidadesDegree
		              , lt:geoData.lat + rangeToFindUnidadesDegree
		            },
		            lng:{
		              gte: geolocation.lng - rangeToFindUnidadesDegree
		              , lt:geolocation.lng + rangeToFindUnidadesDegree
		            }
		        };

		        callback(null, query);
			});
		}
	}
};

module.exports = maps;