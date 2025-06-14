---
description: Code snippets for common Typescript types and interfaces
public: true
published: true
tags:
  - development
  - design
  - typescript
---
## Partial
Makes all properties of a type optional

```ts
type Product = {
	id: string;
	name: string; 
	supplier: string;
}

// ID is optional
const updatedProduct: Partial<Product> = {
	name: "Salt",
	supplier: "The Saltworks"
}
```

## Required
Makes all properties of a type required

```ts
type Contact = {
	id: string;
	name: string; 
	address?: string;
}

const newContact: Required<Contact> = {
	id: "01",
	name: "Max",
	address: "Sample-Street 5"
}
```

## Readonly
Prevents values from this type to be reassigned

```ts
type ServerConfig = {
	endpoint: string
}

const config: Readonly<ServerConfig> = {
	endpoint: "http://sample.com"
}

config.endpoint = 'http://yoink.com' // throws an error
```

## Pick
Creates a new type from a subset of another interface / type

```ts
type User = {
	id: string; 
	name: string;
	email: string;
	address: {
		city: string;
		street: string;
		houseNumber: number
	}
}

type CreateuserDTO = Pick<User, "name" | "email">
```

## Omit
Creates a new type without a subset of another interface / type

```ts
type ClimatedBus = {
	name: string;
	model: string;
	climate: boolean;
}

type Bus = Omit<ClimatedBus, "climate">
```

## Record
Type with a set of properties and values. Useful to create dynamic objects or maps

```ts
type User = { 
	id: string; 
	name: string;
}

type UserHashmap = Record<string, User>

// Alternatively create the User type with a Record
type UserKeys = "id" | "name";
type UserRecord = Record<UserKeys, string>
```

## Parameters
Extracts the types of function arguments as a tuple

```ts
function greet(name: string, language: "DE" | "EN") {
	// ...
}

type greetArgs = Parameters<typeof greet>
```