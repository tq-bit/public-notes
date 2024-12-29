---
title: Clean Code
description: A guide on how to write maintainable code
tags:
  - design
  - development
  - writing
---
# Clean Code Practices
> [!tldr] In a nutshell
> Write code a person who sees the codebase for the first time can easily understand
## The 5s Principles
See [[Clean Code - Developer attitude]]
1. **Seiri ⇒ Organisation, knowing what+where things are**. 
	Code parts should be named properly. 
	Directories should be named properly
	
2. **Setion ⇒ There is a place for everything**. 
	Code is to Be where You Would expect it
	
3. **Seiso ⇒ Keep your workplace clean**. 
	Code should not include any commented out code or wishes for the future
	
4. **Seketsu ⇒ Standardize**. 
	A group should agree on how they keep their workplace clean
	
5. **Shutsuke ⇒ discipline yourself.** 
	Follow your own practices, reflect on your work & be willing to change.
	
> [!important] Costs and value
> While rework in the manufacturing metaphor leads to cost, rework in design leads to value.
> 
> **Don't be afraid to write beautiful code once you got it working**

## Why is Clean Code Important?
- Productivity is bound to decrease over time ⇒ This should always be considered and conveyed to management
- More staff will not solve the problem but worsen it. 
- They will use the patterns that created the initial mess and extend-and not fix-it
- Customer change requests tend to come only when prototyping is over

> [!tldr] Clean code is important, because
> The total cost of owning a mess is greater than the value gained by moving fast,
> bad code will slow you down not in the long run, but immediately, and
> a grand redesign in the sky doesn't work


## What is Clean Code?
See [[Clean Code - Naming things]]

The following attributes describe what it feels like to read through a well maintained codebase:

- Clean code is **elegant** and **efficient**
- **Bugs** have a **hard time** to **hide**
- **Dependencies are minimal** to ease maitenance
- Clean code does **one thing** (not many) well
- Clean code is **simple and direct**
- It reads like well written **prose**, 
- **contains** only what is **necessary**
- and leaves **no room for speculation**
- Clean code has Unit and acceptance **tests**
- It uses **meaningful** and intention-revealing **names** 

> [!question] What does clean code look like?
> It looks like it was written by somebody who cares

## Does Clean Code Need Comments?
-> Usually: No. See [[Clean Code - Naming things#Use Intention-revealing names]]
- Before you write a comment, try and refactor
- Don't write noisy comments
- Write JSDoc for public APIs

## Learn Code by Writing Tests
- This is especially useful for third party packages - write **learning tests**
  -> These come at zero cost, you have to learn the package anyway
- Learning tests can help during upgrades as well-is the code changes, we know what exactly broke