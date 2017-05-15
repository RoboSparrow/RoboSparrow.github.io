---
layout: post
title: Open remote Mongo for ssh tunneling
---

In case you need to open an remote Mongo server to a ssh tunnel.
This covers only the steps for Mongo 3.x, you will need to open ssh for the port as well.

1. stop Mongo

```bash
sudo service mongod stop
```
2. Edit mongod config

```bash
sudo nano /etc/mongod.conf
```
The conf file is just a YAML file. Look for the `net.bindIp` settings. By default Mongo allows only connections via 127.0.0.1 (localhost)

Add your **static** ip address(es), separated by commas

Example:

```yaml
systemLog:
   destination: file
   path: "/var/log/mongodb/mongod.log"
   logAppend: true
storage:
   journal:
      enabled: true
processManagement:
   fork: true
net:
   bindIp: 127.0.0.1,<YOUR STATIC IP>
   port: 27017
setParameter:
   enableLocalhostAuthBypass: false
...
```

3. restart Mongo

```bash
## start mongo
sudo service mongod start

```

---

Links:

* [Mongo 3.4 configuration reference](https://docs.mongodb.com/manual/reference/configuration-options/)
