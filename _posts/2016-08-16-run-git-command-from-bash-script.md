---
layout: post
title: "Run git commands from a bash script in a different folder"
---

I needed a bash script to capture some repository info from a different folder in variables.
Dr. Google was helpful again and so I came up with this example script.

```
#!/bin/bash

dir=/www/lxHive

if [ -d "$dir" ]; then
    branch=$(git --git-dir "$dir/.git" branch | sed -n -e 's/^\* \(.*\)/\1/p')
    status=$(git --git-dir "$dir/.git" --work-tree=$dir status)
else
    branch='.git dir not found'
    status=''
fi

echo
echo "* Folder: $dir/.git"
echo "* Branch: $branch"
echo "* Status:"
echo
echo "$status"
echo
```

Save as test.sh and make it executable.

Output:

```
$ sh test.sh

* Folder: /www/lxHive/.git
* Branch: bugfix-statement-filtering
* Status:

# On branch bugfix-statement-filtering
nothing to commit (working directory clean)
```

Notes:

 * This does NOT work with relative paths
 * Most git commands require tho specify the tree with  the `--worktree` argument or they output rubbish (git < 1.8). See stackoverflow link below.
 * Wrap multiline command variables in quotes for better output


Links:

* https://rietta.com/blog/2014/02/16/get-and-compare-the-current-git-branch-in-bash/
* http://stackoverflow.com/a/1386350
