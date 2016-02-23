---
layout: post
title: Mobile Angular UI Boilerplate setup (from scratch)
---

[http://mobileangularui.com/](Mobile Angular UI) is a great project, combining Cordova and Angular in a hands-on Boilerplate.

Quick notes for  an install from scratch (Ubuntu):

Prerequisites

 * node and npm already installed

1. Install Cordova

```
$ sudo npm install -g cordova.
$ cordova -v
6.0.0
```

2. Install mobile-angular-ui & Yeoman

```
$ sudo npm install -g bower yo gulp generator-mobileangularui
```

3. Create Cordova project

```
$ cordova create <appname>
```

4. Setup Cordova platform support for your App

```
$ cordova platform

Installed platforms:
Available platforms: amazon-fireos, android, blackberry10, browser, firefoxos, ubuntu, webos

$ cordova platform add android
$ cordova platform add browser
```

5. Install platform emulators

* `android`: [Android SDK](http://developer.android.com/sdk/installing/index.html) &raquo; Ubuntu: [HowTo](http://www.unixmen.com/install-android-sdk-ubuntu-14-04/), Which Android version: - [Android version usage stats](http://www.appbrain.com/stats/top-android-sdk-versions)
* `ios`: They are so *special*! You need a Mac. Thus it makes little sense to install the ios platform support in Cordova at all
* `ubuntu`: [Ubuntu phone SDK](http://www.ubuntu.com/phone/developers and https://developer.ubuntu.com/en/start/ubuntu-sdk/installing-the-sdk/)
* `firefoxos`: [Firefox OS Simulator](https://developer.mozilla.org/en/docs/Tools/Firefox_OS_Simulator)

5. Merge Mobile Angular UI project boilerplate

```
cd <appname>
yo mobileangularui
```

6. First build

```
gulp build
```

7. Run

Cross fingers (You have to install some missing dependencies.)

```
$cordova run <platform>
```

## Sources

 * [http://mobileangularui.com/blog/using-the-generator/](http://mobileangularui.com/blog/using-the-generator/)
 * [https://cordova.apache.org/#getstarted](https://cordova.apache.org/#getstarted)
 * [https://ccoenraets.github.io/cordova-tutorial/build-cordova-project.html](https://ccoenraets.github.io/cordova-tutorial/build-cordova-project.html)
