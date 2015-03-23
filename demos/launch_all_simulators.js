var findSimulators = require('node-firefox-find-simulators');
var startSimulator = require('node-firefox-start-simulator');

findSimulators().then(function(simulators) {
	if(simulators.length === 0) {
		console.log('No simulators found');
	} else {
		simulators.forEach(startSimulator);
	}
}).catch(function(e) {
	console.log(e);
});

