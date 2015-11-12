---
layout: post
title: Clear apache error logs on Linux.
---

When developing you might just need to clear your Apache error log files from time to time.
There is a brillant answer to this problem on [Serverfault](http://serverfault.com/a/437418).

Assuming you are logging to the default *error.log*:

```
#Debian based: Ubuntu etc..
sudo su
echo > /var/log/apache2/error.log
```

```
#RHL based : CentOS, Fedora etc...
sudo su
echo > /var/log/httpd/error.log
```

That truncates the file without closing any open file handles. Note that you need to be `root` user, a simple `sudo` might still throw permission errors.
