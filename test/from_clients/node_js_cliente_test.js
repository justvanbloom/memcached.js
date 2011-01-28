/*
* Code base on node-memcache exemple script
*
*	https://github.com/vanillahsu/node-memcache 
*/
var assert = require('assert');
var sys      = require('sys');
var memcache = require('../../../node-memcache/lib/memcache.js');

function microtime(get_as_float) {  
    var now = new Date().getTime() / 1000;  
    var s = parseInt(now);
    return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;  
}

var onConnect = function() {
	
	mcClient.set('test1', 'hello \r\n node-memcache', function(response) {
		mcClient.get('test1', function(data) {
			sys.debug(data);
			mcClient.close();
		});
	});

};

var basicGetSetTest = function() {
	var count = 100;
	
	for (var i=0; i<=count; i++) {
		mcClient.set('test' + i, 'hello \r\n node-memcache' + i, function(response) {
			sys.debug('set response:' +  response);
		}, 3);
		mcClient.get('test' + i, function(data) {
			sys.debug('get data:' +  data);
		});
	}
	
	mcClient.close();
};

var bigGetSetTest = function() {
	var count = 200;
	
	var bigValue = [];
	for (var i=0; i < (1022 * 100); i++){
		bigValue.push("["+i+"]");
	}
	
	value = bigValue.join();
	
	for (var i=0; i<=count; i++) {
		mcClient.set('test' + i, value, function(response) {
			sys.debug('set response:' +  response);
		}, 3);
		mcClient.get('test' + i, function(data) {
			
			if (data == value) 
				sys.debug('get ok!');
			else
				sys.debug('get ERROR!');
		});
	}
	
	mcClient.close();
};


mcClient = new memcache.Client();
mcClient.connect();
mcClient.addHandler(bigGetSetTest);


