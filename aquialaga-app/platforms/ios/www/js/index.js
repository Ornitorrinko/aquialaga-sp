var app = {
    myPosition: {},
    myAddress: '',
    isGoingToRain: '',
    rain: [0,1,2,3,4,8,9,10,11,12,18,23,35,37,38,39,40,45,46,47],
    host: 'http://aqui-alaga-sp.ornitorrinko.com/',
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
        if (app.isPhoneGap()) {
            navigator.geolocation.watchPosition(
                  app.onGetPositionSuccess
                , app.onGetPossitionError
                , options
            );
        }else if ( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition( app.onGetPositionSuccess, app.onGetPossitionError );
        }
    },
    onGetPositionSuccess: function(position){
            app.myPosition = position;
            app.main.bindEvents();
    },
    defaultMap: function(){
        errorFlag = app.errorFlag;
        alertify('Oops, ocrreu um erro', JSON.stringify(errorFlag), 'bottom');
         if (errorFlag) {
            var content = 'Erro: O serviço de geolocalização falhou.';
          } else {
            var content = 'Erro: Seu navegador não suporta geolocalização.';
          }

        var map = new google.maps.Map(document.getElementById('map_canvas'), app.map.mapOptions);
        var options = {
            map: map,
            position: new google.maps.LatLng(-23.546707899999998,-46.6327437),
            content: content
        };

        map.setCenter(options.position);
    },
    onGetPossitionError: function(errorFlag){
        app.errorFlag = errorFlag;
        app.map.loadScript('app.defaultMap');
    },
    isPhoneGap: function() {
        return  /^file:\/{3}[^\/]/i.test(window.location.href) 
        && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
    }
};