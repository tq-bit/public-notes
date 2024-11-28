---
description: How to semantic commits in a coding project
public: true
published: false
---
Semantic commit messages can help identify what exactly happened during a code commit and enhance readability, as well as search.

The general format for a semantic Git commit message [^1]is:
`<Type>: [Scope of change] - {Subject | Reference}`

> [!example] Conventional commit examples:
> - feat: add toolbar to `user.vue` - ticket-325
> - fix: add semicolon at customer signup method - ticket-472
> - docs: remove controller legacy class - ticket-829

## List of types

| **Type** | **Description**                                         |
| -------- | ------------------------------------------------------- |
| feat     | New feature for the app. No new dev or build features   |
| fix      | Bug fixes for the app. No fix to a dev or build feature |
| docs     | Changes to the app's documentation                      |
| style    | Formatting, missing semicolon, etc. No logic changes    |
| refactor | Refactoring, code abstraction                           |
| test     | Add unit tests, test refactoring. No logic changes.     |
| chore    | Updating build tasks or scripts. No logic changes.      |
| revert   | Revert a previous change                                |


[^1]: https://www.conventionalcommits.org/en/v1.0.0/#specification
