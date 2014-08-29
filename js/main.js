// Show loading notice
var canvas = document.getElementById('videoCanvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = '#444';
ctx.fillText('Loading...', canvas.width/2-30, canvas.height/3);

// Setup the WebSocket connection and start the player

require.config({
baseUrl: 'js',
paths: {
    "BrowserBigBangClient": "http://thegigabots.app.bigbang.io/client/js/bbclient.min",
    "BigBangClient": "http://thegigabots.app.bigbang.io/client/js/bbclient.min",
    "PewRuntime": "http://thegigabots.app.bigbang.io/client/js/bbclient.min"
}
});
require(['BrowserBigBangClient', 'PewRuntime'], function (bigbang, pew) {

    client = new bigbang.client.BrowserBigBangClient();
    client.connectAnonymous("thegigabots.app.bigbang.io:80", function(result) {
        if( result.success) {
            client.subscribe("newBot", function( err, c) {
                if(!err) {
                    beginStream(client,c);
                    //console.dir(c);
                }
                else {
                    console.log("Subscribe failure. " + err);
                }
            })
        }
        else {
            console.log("CONNECT FAILURE.");
        }
    });

    function beginStream(client, channel) {

	    //var client = new WebSocket( 'ws://thegigabots.app.bigbang.io:80/' );
		var player = new jsmpeg(client, {canvas:canvas});
		console.dir(player);
	}

});