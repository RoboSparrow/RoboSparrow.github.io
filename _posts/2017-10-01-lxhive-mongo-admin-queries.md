---
layout: post
title: LxHive - Mongo Admin Cheat Sheet
---

Since 2014 I was heavily involved in all stages of the development of Brightcookie's xAPI LRS [lxHive](https://github.com/Brightcookie/lxHive).
The difference to fully fledged LRS alternatives (LearningLocker) is that lxHive is **machine-to-machine** focussed and thus very hands-on and barebone. No UI, no reports and only a few dependencies, fast and lightweight. Oh yeah - and it's written PHP and OS/server agnostic.

This means in order to administrate/configure lxHive you have to get your hands dirty, either via the [console](https://github.com/Brightcookie/lxHive/wiki/Using-the-X-console), the [config file](https://github.com/Brightcookie/lxHive/blob/master/src/xAPI/Config/Templates/Config.yml) or even via your preferred Mongo client

Here some unordered MongoDb helpers for admin, reports and backups. Use them inside Mongo shell or with [RoboMongo](https://robomongo.org/)

<script src="https://gist.github.com/RoboSparrow/5aa343fd1c582801e0b161a5899fd39c.js"></script>

---

Links

* [direct link to cheat sheets](https://gist.github.com/RoboSparrow/5aa343fd1c582801e0b161a5899fd39c)
* [lxHive](https://github.com/Brightcookie/lxHive)
