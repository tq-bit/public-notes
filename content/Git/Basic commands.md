---
description: A list of basic, local Git commands
public: true
published: false
---
## Init a repository
Tells Git to keep track of all files in cwd

```sh
# Init repos
git init
git add --all && git stage --all
```

## Commit
Committing changes applies them to the previous code version. A commit must always include a message. This message can have a header and a body by adding a second -m command or a line break in a UI commit editor, such as VSCode

> It is good practice to use [[Sematic Git messages|semantic commits]]

```sh
# Simple commit message
git commit -m 'Initial commit'

# Commit message with head and body
git commit -m "feat: add new button - ticket 234" -m "added a new button to the index.html page"
```

## Stash
Stashing creates a cache of a change, which can later be applied. This is useful when integrating changes from [[Remote repositories|remote repositories]] without creating new branches.

```bash
# Create a stash and reapply it
git stash
git stash pop
```

## Local Git branches
Branches keep track of separate code changes and are often used to bundle a set of commits as a feature. Branches are also often used for Merge Requests on remote Git platforms.

```bash
# Change to the branch in which changes should be merged
git checkout master

# Merge changes
git merge <branchname>

# Delete the old branch
git branch -d <branchname>
```