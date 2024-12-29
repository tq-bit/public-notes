---
description: Clean code rules on naming variables, functions and classes
public: true
published: true
---
# How to Properly Name things
## Use Intention-revealing Names

> [!info] Rule of thumb
> If a comment is needed to describe a variable, it is not intention revealing

```typescript
// Instead of
const d: number = 5 // Elapsed time in days

// Write
const daysSinceCreation: number = 5;
const elapsedTimeInDays: number = 5
```

Also, avoid writing short words that come with a cost of understanding.

```typescript
// Instead of
class DtaRcrd102 {
	declare genymdhms: Date;
	declare modymdhms: Date;
	declare pszqint: string;
}

// write 
class Customer {
	declare generationTimestamp: Date;
	declare modificationTimstamp: Date; 
	declare recordId: string
}
```

## Make Meaningful Distinctions
If functions or variables have different names, then their purpose should not be ambigious. 

-> If `Class` is a keyword, don't use `Klass` for anything
-> If `this` is a keywords, don't use `that` for anything else but an alias
-> If you already have a class called `Product`, don't use `ProductData`

Avoid noise words, such as [`a`, `an`, `the`]. Also, avoid the following:

## Use Searchable Names
- Longer names trump shorter names
- Searchable names trump a constant (UPPERCASE)
- The length of a name should correspond to the size of its scope
  -> A more complex variable/function may have a longer name
  -> In contrary, local variables-such as `i, j` in a for - loop-may be shorter 
  
## Give Function Descriptive Names
> [!success] Small functions are easy to describe
> If your functions are small-see [[Clean Code - Functions]]-then they're easy to describe
- If you have to choose, prefer long, descriptive names over short, enigmatic ones
- Take time to choose function names
- Be consistent with naming
- Use the same phrasings, nouns and verbs

## Avoid Encodings
- Don't make stuff like Hungarian Notation or Member-prefixes good practice
- Avoid mental mapping and *smart* one-liners

## Write Unambigious Names
### Classes
- Classes and objects should have noun-or noun - phrase-names
- Classes should not be verbs

### Methods
- Methods and functions should have a verb-or verb-phrase-name
- They should use problem domain names. E.g. `processPayment`, `lookupPassenger`

### Pick One Word per Concept
Avoid using words like `get`, `fetch`, or `retrieve` for the same purpose inside of the same context.

## Add Meaningful Context (e.g. closures)
- Instead of having one function that does everything, place it into a context
- If you cannot use a class, try and use closures or currying

