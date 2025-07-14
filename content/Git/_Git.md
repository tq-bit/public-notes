---
title: Overview of Git
description: A distributed version control system to keep your software projects organized and scalable
public: true
published: false
---
Git is a Source Code Management (SCM) tool. It keeps track of changes to your code and offers many powerful commands to collaboratively develop software.

Git supports a variety of features - from [[Basic commands|simple management commands]] to [[Remote repositories|complex remote repositories]]. It is also home to a variety of good practices, such as [[Docker - Basic management commands|semantic commits]].

The tool is commonly used in a shell, but there are UI tools such as
- [Git Tower](https://www.git-tower.com/mac) for MacOS
- [Git Kraken](https://www.gitkraken.com/) for Linux, MacOS & Windows

## Git repositories

Also known as remote repositories, these SCM stores act as hubs to develop on software. Working on them is highly individual, but there are a few common traits most repositories share

![[assets/Git_Repository_Lifecycle.png]]


## Git Hooks
See [Git - Husky.js](https://www.npmjs.com/package/husky)

Hooks execute a given action after an event emitted by git. The files are located in the ./hooks folder.

> [!note]
> You must make the file executable with `chmod +x <filename>`