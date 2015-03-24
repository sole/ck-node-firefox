var path = require('path');

var Promise = require('es6-promise').Promise;
var findDevices = require('node-firefox-find-devices');
var forwardPorts = require('node-firefox-forward-ports');
var connect = require('node-firefox-connect');
var launchApp = require('node-firefox-launch-app');
var pushApp = require('push-app');

var appPath = path.join(__dirname, '..', 'node_modules', 'sample-packaged-app');

findDevices().then(forwardPorts).then(function(devices) {
	return Promise.all(devices.map(function(device) {
		return connectDevice(device)
			.then(pushTheApp)
			.then(launchTheApp);
	})).then(quit);
})
.catch(function(err) {
	console.error(err);
});

function connectDevice(device) {
	return connect(device.ports[0].port);
}

function pushTheApp(client) {
	return pushApp(client, appPath);
}

function launchTheApp(res) {
	return launchApp({
		manifestURL: res.app.manifestURL,
		client: res.client
	});
}

function quit() {
	console.log('ok bye');
	process.exit(0);
}
