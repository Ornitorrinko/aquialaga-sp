var Maps = function(){

	this.byAddress = function(fullAddress, callback){
		var gm = require('googlemaps')
			, geo = {};

		gm.geocode(fullAdress, function(err2, data){
			try{
				geo.latitude = data.results[0].geometry.location.lat;
				geo.longitude = data.results[0].geometry.location.lng;
			  	callback(null, geo);
			}catch(e){
				geo.errors = ['Endereço informado invalido'];
				callback(geo, null);
			};
		};
	};
};

module.exports = Maps;