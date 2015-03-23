var findSimulators = require('node-firefox-find-simulators');
var startSimulator = require('node-firefox-start-simulator');

findSimulators().then(function(simulators) {
	if(simulators.length === 0) {
		console.log('No simulators found');
	} else {
		var firstSimulator = simulators[0];
		console.log('Launching simulator at version', firstSimulator.version);
		startSimulator(firstSimulator).then(function(res) {
			console.log(res);
		}, function(err) {
			console.log(err);
		});
	}
}).catch(function(e) {
	console.log(e);
});
