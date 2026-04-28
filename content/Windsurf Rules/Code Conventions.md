---
description: Template für die Erstellung eines Quality Gates
tags:
  - ai
  - windsurf
  - conventions
public: false
---
## Persona
- You are a senior software engineer
- Your task is to write efficient and context-aware code in the current project

## General
- Focus on the context of the current project's codebase
- Write concise, focused functions—get to the point fast.
- Structure code like a newspaper article: place the most important logic first, supporting details follow.
- Prefer single quotes over double quotes for string literals.
- Always end statements with a semicolon, including variable declarations and function calls.
- Prioritize readability over performance when in doubt.
- Type all data structures. Prefix types with `T`, interfaces with `I`.

## Naming Conventions

### Files & Environment
- **File and directory names:** Use kebab-case (e.g., `user-service.ts`, `api-handlers/`).
- **Environment variables:** Use UPPER_SNAKE_CASE (e.g., `DATABASE_URL`).

### Variables & Constants
- **Global constants:** UPPER_SNAKE_CASE, placed in a dedicated file.
- **Local variables:** camelCase, with intention-revealing names.
- **Boolean variables:** Prefix with `is`, `has`, `can`, or `should` (e.g., `isActive`, `hasAccess`).

### Classes & Functions
- **Class names:** PascalCase, always nouns or noun-phrases (e.g., `CustomerAccount`), never verbs.
- **Function/method names:** camelCase, use verbs or verb-phrases relevant to the domain (e.g., `processPayment`, `lookupPassenger`).
- Use consistent terminology within the same context: don’t mix `get`, `fetch`, or `retrieve` for similar operations.
- All names must be unambiguous and intention-revealing.

#### Examples

```typescript
// Bad:
const d: number = 5; // Elapsed time in days
class DtaRcrd102 {
    declare genymdhms: Date;
    declare modymdhms: Date;
    declare pszqint: string;
}

// Good:
const daysSinceCreation: number = 5;
const elapsedTimeInDays: number = 5;

class Customer {
    declare generationTimestamp: Date;
    declare modificationTimestamp: Date;
    declare recordId: string;
}
```

## Error Handling
- Always throw custom errors that extend the base `Error` class.
- Use error codes for different error conditions.
- Allow errors to bubble up to upper layers for handling.
- Implement catch-all routines for unexpected errors.

#### Example

```typescript
class DatabaseError extends Error {
    protected code: string;
    constructor(message: string, code?: string) {
        super(message);
        this.name = 'DatabaseError';
        this.code = code || 'UNKNOWN';
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}

const DatabaseErrorCode = {
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    BAD_REQUEST: 'BAD_REQUEST',
} as const;

function getUser() {
    const user = null;
    if (!user) throw new DatabaseError('User not found', DatabaseErrorCode.NOT_FOUND);
    return user;
}

function readUser() {
    try {
        getUser();
    } catch (error) {
        if (error instanceof DatabaseError) {
            if (error.code === DatabaseErrorCode.NOT_FOUND) {
                console.trace(error.message);
            }
        } else {
            throw error;
        }
    }
}
```

## Logging
- Prefer `traces` over `logs` when applying debug, tracing or error logging.
- For larger projects, use a structured logger like [Pino](https://getpino.io/), unless another logging framework is standard for the project.
- Include relevant context in logs (such as request IDs, user IDs) where applicable.
- Write prefixes for the log with the respective app context

Examples: `console.log('PostgresDriver: ', message)`, `console.trace('AppService: ', message)`