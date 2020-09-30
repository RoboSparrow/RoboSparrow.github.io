---
layout: post
title: CGI - Parsing JSON data requests with Python
---

Python's core [cgi module](https://docs.python.org/3/library/cgi.html) is a great helper for slim rest apis
Unfortunately field parsing with `cgi.FieldStorage()` does not support JSON data requests and will raise a TypeError.

request

```bash
curl \
    --header "Content-Type: application/json" \
    --request POST \
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
    --header "Content-Type: application/x-www-form-urlencoded" \
    --request POST \
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
    --header "Content-Type: application/json" \
    --request POST \
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

content_len = int(os.environ['CONTENT_LENGTH'])

body = sys.stdin.read(content_len)
res = json.loads(body)
query_string = os.environ.get('QUERY_STRING', '')

print('json: ', res)
print('query: ', query_string )

if not query_string:
    exit()

query = parse_qs(query_string)
print('test: ', query['test'][0])

#> json:  {'name': 'Deep Thought', 'answer': 42}
#> query:  test=1
#> test:  1

```
