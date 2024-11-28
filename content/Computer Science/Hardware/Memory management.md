---
title: Memory Management
description: The heap, the stack and how they work
public: true
---


## The Stack and the Heap
Both, the stack and the heap are parts of memory available to code at runtime. Each of them is structured in a particular way

### The Stack
A stack is memory set aside for a thread of execution. Stacks are assembled in a certain order - blocks that enter last are removed first (= LIFO principle). Whenever stacks are accessed, it can only be done in a given order.
- Pushing data into the stack adds them on top
- Pop'ing data from the stack removes them from top again

> [!hint] Pros and cons of the stack
> Stacks are more organized and faster to access. They are in turn accessible only in a given order - after the LIFO principle - and during a program's runtime

**Stack blocks**
Whenever a function is called, a block is reserved on top of the stack for local variables and bookkeeping data. When this function returns, the block is freed and can be reused.
Stack blocks can point to data in the Heap

### The Heap
The heap is memory set aside for dynamic allocation. It is assembled after no given pattern - any block can be allocated and freed at any time. That means: New data is not created on top, but at any point on the heap where there's enough space. When the heap is accessed, it must be done with **Pointers**

> [!hint] Pros and cons of the heap
> Data on the heap can be accessed in any given order and independently of running processes. It is in turn less efficient to use and takes more time to access.

**Heap pointers**
Pointers are like adresses of locations in the heap. Each pointer 'points' to a space that holds allocated data.


## Function Calls on the Heap
Let's take Node.js as an example. When a Javascript file is executed, a new process is spawned. This process creates an event loop, which continously checks if there are functions that must be run and executes them in order.

The following code will be moved in the stack - and run - like so:

```ts
function logOne() {
	console.log('one');
}

function logTwo() {
	console.log('two');
}

function logBoth() {
	console.log('go')
	logOne();
	logTwo();
}

logBoth();
```

The first iteration:
- Add `logBoth` to the stack
- Execute the first `console.log()`
- Return control to `logBoth`
![[Pasted image 20220521111444.png]]

The second iteration:
- Add `logOne` to the stack
- Execute the `console.log` inside `logOne`
- Return control to `logOne`
- return control to `logBoth`
![[Pasted image 20220521111746.png]]

The third operation is a replica of the second, just with `logTwo()`