---
description: Code snippet to handle errors in a Rust/Go style. Less common in Typescript
---


```ts
const saveFunctionCall = <T>(fn: () => T): {
	ok: boolean, 
	error: Error | null, 
	value: T | null
} => {
    let ok = false;
    let error: Error | null = null;
    let value: T | null = null;

    try {
        value = fn();
        ok = true;
    } catch (e: unknown | Error) {
        error = e as Error;
    }

    return {ok, error, value}
};

```

## Example

```ts
function add(a: number, b: number): number {
    return a + b;
}

const {ok, error, value} = saveFunctionCall<number>(() => add(1, 1));

if(ok) {
    console.log(value);
} else {
    console.trace(error);
}
```