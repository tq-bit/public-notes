---
description: Javascript code boilerplate to extract values from nested JSON
tags:
  - integrationsuite
  - cpi-code
  - cpi-javascript
public: true
published: true
---
Dieser Code ist für die Rhino-Engine optimiert. Optimalerweise sollte der optional-chaining Operator verwendet werden.

```javascript
const nestedUserData = {
    user: {
        name: 'John Doe',
        age: 30,
        address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345'
        }
    }
};

function getNestedValues(object, paths) {
    return paths.map(path => getNestedValue(object, path));
}

function getNestedValue(object, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key]) || undefined, object);
}

const [street, city] = getNestedValues(nestedUserData, ['user.address.street', 'user.address.city']);

console.log(street); // Output: 123 Main St
console.log(city); // Output: Anytown
```