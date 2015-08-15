---
layout: post
title: MAY I have fun with RFC key words? You SHOULD!
---

This might come in handy when writing BDD tests. The simple bash below extracts lines with [RFC Key Words](http://www.ietf.org/rfc/rfc2119.txt) from a document.    
     
```
curl -s https://raw.githubusercontent.com/adlnet/xAPI-Spec/1.0.3/xAPI.md | grep -nwE --color=auto MUST
```

List of the defined keywords: "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL"
 
Save extract to file:

```
curl -s https://raw.githubusercontent.com/adlnet/xAPI-Spec/1.0.3/xAPI.md | grep -nwE --color=auto MUST > MUST-1.0.3-xAPI.md
```

Optionally use wget instead of curl.
