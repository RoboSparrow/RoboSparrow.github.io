---
layout: post
title: Install Wordpress using wp-cli
---

Installing Wordpress with [wp-cli](http://wp-cli.org/) is a huge time-saver.


```bash
## 0. create project folder
mkdir myproject && cd myproject
## 1. fetch wp-cli
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
## 2. get core wordpress
php wp-cli.phar core download
## 3. create a config
php wp-cli.phar core config --dbname=testing --dbuser=wp --dbpass=securepswd
## 4. install
php wp-cli.phar core install --url=example.com --title=Example --admin_user=supervisor --admin_password=strongpassword --admin_email=info@example.com
```

**Boom!**

## Installing plugins

## search plugin

```bash
## search plugin database
php wp-cli.phar plugin search 'contact form 7'
## check displayed search results and use the slug for the plugin you want to install
php wp-cli.phar plugin install contact-form-7 --activate
## done!
```
