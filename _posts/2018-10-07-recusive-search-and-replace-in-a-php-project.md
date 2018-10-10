---
layout: post
title: Workflow for recursive search/replace in a PHP project
---

*Use case**

Our Open Source xAPI LRS [lxHive](https://github.com/Brightcookie/lxHive) changes ownership from Brightcookie to G3 International.
This sounds a bit more dramatic than it actually is. The team behind lxHive stays the same, only the organisation changes.
I won't go into details, because they are neither related to this topic nor to the LRS itself. Instead I refer to the [offical annoucement](https://www.catalyst-au.net/news/announcement-brightcookie-agreement)

**Scope**

So we need to replace occurences of `Brightcookie` with `G3 International`. This mainly affects mainly documentation and license headers inside hundreds of code files. The approach is (as often) a mix of individual review and low-level automation.

** Notes**

The search and replace queries int this example are case case insensitive.

We omit `.git` and `vendor` directories.Depending on your project type you might add a few more.

For example inside a Laravel app you should exclude `storage` and `database` folders and handle them independently. If your project includes Javascript packages exclude `node_module`

**Workflow**

1. Rewiew affected lines (export to file)

```bash
grep -nri "<old-string>" . --exclude-dir={.git,_dev} >> /<path>/grep.txt
```

2. Apply changes, ignore `.git` and `vendor` folder(s)

```bash
find . -type f  -not -path '*/\.git/*' -not -path '*/vendor/*' -print0 | xargs -0 sed -i 's/<old-string>/<new-string>/g'
```

3. Recursively lint php files

```bash
find . -type f -name '*.php'  -not -path '*/\.git/*' -not -path '*/vendor/*' -exec php -l {} \; | grep -v "No syntax errors detected"
```

4. List changed files

```bash
git status
```

5. Review diff changes

```bash
git diff
```

6. Run unit tests

```bash
./vendor/bin/phpunit
```

Ready to commit!
