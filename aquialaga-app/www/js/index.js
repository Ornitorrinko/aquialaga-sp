var app = {
    position: {},
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var options = { 
            /*enableHighAccuracy: true,
            maximumAge: 30000,*/
            timeout: 270000 
        };

        if (app.isPhoneGap) {
            alert('watch');
            navigator.geolocation.watchPosition(
                  app.onGetPositionSuccess
                , app.onGetPossitionError
                , options
            );
        } else if ( navigator.geolocation ) {
            alert('getPos');
            navigator.geolocation.getCurrentPosition( app.onGetPositionSuccess, app.onGetPossitionError );
        }
    },
    onGetPositionSuccess: function(position){
            alert('agora foi');
            app.position = position;
            app.map.loadScript();
            app.main.bindEvents();
    },
    onGetPossitionError: function(errorFlag, a, b){
         alert('falhou '+ JSON.stringify(errorFlag));
         if (errorFlag) {
            var content = 'Erro: O serviço de geolocalização falhou.';
          } else {
            var content = 'Erro: Seu navegador não suporta geolocalização.';
          }
          var mapOptions = {
            zoom: 17
            };
            
          map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
          var options = {
            map: map,
            position: new google.maps.LatLng(60, 105),
            content: content
          };

          map.setCenter(options.position);
    },
    isPhoneGap: function() {
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
    }
};