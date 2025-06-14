---
description: This file includes a few best-practices to consider when implementing Error handling in a Typescript App.
public: true
published: true
---

See also [[Typescript - Trycatch wrapper]] - although the wrapper is less idiomatic for Javascript
## Good practices

### Always throw an Error - Class
The default error class in Typescript can be extended with new properties and a custom type

```typescript
class DatabaseError extends Error {
    protected code: string;
    constructor(message: string, code?: string) {
        super(message);
        this.name = "DatabaseError";
        this.code = code || "0000";
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}
```

### Using Codes
When handling similar Errors, use codes to differentiate between different Error cases. In the DatabaseError example, this could mean using an Enumeration for several database error causes, such as 'User not found' or 'Entry already exists'.

```ts
const DatabaseErrorCode = {
    UNKNOWN: "UNKNOWN",
    NOT_FOUND: "NOT_FOUND",
    CONFLICT: "CONFLICT",
    BAD_REQUEST: "BAD_REQUEST"
} as const;

type TDatabaseErrorCode = typeof DatabaseErrorCode[keyof typeof DatabaseErrorCode];
```

Then add the type to the `code` property of the `DatabaseError` class:

```ts
class DatabaseError extends Error {
    protected code: TDatabaseErrorCode;
    constructor(message: string, code?: TDatabaseErrorCode) {
        super(message);
        this.name = "DatabaseError";
        this.code = code || "UNKNOWN";
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}
```

### Bubble errors to upper scopes
If errors cannot be locally recovered, bubble them to the upper function, for example in the application layer. 

```ts
// Database Layer
function getUser() {
    const user = null; // read user in this function

    if(!user) {
        throw new DatabaseError("User not found", DatabaseErrorCode.NOT_FOUND);
    }

    return user;
}

// Application Layer
function readUser() {
    try {
        getUser();
    } catch (error) {
        if (error instanceof DatabaseError) {
            if (error.code === DatabaseErrorCode.NOT_FOUND) {
                console.log(error.message);
            }
        } else {
            throw error;
        }
    }
}

readUser(); // 'User not found'
```

### Implement a catchall routine
Catch unhandled errors to prevent the app to run in an inconsistent state.

Implementation in Node.js
```ts
// Synchronous exceptions
process.on('uncaughtException', err => {
	console.trace(err);
	process.exit(1);
})

// Asynchronous exceptions
process.on('unhandledRejection', (reason, promise) => {
	console.trace(reason);
	process.exit(1)
})
```

Implementation in Browsers: 
```ts
// Catch all uncaught errors (synchronous & asynchronous thrown errors)
window.onerror = (message, source, lineno, colno, error) => {
  console.error('Global Error:', message, source, lineno, colno, error);
};

// Catch all unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
});
```