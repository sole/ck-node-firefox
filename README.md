# <tt>node-firefox</tt> Content Kit

> Current as of 2015-03-xx

## Introduction

* <tt>node-firefox</tt> is a series of node.js modules for interacting with Firefox runtimes via the Developer Tools remote debugging protocol
* It is available as separate modules in npm and in their respective repositories. 
* Started out as [node-fxos](https://github.com/nicola/node-fxos), a prototype developed by Nicola Greco when he was interning at Mozilla in Summer 2014
* First public iteration as `node-firefox` presented at FOSDEM, February 2015, by Soledad Penadés who mentored Nicola, and then took over the project once he finished his internship

## Key Points

1. By providing separate modules we're empowering advanced developers to augment their code with the ability to connect directly to Firefox runtimes and perform actions on them.

2. Similar to what [WebIDE](https://developer.mozilla.org/docs/Tools/WebIDE) does, but modularised and programmatic, so things like pushing an app to various runtimes without user interaction are possible.

3. Most modules are already compatible with Linux, Mac OS, and Windows

## Reference Materials

`node-firefox`:

* Project page with links to modules: https://github.com/mozilla/node-firefox
* Issue tracker: https://github.com/mozilla/node-firefox/issues
* Mozilla Hacks blog post: https://hacks.mozilla.org/2015/02/introducing-node-firefox/
* FOSDEM presentation: http://soledadpenades.com/2015/03/17/superturbocharging-firefox-os-app-development-with-node-firefox/

Developer Tools:

* Remote debugging protocol: https://developer.mozilla.org/docs/Tools/Remote_Debugging
* Docs: https://developer.mozilla.org/docs/Tools
* Wiki: https://wiki.mozilla.org/DevTools
* Feedback: https://ffdevtools.uservoice.com/ or http://mzl.la/devtools

Web IDE:

* MDN: https://developer.mozilla.org/docs/Tools/WebIDE


## Presentation Setup and Materials

For __any presentation__:

- [ ] node 0.10 installed on the host computer
- [ ] each module to demo installed on the directory of the demo

If demoing on __simulator__:

- [ ] at least one 1.2+ simulator installed

If demoing on __actual hardware__ (Firefox OS devices):

- [ ] Strategy for projecting your device's screen (USB webcam, document camera, etc.)
- [ ] Correct USB cable for the device
- [ ] Remote debugging enabled
    - Firefox OS 2.3: Settings â†’ Developer â†’ Developer Tools â†’ Debugging via USB: ADB and DevTools
- [ ] ADB installed and working. Running `adb devices` on a console when a phone is plugged in should result in the device being listed. If using Mac and Homebrew, you can install ADB with `brew install android-tools-adb`.

## Demoing: Things that are Broken

### CSS reload on 2.1 and 2.2 simulators doesn't work

[A bug](https://github.com/mozilla/node-firefox-reload-css/issues/1) is already filed.

### If demoing in a phone, you might want to disable the lock screen and ensure the screen is on

Otherwise the phone will ask for permission each time you establish an incoming connection. You can't see the pop up if the screen is locked or turned off, so the module will just seem "stuck", but it's waiting for a user action.

You can use this script to *developerify* your phone and put it in developer mode: https://github.com/sole/firefox-os-developerify

### Node v0.12 / io.js v1.51 both cause a `Segmentation fault 11`

Both node v0.12 and io.js v1.51 seem to cause segmentation faults in the code that interacts with devices. You should use node v0.10.

## Demoing: The Good Parts

Once your environment is set up for demoing, it tends to be really stable! Crashes are rare, and the demos are very simple in that they tend to be just scripts that you invoke from the command line and something happens automatically.

### Introduction / Setup

Clone one of the modules you would like to demo (git clone ...). Then cd to the directory of the newly cloned repository and run 

```bash
npm install
```

Each module comes with one or more working examples, in the `examples` folder per repo. Change to the folder and pick the script you'd like to execute. Generally it's just a matter of running it with node. Suppose there is an `usage.js` script we want to run, you'd execute it with the following:

```bash
node usage.js
```

## Frequently Asked Questions (FAQs)

### What about functionality X? I want a module that does Y

New modules are discussed in the issues list under the [new-module](https://github.com/mozilla/node-firefox/labels/new-module) label.

If you find there's something you'd like to do but is not listed there, you should file a bug.

### What about debugging?

You should use WebIDE to connect to the runtime you want to debug. There is no module for debugging, and no plans to support that--the DevTools debugger is infinitely better. You should be able to start a simulator from the command line *and* connecting to it via WebIDE--access is not exclusive to the way that started it.
