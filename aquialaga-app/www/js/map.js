var map, geocoder;
var app = app ? app : {};
app.map = {
	scriptLoaded: false,
	mapOptions: {
		zoom: 17,
		disableDefaultUI: true
	},
	loadScript: function(callback){
		if(app.map.scriptLoaded)
			return;
		app.map.scriptLoaded = true;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWlSgCtcNCTcjr2TS8ZUcjxlRCXpxsyME&v=3.exp&sensor=true&' +
		  'callback='+callback;
		document.body.appendChild(script);
	},
	plotMarker: function(lat, lng, type){
		var imageCET = new google.maps.MarkerImage(
				'img/cone.png',
				null, 
				null, 
				new google.maps.Point( 8, 8 )
//				new google.maps.Size( 20, 34 )
			);
		var imageUser = new google.maps.MarkerImage(
				'img/user_pin.png',
				null, 
				null, 
				new google.maps.Point( 8, 8 )
//				new google.maps.Size( 20, 23 )
			);
		var position = new google.maps.LatLng(lat, lng)
        if(type == 'CET'){
	        var marker = new google.maps.Marker({
	            flat: true,
				icon: imageCET,
				map: map,
				optimized: false,
				title: 'CET',
				visible: true,
	            position: position,
	            map: map,
	            zIndex: 1
	        });
    	}else{
    		var marker = new google.maps.Marker({
	            flat: true,
				icon: imageUser,
				map: map,
				optimized: false,
				title: 'CET',
				visible: true,
	            position: position,
	            map: map,
	            zIndex: 1
	        });
    	}
	},
	plotMarkers: function(){
		for (var i = 0; i < app.main.ocorrencias.length; i++) {
	        app.map.plotMarker(app.main.ocorrencias[i].latitude, app.main.ocorrencias[i].longitude, app.main.ocorrencias[i].qtdCET > 0 ? 'CET' : 'user');
	    }
	},
	plotMyPosition: function(){
		var pos = new google.maps.LatLng(app.myPosition.coords.latitude,
				app.myPosition.coords.longitude);
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({'latLng': pos}, function(results, status) {
		 if (status == google.maps.GeocoderStatus.OK) {
	        if (results[1]) {
	        	app.myAddress = results[0].address_components[1].long_name + ', ' + 
	        					results[0].address_components[0].long_name + ' - ' +
	        					results[0].address_components[2].long_name + ' - ' +
	        					results[0].address_components[3].long_name;

	        	app.main.setEnderecoText();
	        	var image = new google.maps.MarkerImage(
						'img/bluedot_retina.png',
					null, 
					null, 
					new google.maps.Point( 8, 8 ), 
					new google.maps.Size( 17, 17 )
				);
				// then create the new marker
				myMarker = new google.maps.Marker({
					flat: true,
					icon: image,
					map: map,
					optimized: false,
					position: pos,
					title: 'I might be here',
					visible: true,
					zIndex: 2
				});

				map.setCenter(pos);
	        }
	      } else {
	      	alertify('Oops, ocrreu um erro', status, 'bottom');
	    	}
		});
	},
	initialize: function(){
		
		map = new google.maps.Map(document.getElementById('map_canvas'),
			app.map.mapOptions);
	    
	    google.maps.event.addListener(map,'dragend', function(event) {
			var geo = map.getCenter()
			var position = {
				coords:{
					latitude: geo.lat(),
					longitude: geo.lng()
				}
			}
			app.main.getOcorrencias(position);
		});

		if(navigator.geolocation) {
	    	app.map.plotMarkers();
			app.map.plotMyPosition();		
		} else {
			handleNoGeolocation(false);
		}
	},
	handleNoGeolocation: function(errorFlag){
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} else {
			var content = 'Error: Your browser doesn\'t support geolocation.';
		}

		var options = {
			map: map,
			position: new google.maps.LatLng(60, 105),
			content: content
		};

		map.setCenter(options.position);
	}	
};
