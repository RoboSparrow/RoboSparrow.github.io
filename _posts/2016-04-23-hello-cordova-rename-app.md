---
layout: post
title: "Quick note: HelloCordova - rename your app"
---

So you developed your app and neglected your **config.xml**?
If you are as impatient as me then your app might still showing up as `HelloCordova` on your devices and sims.
Updating your config is apparently not enough because your platform builds still contain references to the old app meta data.

Example ios:
![Alt text](/img/posts/hello-cordova-ios-folder.png)

The solution is to rebuild each platform via `cordova platform remove <platform>` and `cordova platform add <platform>`.
You should do this generally after every significant change in your **config.xml**.

```
# remove
cordova platform remove ios
cordova platform remove android
# add
cordova platform add ios
cordova platform add android
```

After this:

* you might need to rebuild your app icons and splash screens
* re-import your project in `xcode` (if ios)

Tools:

* [cordova-icon])(https://github.com/AlexDisler/cordova-icon)
