var map;

app.map = {
	initialize: function(){
		alert(app.position.coords.latitude)
		alert(app.position.coords.longitude)
		var mapOptions = {
			zoom: 17
		};
		map = new google.maps.Map(document.getElementById('map_canvas'),
			mapOptions);

		// Try HTML5 geolocation
		if(navigator.geolocation) {
				var pos = new google.maps.LatLng(app.position.coords.latitude,
					app.position.coords.longitude);

				var infowindow = new google.maps.InfoWindow({
					map: map,
					position: pos,
					content: 'Location found using HTML5.'
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

		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position);
	}	
};
