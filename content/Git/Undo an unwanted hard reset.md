---
title: Undo hard reset
description: A code snippet to help restore an unwanted hard reset on a local branch
public: true
published: false
---
```bash
$ git reflog 
# 1a75c1d... HEAD@{0}: reset --hard HEAD^: updating HEAD 
# f6e5064... HEAD@{1}: commit: added file2 

# copy hash from unwanted change and paste below
$ git reset --hard f6e5064 # HEAD is now at f6e5064... added file2
```
