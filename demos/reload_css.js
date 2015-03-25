var path = require('path');
var Promise = require('es6-promise').Promise;
var findSimulators = require('node-firefox-find-simulators');
var startSimulator = require('node-firefox-start-simulator');
var connect = require('node-firefox-connect');
var launchApp = require('node-firefox-launch-app');
var pushApp = require('push-app');

var appPath = path.join(__dirname, '..', 'node_modules', 'sample-packaged-app');

findSimulators()
	.then(startAndConnect)
	.then(holdOnASecond)
	.then(pushTheApp)
	.then(holdOnASecond)
	.then(launchTheApp)
	.then(watchForChanges)
	.catch(function(horror) {
		console.error(horror);
	});

function startAndConnect(simulator) {
	return startSimulator()
		.then(function(simulator) {
			return connect(simulator.port);
		});
}

function holdOnASecond(v) {
	return new Promise(function(resolve) {
		setTimeout(function() {
			resolve(v);
		}, 1000);
	});
}

function pushTheApp(client) {
	return pushApp(client, appPath);
}

function launchTheApp(res) {
	console.log('launch', res);
	return launchApp({
		manifestURL: res.app.manifestURL,
		client: res.client
	});
}

function watchForChanges(res) {
	console.log(res);
	console.log('watch');
}

