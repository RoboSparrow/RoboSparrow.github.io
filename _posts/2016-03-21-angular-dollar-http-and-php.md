---
layout: post
title: "Quick note: Processing data with Angular's $http and PHP"
---

This might be really basic but I found myself stumbling over this repeatedly. Writing down helps.

Angular's [$http service](https://docs.angularjs.org/api/ng/service/$http) sends data *by default* as `application/json` header

So don't hope to find it via `$_POST` or `$_REQUEST` in your PHP script on the other end of the line.
There are two ways to deal with it, either you adapt your PHP script or your $http object

## The Angular (Json) way

app.js:

```
// app.js

$http({
    method: 'POST',
    url: '<your php-api endpoint>',
    data: {
        greeting: 'Hello Api!'
    }
})
.then(
    // ...resolve, reject
)
;
```

api.php:

```
// api.php

// fetch data
$postData = file_get_contents('php://input');
$request = json_decode($postData);

// now do things with $request
if($request && property_exists($request, 'greeting')){
    print 'Hello App!';
    exit(0);
}
```

## The PHP (urlencoded) way

Alternatively you can change your request headers in $http. Note that you need to urlencode your data now!

app.js

```
// app.js

var data = {
    greeting: 'Hello Api!'
};

$http({
    method: 'POST',
    url: '<your php-api endpoint>',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: function() {// alternatively use $http's transformRequest || interceptors
        var r = [];
        for(var key in data){
            r.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        return r.join('&');
    }
})
.then(
    // ...resolve, reject
)
;
```

api.php

```
// api.php

// fetch data
// now do things with $request
if(!empty($_REQUEST['greeting'])){
    print 'Hello App!';
    exit(0);
}
```
