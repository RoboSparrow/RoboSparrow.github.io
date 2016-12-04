---
layout: post
title: "GalliumOS Chrx - Enable automount for USB sticks"
---

![Alt text](/img/posts/gallium-os.png)

[GalliumOS](https://galliumos.org/) is a great Xubuntu-based distro for Chromebooks. I recomend installing it with [chrx](https://github.com/reynhout/chrx) dualboot (follow readme step-bystep)

* On powering up your Chromebook (developer mode sceen) can switch with `CTRl+D` to Chrome or `CTRL+` to Gallium

One problem was that external usb devices did not auto mount in Gallium, i.e they were not available in the file manager before I mounted them manually via terminal.

Here is the fix, thanks to [/u/archelay](https://redd.it/4d1qf1)

```bash
 sudo mv /etc/udev/rules.d/99-hide-disks.rules /etc/udev/rules.d/99-hide-disks.bak
```

> If you used chrx, try removing "/etc/udev/rules.d/99-hide-disks.rules"... Chrx puts it there to ignore ChromeOS partions, which is fine if your root disk is "sda", but cb3-111 has eMMC, which kernel calls mmcblk0. So, when you insert flash drive it is named "sda" and is being ignored.

As you can see from the quote this is not an issue but a slighty annoying security precaution.

Links:

* Galluim OS community: https://www.reddit.com/r/GalliumOS/
* Gallium OS Inststall Wiki: https://wiki.galliumos.org/Installing
* Chrx: https://github.com/reynhout/chrx

