var gm = require('googlemaps');

var Maps = function(){

	this.byAddress = function(fullAddress, callback){
		var geo = {};

		gm.geocode(fullAdress, function(err2, data){
			try{
				geo.lat = data.results[0].geometry.location.lat;
				geo.lng = data.results[0].geometry.location.lng;
			  	callback(null, geo);
			}catch(e){
				geo.errors = ['Endereço informado invalido'];
				callback(geo, null);
			}
		});
	};

	this.byGeolocation = function(latitude, longitude, callback){
		var latlng = new google.maps.LatLng(latitude, longitude);
		
		geo.geocode({'latlng': latlng}, function(results, status){

		});
	};

	this.range = function(fullAddress, callback){
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
	};
};

module.exports = Maps;