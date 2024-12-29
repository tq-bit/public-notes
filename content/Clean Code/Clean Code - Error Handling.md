---
description: Clean code rules on error handling
public: true
published: true
---
# Clean Error Handling
## Start with Try-catch
- Try-catch blocks are like transactions. 
- Catch leaves the program in a consistent state, no matter what happens before

## Use TDD to Force Exceptions
- Then, add behavior to handlers to satisfy tests
- Like this, you enforce a style of 'what-could-possibly-go-wrong' - writing

## Wrap Third Party APIs
- If you use an external library or class, make sure to write wrapper functions for each method or function
- This makes you less dependant on third party's design choices
- And less dependant on a library itself

## Don't Return Null
- If there are several checks for null, there's no way to figure which one caused the error
- One missing null check and the app might break for good
- Much rather, return an empty list or a special object

## Use Special Error Objects
One approach could be to always return a simple **[tuple](https://www.typescriptlang.org/play#example/tuples)** with a result and an error. Such as `[result, error]` - the TryCatchTuple

This approach works in sync, as well as in async code.

> [!warning] Caution: Boilerplate
> This approach makes sense if there's plenty of error messages to be handled. tryCatch comes with its perks at the cost of additional boilerplate

```typescript
type TryCatchTuple<T> = [T | null, Error | null];

const tryCatch = <T>(fn: () => T, ): TryCatchTuple<T> => {
	try {
		const result = fn()
		return [result, null];
	} catch (error) {
		return [null, error];
	}
};

const tryCatchAsync = async <T>(fn: () => Promise<T>, ): Promise<TryCatchTuple<T>> => {
	try {
		const result = await fn()
		return [result, null];
	} catch (error) {
		return [null, error];
	}
}

const sum = (a: number, b: number, c: number) => {
	return a + b + c;
};

const trySum = () => {
	const a: number = 1;
	const b: number = 2
	const c: number = 3
	const [myResult, myError] = tryCatch<number>(() => sum(1, b, c));
	console.log(myResult, myError)
};

trySum();
```

