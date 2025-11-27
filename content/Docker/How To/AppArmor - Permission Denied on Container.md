---
description: Stop and remove a container which gives a permission denied error in docker
tags:
  - docker
  - security
  - unix-permission
---
AppArmor is a Linux kernel security module that provides mandatory access control (MAC) by enforcing per-application security profiles. These profiles strictly define what files, system resources, and operations a given program—including container runtimes like Docker—can access or perform.

> [!info] Why this prevents containers from being shut down
> AppArmor operates using security profiles that describe permitted actions for specific processes. If a Docker container or daemon attempts an operation not allowed by its profile—such as sending certain signals to stop or kill a container—the action is denied by the kernel, resulting in a "permission denied" error.

The issue most commonly arises when a container tries to execute system-level operations that the AppArmor profile for Docker does not explicitly permit, such as signaling, accessing files outside allowed paths, or modifying critical system resources. Hence, if a container tries to execute system-wide commands, it probably bugs out and cannot be stopped while being blocked by AppArmor.

This command removes all unknown entries from AppArmor

```sh
sudo aa-remove-unknown
```


The alternative option would be to stop AppArmor entirely and restart the container with the risk of unpermitted stuff happening. If nothing else works, it helps to restart the PC

```sh
sudo systemctl stop apparmor
docker rm -f synchronize-tenant-data
sudo systemctl start apparmor
```