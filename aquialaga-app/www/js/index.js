var app = {
    myPosition: {},
    host: 'http://179.184.209.215:3001/',
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
            console.log('watch');
            navigator.geolocation.watchPosition(
                  app.onGetPositionSuccess
                , app.onGetPossitionError
                , options
            );
        } else if ( navigator.geolocation ) {
            console.log('getPos');
            navigator.geolocation.getCurrentPosition( app.onGetPositionSuccess, app.onGetPossitionError );
        }
    },
    onGetPositionSuccess: function(position){
            console.log('agora foi');
            app.myPosition = position;
            app.main.bindEvents();
    },
    onGetPossitionError: function(errorFlag, a, b){
         console.log('falhou '+ JSON.stringify(errorFlag));
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