var path = require('path');
var Promise = require('es6-promise').Promise;
var findSimulators = require('node-firefox-find-simulators');
var startSimulator = require('node-firefox-start-simulator');
var connect = require('node-firefox-connect');
var launchApp = require('node-firefox-launch-app');
var reloadCSS = require('node-firefox-reload-css');
var chokidar = require('chokidar');
var pushApp = require('push-app');

var appPath = path.join(__dirname, '..', 'node_modules', 'sample-packaged-app');
var cssDir = 'css';

// TODO: err... this should be ran per simulator!
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
	return launchApp({
		manifestURL: res.app.manifestURL,
		client: res.client
	}).then(function() {
		return Promise.resolve(res);
	});
}

function watchForChanges(res) {
	console.log('watch');

	var client = res.client;
	var app = res.app;
	var appCSSPath = path.join(appPath, cssDir);

	var watcher = chokidar.watch(appCSSPath, { persistent: true });

	watcher.on('change', function(p) {
		console.log('changed', p);
		reloadCSS({
			client: client,
			app: app,
			srcPath: appPath
		});
	});

}

