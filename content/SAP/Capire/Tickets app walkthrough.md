---
description: Quickstart setup for capire development including two services
public: true
published:
---
## Step 1: Setup development environment locally (optional)

- Install VSCode and Node.js
- Install 'SAP Fiori Tools' extension from VSCode Marketplace
- Install 'REST Client' extension from VSCode Marketplace
- Install Node package `@sap/cds-dk` globally

```sh
npm i -g @sap/cds-dk
```

## Step 2: Initialize the project

- Run command `cds init`
- Run command `npm install`

## Step 3: Add the schema file and create mock data

- In `db`, create `schema.cds` file
- Add `ticket` and `state` entities into it

```cs
namespace com.cpro.tickets;

using {
  cuid,
  managed,
  sap.common.CodeList
} from '@sap/cds/common';

entity Tickets : cuid, managed {
  title       : String(255)          @mandatory;
  description : String(1024)         @mandatory;
  state       : Association to State;
  solvedAt    : Timestamp;
  closedAt    : Timestamp;
}

entity State : CodeList {
  key ID    : Integer;
      name  : localized String(255);
      descr : localized String(1000);
}
```

- Run `cds add data` to create mock data templates
- Fill `Ticket` template with data

```
1,Login Issue,User unable to access account,3,2024-12-01 14:30:00,2024-12-01 15:00:00,2024-11-30 09:15:00,john.doe@example.com,2024-12-01 15:00:00,jane.smith@example.com
2,Server Down,Main application server not responding,1,2024-12-01 14:30:00,2024-12-01 15:00:00,2024-11-30 09:15:00,alice.johnson@example.com,2024-12-02 07:30:00,bob.wilson@example.com
3,Data Sync Error,Customer data not syncing with mobile app,2,2024-12-02 11:45:00,,2024-12-01 16:20:00,emma.brown@example.com,2024-12-02 11:45:00,emma.brown@example.com
4,Payment Gateway Failure,Transactions not processing,4,2024-12-01 14:30:00,2024-12-01 15:00:00,2024-11-30 09:15:00,charlie.davis@example.com,2024-12-02 06:45:00,david.miller@example.com
5,UI Bug,Button misaligned on homepage,2,2024-12-01 18:00:00,2024-12-01 18:30:00,2024-11-29 14:00:00,frank.thomas@example.com,2024-12-01 18:30:00,grace.lee@example.com
```

- fill `State` template with data

```csv
0,cancelled,
1,open,
2,working,
3,finished,
4,closed,
5,confirmed,
```

- Fil `State.texts` template with i18n data

```csv
de,0,Abgebrochen,
de,1,Offen,
de,2,In Arbeit,
de,3,Abgeschlossen,
de,4,Geschlossen,
de,5,Bestätigt,
```

## Step 4: Add the ticket service

- Create `ticket-service.cds` file in `srv` folder
- Add the following content to expose this service

```cs
using com.cpro.tickets as db from '../db/schema';

service TicketService @(path: '/tickets') {
  entity Tickets  as projection on db.Tickets;

  // This also enables creation of new tickets in the
  // Fiori Elements app
  annotate Tickets with @odata.draft.enabled;
}
```

- Create `ticket-service.js` file in `srv` folder
- Add the following content to extend the default service

```js
const cds = require("@sap/cds")

class TicketService extends cds.ApplicationService {
  async init() {
    const {Tickets} = this.entities

    this.before('CREATE', Tickets, (req) => {
      req.data.state_ID = 1;
    })

    this.after("READ", Tickets, (results) => {
      results.forEach(result => {
        result.message = result.title + " - " + result.description
      })
    })

    return super.init();
  }
}

module.exports = TicketService
```

## Step 5: Test the service

- Run command `cds watch`
- Open `http://localhost:3000/tickets` in your browser
- Create new file in `test` -> `ticket.http`
- Add the following content to test the API

```sh
POST http://localhost:4004/tickets/Tickets
Content-Type: application/json

{
  "title": "My title",
  "description": "My description"
}

###

GET http://localhost:4004/tickets/Tickets
```