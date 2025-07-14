---
description: Annotations to make Capire services readonly and restrict access to specific roles
public: true
published:
---
Loosely extends [[Tickets app enhancements]]

Add this to an entity file with an `-auth` - prefix
```cs
using {
  TicketService.Protocol,
  TicketService.Tickets,
  TicketService.closeTicket
} from './ticket-service';

annotate Protocol with @readonly; // alternatively: @insertonly
annotate Tickets with @readonly;
annotate closeTicket with @(requires: 'authenticated-user');

annotate Tickets with @(restrict: [
  {
    grant: ['DELETE'],
    to   : 'admin',
    where: `state_ID = 5`
  },
  {
    grant: [
      'READ',
      'CREATE',
      'UPDATE'
    ],
    to   : 'admin'
  }
]);
```

In package.json file, add this:
```json
"cds": {
    "requires": {
      "auth": {
        "kind": "mocked",
        "users": {
          "admin": {
            "password": "admin",
            "roles": ["admin"]
          }
        }
      }
    }
  }
```