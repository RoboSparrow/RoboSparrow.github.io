---
layout: post
title: Writing a really quick and dirty rollup.js copy plugin
---

[rollup](https://github.com/rollup/rollup) is the best ES6 module bundler currently out there. It's simple, fast and extendable.
And Rollup bundles into clean and readable code. (I am looking at you, Webpack!)

Writing rollup plugins sounds far more taunting as it is. A plugin boils down to just a function which returns an object.
So, with a few lines you can create a simple plugin inside your rollup.js. 

The only challenge is to hook your task into the right [supported plugin properties](https://github.com/rollup/rollup/wiki/Plugins#creating-plugins) callback.

Here an example of a simple "Copy file A to B" plugin.

<script src="https://gist.github.com/RoboSparrow/13ec07f68d76ca25777eca74c3598ff5.js"></script>

In this case I just copy a static js (which creates a global object) file from ./node_modules to my dist folder.

---

Links:

* [rollup.js](https://github.com/rollup/rollup)
* [Plugin reference](https://github.com/rollup/rollup/wiki/Plugins)
