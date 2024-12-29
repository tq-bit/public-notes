---
description: Clean code rules on function conventions and naming
public: true
published: true
---

# Clean Functions
## Function Should Be Small
If you think your function is small, you can make it even smaller

>[!warning]
> A function should do a single thing.
> If it does more than one thing-refactor it into a context.

Blocks within if - else or while statements should be one line long for readability. It should be a function call or a return statement.

```typescript
// write
const hasStudents: boolean = myArray.length > 0
function assignStudents(students: Student[]) {
	// ...
}

if(hasStudents) {
	assignStudents(myArray);
}
```

## Functions Should Operate on One Abstraction Level
If you can extract a meaningful function from another one, this concept is violated

> [!example] Take MVC
> -> A model class or function should have no DOM access. 
> -> A view should have nothing to do with data manipulation

## Functions Should Read Like 'to' - Paragraphs

> [!example] Start with 'to'
> Try and describe every function with a `to` - prefix. 
> When a to-paragraph ends, open a new scope below the previous

This is an example from my `Crawley` app between different levels of abstraction

- To Crawl observed items, we must retrieve them from the database, then we crawl their current values. Finally, we return them to the user
	- To crawl observed items, we must iterate through them, crawl the current content, add its value to our history table and return the value
	    - To crawl the current content of a single observed item, we make an http request, query the value of the item and return it
	    - To add a value to the history table, we take the value of the crawled item and write it into the SQL table

## Try and Avoid Switch Statements
If it's necessary, use with caution and at the lowest level of abstraction

## Descriptive Names
See [[Clean Code - Naming things#Naming functions]]

## Function Arguments
- Should be 0
- Can be 1 or 2
- Should rarely be 3
- Never me more than that

> Don't pass flags (true - false) into arguments

