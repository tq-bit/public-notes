---
description: Code to extend the ticket starter template with further features
public: true
published:
---
Loosely based on [[Tickets app walkthrough]]

This file aims to enhance the tickets app by using a new entity named protocols, which can be appended to tickets, and highlight **CDS Associations**. 

It replaces the class-based approach to extending a CDS service by using a function-based approach and shows how to handle HTTP errors gracefully.

On top of that, it implements custom functions to create and close tickets.
## Schema file
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
  state       : Association to State @mandatory;
  solvedAt    : Timestamp;
  closedAt    : Timestamp;
  protocol    : Association to many Protocol
                  on protocol.ticket = $self;
}

entity Protocol : cuid, managed {
  title       : String(255)  @mandatory;
  description : String(1024) @mandatory;
  ticket      : Association to Tickets  @mandatory  @assert.target;
}

// Extend a ticket with protocol entries
// extend Tickets with {
//   Protocol: Composition of many Protocol on Protocol.ticket = $self;
// }

// Extend Tickets with timestamps
aspect ManagedObject {
  createdAt  : Timestamp    @cds.on.insert: $now   @odata.etag;
  modifiedAt : Timestamp    @cds.on.insert: $now   @cds.on.update: $now  @odata.etag;
  createdBy  : String(100)  @cds.on.insert: $user;
  modifiedBy : String(100)  @cds.on.insert: $user  @cds.on.update: $user;
}

// Alternatively, 'managed' aspect can be used to create
// 'createdAt', 'createdBy', 'modifiedAt', 'modifiedBy'
// fields automatically

// Code lists are predefined key-value pairs that offer a comprehensive
// way to ensure input values are in a predefined set of values
// Node: Header = 'sap-locale={language}'
entity State : CodeList {
  key ID    : Integer;
      name  : localized String(255);
      descr : localized String(1000);
}
```

## Service.js file
```javascript
const cds = require("@sap/cds");

class TicketSerivce extends cds.ApplicationService {
  init() {
    const { Tickets } = this.entities;

    // Action /tickets/closeTicket
    // On how to implement queries, see
    // https://cap.cloud.sap/docs/node.js/core-services#rest-style-api
    this.on('closeTicket', async (req) => {
      const { ticketId } = req.data;

      // Use this.read for automatic error messages
      // const ticket = await this.read(Tickets).where({ ID: ticketId });

      // Use SELECT for custom error messages
      const ticket = await cds.ql.SELECT.one.from(Tickets).where({ ID: ticketId });
      if (!ticket) {
        return req.error(404, 'TICKET_NOT_FOUND', [ticketId])
      }
      await this.update(Tickets).with({ state_ID: 5 }).where({ ID: ticketId });

      // Alternatively, construct a query and run it
      // const query = UPDATE.entity(Tickets).where({ ID: ticketId }).set({ state_ID: 5 });
      // await cds.db.run(query)

      return { ticketId, Tickets }
    });

    // Action /tickets/createTicket
    // Describes a custom action to create a ticket
    this.on('createTicket', async (req) => {
      const { title, description } = req.data;
      await cds.ql.INSERT.into(Tickets).entries({ title, description, state_ID: 1 });
      return { title, description }
    })

    this.after('READ', Tickets, (results) => {
      results.forEach(result => {
        // Change the result title whenever the service is read
        result.title = `${result.state_ID}: ${result.title.toUpperCase()}`
      })
    })

    return super.init();
  }
}

module.exports = TicketSerivce;
```

## Service.cds file:
```cs
using com.cpro.tickets as db from '../db/schema';

service TicketService @(path: '/tickets') {
  entity Tickets  as projection on db.Tickets;
  entity Protocol as projection on db.Protocol;


  action closeTicket(ticketId : db.Tickets:ID)                                        returns {
    ID : db.Tickets:ID;
    state : db.Tickets:state;
  };


  action createTicket(title : db.Tickets:title, description : db.Tickets:description) returns {
    ID : db.Tickets:ID;
  };
}
```