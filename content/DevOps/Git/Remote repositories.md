---
description: Code snippets to help work with remote Git repositories
public: true
published: false
---
## Add & Change Remote Repositories
Remote repositories are tied to local repositories by using these management commands. Each local repository can be tied with multiple remotes, it is however good practice to keep the number small to avoid confusion.

```bash
# Forked origin (contributer - you) 
$ git remote add origin <url> 

# Original repos  (maintainer)
$ git remote add upstream <url>

# Change a remote repos URL
$ git remote set-url origin <url>
```

## Synchronize Changes
**Changes from local repositories are pushed** to remotes, while **changes from remotes are pulled** by locals. 

> [!info]
> The naming and flow of these changes resemble the way a river flows (from origin, pushed downstream, pulled by gravity)

```bash
# Add (push) changes to the origin repos 
$ git push origin <branchname> 

# Get (pull) changes from the upstream repos
$ git pull upstream <branchname>
```

## Delete a Remote Branch
Deletions must be pushed towards a remote

```bash
$ git push <origin> --delete <branchname>
```
