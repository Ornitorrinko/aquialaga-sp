var app = {
    position: {},
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        navigator.geolocation.getCurrentPosition(function(position){
            app.position = position;
            app.map.loadScript();
        }, app.onGetPossitionError);
    },
    onGetPossitionError: function(error){
        navigator.geolocation.getCurrentPosition(function(position) {
            app.position = position;
            app.map.loadScript();
        });
    },
    isPhoneGap: function() {
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
    }
};