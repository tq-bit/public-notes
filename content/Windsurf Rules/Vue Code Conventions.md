---
description: Regeln zur Arbeit mit Vue.js
tags:
  - ai
  - windsurf
  - conventions
public: false
---
```md
---
trigger: glob
globs: .vue
---

## General
- When you notice a pattern that emerges in more than 2 pages or components, notify the developer and offer to extract it into a new component

## Naming Conventions

### Files & Environment
- Use PascalCase for component names and component files
- Use lowercase for Pages in Nuxt pages directory

## Framework specific
- When using Nuxt, Pinia or other plugins, use their specific API
- When using a Vue component library, use their specific Components instead of writing your own

## Forms and inputs
- Implement form state management using Pinia, never use reactive component state unless it's a generic form component

## Component Frameworks
- Check the package.json file for Component frameworks, such as NuxtUI
- Always research - and use the Component frameworks' components instead of building your own
- If a component is not defined as part of the framework, always ask the user before you create a new one
```