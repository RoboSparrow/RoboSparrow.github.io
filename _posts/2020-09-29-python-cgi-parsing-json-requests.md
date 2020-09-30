---
layout: post
title: CGI - Parsing JSON data requests with Python
---

Python's core [cgi module](https://docs.python.org/3/library/cgi.html) is a great helper for slim rest apis
Unfortunately field parsing with `cgi.FieldStorage()` does not support JSON data requests and will raise a TypeError.

request

```bash
curl \
    --request POST \
    --header "Content-Type: application/json" \
    --header "X-Marvin-Status: depressed" \
    --data '{"name": "Deep Thought", "answer": 42}' \
    http://raspberrypi.local:9000/hitchhiker/api/ultimate-question.py?test=1
```

server

```python
#!/usr/bin/env python3
import cgi

params = cgi.FieldStorage()
print(params)

#> ...TypeError: write() argument must be str, not bytes
```


## Solution 1: convert your request to an urlencoded form request

request

```bash
curl \
    --request POST \
    --header "Content-Type: application/x-www-form-urlencoded" \
    --header "X-Marvin-Status: depressed" \
    --data 'name=Deep Thought&answer=42' \
    http://raspberrypi.local:9000/hitchhiker/api/ultimate-question.py?test=1
```

server

```python
#!/usr/bin/env python3
import cgi

params = cgi.FieldStorage()
print(params)

#> FieldStorage(None, None, [MiniFieldStorage('name', 'Deep Thought'), MiniFieldStorage('answer', '42'), MiniFieldStorage('test', '1')])

```

The clear **disadvantage** is here that you have to typecast your data properties **twice**.

 - on client, when encoding the data
 - on server, when processing the params

## Solution 2: parse request manually

Read the raw request body directly and parse query with [urllib](https://docs.python.org/3/library/urllib.parse.html)

request

```bash
curl \
    --request POST \
    --header "Content-Type: application/json" \
    --header "X-Marvin-Status: depressed" \
    --data '{"name": "Deep Thought", "answer": 42}' \
    http://raspberrypi.local:9000/hitchhiker/api/ultimate-question.py?test=1
```

server

```python
#!/usr/bin/env python3

import os
import sys
import json

from urllib.parse import parse_qs

content_len = os.environ.get('CONTENT_LENGTH', '0')
method = os.environ.get('REQUEST_METHOD', '')
query_string = os.environ.get('QUERY_STRING', '')
x_header = os.environ.get('HTTP_X_MARVIN_STATUS', '')

body = sys.stdin.read(int(content_len))
res = json.loads(body)

print('method: ', method)
print('header[X-Marvin-Status]: ', x_header)
print('query: ', query_string)
print('json: ', res)

if not query_string:
    exit()

query = parse_qs(query_string)
print('test: ', query['test'][0])

```
