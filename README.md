# <tt>node-firefox</tt> Content Kit

> Current as of April 2015

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
    - Firefox OS 2.2: Settings - Developer - Developer Tools - Debugging via USB: ADB and DevTools
- [ ] ADB installed and working. Running `adb devices` on a console when a phone is plugged in should result in the device being listed. If using Mac and Homebrew, you can install ADB with `brew install android-tools-adb`.

## Demoing: Things that are Broken

### CSS reload on the 3.0 simulator crashes it

[A bug for 3.0](https://github.com/mozilla/node-firefox-reload-css/issues/5) is already filed.

### If demoing in a phone, you might want to disable the lock screen and ensure the screen is on

Otherwise the phone will ask for permission each time you establish an incoming connection. You can't see the pop up if the screen is locked or turned off, so the module will just seem "stuck", but it's waiting for a user action.

You can use this script to *developerify* your phone and put it in developer mode: https://github.com/sole/firefox-os-developerify

### Node v0.12 / io.js v1.51 both cause a `Segmentation fault 11`

Both node v0.12 and io.js v1.51 seem to cause segmentation faults in the code that interacts with devices. You should use node v0.10.

## Demoing: The Good Parts

Once your environment is set up for demoing, it tends to be really stable! Crashes are rare, and the demos are very simple in that they tend to be just scripts that you invoke from the command line and something happens automatically.

### Introduction / Setup

This content kit comes with *batteries included* and so it has a bunch of examples that demonstrate both the functionalities and how to get the modules working together. You don't need to clone anything else to demo, just run `npm install` after cloning this repository, and go to the `demos` folder to get started.

#### Launching one simulator

It will just open the first simulator in your system.

You can close it by pressing Control+C in your terminal, or by closing the simulator window itself.

```bash
node launch_one_simulator.js
```

#### Launching all simulators in your system

This is a pretty impressive programmatic demo that will start all simulators from the command line.

Then, you can close all of them by either closing their individual windows, or by pressing Control+C in the terminal, which is *way more cool*!

```bash
node launch_all_simulators.js
```

#### Pushing to and launching an app in all connected devices

Connect as many phones as you can to your computer (using a USB hub is great for this demo so you can increase the number of ports in your system) and then run the following:

```bash
node push_and_launch_to_all_devices.js
```

A sample app will be installed to and then launched in all the devices.

#### Reloading CSS in a simulator

While we can programmatically push packaged apps to Firefox OS targets, this is not ideal when you're developing the UI of an application. Oftentimes you might want to experiment with different CSS values and see how they look like in the current context of the app.

Thankfully, the stylesheets of a Firefox runtime can be live reloaded, without having to push and restart the app. You can do that interactively using the Style inspector in Firefox Devtools, or using the reload-css module in node-firefox. To demonstrate the latter, run the following:

```bash
node reload_css.js
```

All the simulators in your system will be launched and a sample app will be pushed and launched. You will probably need to arrange the simulators so you can see them all at the same time (apparently their window is always positioned in the same spot when launching).

Once all the windows are in place and the app launched, you can open the style sheet file for the sample app that was installed and launched in the simulators, edit and save it, and see the changes happen instantly in the simulators. For example, try changing the `<main>` element background colour to `#fff`. 

Except there is a bug 3.0 simulators and they will crash as soon as you try to reload css on them. For more info and tracking the bugs, refer to the section 'Demoing: things that are broken'. Uninstalling the 3.0 simulator prior to this demo is also recommended as it seems very unstable right now anyway.

Sorry about that :-(

### Demoing `node-firefox` individual modules

Alternatively you might want to focus on an specific `node-firefox` module, perhaps if you are interested in highlighting a particular area.

Each module comes with one or more working examples, in the `examples` folder. Before running any example, you need to make sure all dependencies have been installed. The general process is:

1. Clone the module
2. `cd` to the module folder
3. Install dependencies: run `npm install`, wait for it to do its magic.
4. Run demos! `cd examples`, then suppose there is an `usage.js` script we want to run, you'd execute it with the following: `node usage.js`

## Frequently Asked Questions (FAQs)

### What about functionality X? I want a module that does Y

New modules are discussed in the issues list under the [new-module](https://github.com/mozilla/node-firefox/labels/new-module) label.

If you find there's something you'd like to do but is not listed there, you should file a bug.

### What about debugging?

You should use WebIDE to connect to the runtime you want to debug. There is no module for debugging, and no plans to support that--the DevTools debugger is infinitely better. You should be able to start a simulator from the command line *and* connect to it via WebIDE--access is not exclusive to the way that started it.
