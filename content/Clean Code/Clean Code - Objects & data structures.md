---
description: Clean code rules on designing data structures and objects
public: true
published: true
---
# Clean Data Structures

## Overview
|  | Data structures | Objects |
| --- | --- | --- |
| **Outside behavior** | Stupid/stateful-exposing | Clever/stateful-hiding |
| **Exposes** | Data | Operations
| **Style** | Procedual programming | Object-oriented Programming |

> [!tldr] More specifically
> - Data structures are stupid, they expose only their data
> - Objects are smart, they expose no data, but operations **(Law of Demeter)**
> - Data structures may be operated on with procedual programming
> - Objects may be operated on with object-oriented programming

## Differences Between Objects and Data Structures
- Objects hide their data behind abstractions
- Data structures expose their data & have no meaningful functions

## Use Data Abstraction
> [!quote] Abstract data
> There is a reason that we keep our variables private. We don’t want anyone else to depend on them. We want to keep the freedom to change their type or implementation on a whim or an impulse

- The idea is to hide implementation under a layer of abstraction
- Devs can interact over a public API without having to understand what's going on under the hood
- -> Don't use getters and setters for just every variable
- Think clearly about what data to expose

```typescript
// Concrete class = Data structure
export default class Transcriber {
	transcriptionFileSource: string;
	transcriptionTextDestination: string;
	constructor( ... ) { ... }
	// These two getters might be redundant
	public getTranscriptionFileSource(): string { ... }
	public getTranscriptionTextDestination(): string { ... }
}

// Abstract class = 'Object'
export default class Transcriber {
	transcriptionFileSource: string;
	transcriptionTextDestination: string;
	constructor( ... ) { ... }
	
	public transcribeFromLocalFile() { ... }
}
```

-> The second option is preferable. 
In this case, we don't want to interact with source and the destination once a new object is initialized.

## Decide on Object Purposes
- When designing objects, think about their purpose
- Before you write a getter, think abouot what the result is meant to be used for
- Then, decide whether about implementing logic instead of a public getter would solve the same problem

## Procedual Vs. Object Oriented Code
- **Procedual code**-or-**Code using data structures**
	- makes it easy to add new functions 
	- and hard to add new data structures (because all functions must be adjusted)
- **Object oriented code**-or-**Code using abstraction** 
	- makes it easy to add new classes 
	- and hard to implement new functions (because all classes must be adjusted)

## The Law of Demeter
> [!quote] The Law of Demeter says:
> A module should not know about the innards of the objects it manipulates

-> More specifically: **Objects should hide their data and expose operations**
-> On the other hand: **Data structures naturally expose their properties**

