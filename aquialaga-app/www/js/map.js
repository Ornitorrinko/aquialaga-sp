var map;
var app = app ? app : {};
app.map = {
	loadScript: function(){
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWlSgCtcNCTcjr2TS8ZUcjxlRCXpxsyME&v=3.exp&sensor=true&' +
		  'callback=app.map.initialize';
		document.body.appendChild(script);
	},
	initialize: function(){
		var mapOptions = {
			zoom: 17,
			disableDefaultUI: true
		};
		map = new google.maps.Map(document.getElementById('map_canvas'),
			mapOptions);

		// Try HTML5 geolocation
		if(navigator.geolocation) {
				var pos = new google.maps.LatLng(app.position.coords.latitude,
					app.position.coords.longitude);
				
				var image = new google.maps.MarkerImage(
						'img/bluedot_retina.png',
					null, // size
					null, // origin
					new google.maps.Point( 8, 8 ), // anchor (move to center of marker)
					new google.maps.Size( 17, 17 ) // scaled size (required for Retina display icon)
				);
				// then create the new marker
				myMarker = new google.maps.Marker({
					flat: true,
					icon: image,
					map: map,
					optimized: false,
					position: pos,
					title: 'I might be here',
					visible: true
				});

				map.setCenter(pos);
		} else {
			// Browser doesn't support Geolocation
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
