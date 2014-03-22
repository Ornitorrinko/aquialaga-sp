var app = {
    position: {},
    // Application Constructor
    initialize: function() {
        alert('init');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        alert('bind')
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert('ready');
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        alert('received '+id);
        navigator.geolocation.getCurrentPosition(function(position){
            alert('onSuccess ' + JSON.stringify(position));
            app.position = position;
            app.map.initialize();
        }, function(error){
            alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
        });
    }
};