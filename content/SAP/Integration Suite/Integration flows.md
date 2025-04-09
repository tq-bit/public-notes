---
description: Integration flows control data currents between systems.
public: true
published:
---
## CPI iFlows
Cloud Platform Integration (CPI) is a method of integrating a variety of systems together over the [[SAP Integration Suite]]. Flows are collections of nodes that perform integration operations together.
### Simple Expression Language
Camel brings a feature named **Simple Expression Language**, which can be used to parameterize *Exchange Parameters* of a message. It's scheme is as simple as a dollar-sign and a curly brace which surround the respective parameter: `${<param>}`

 It allows the combination with operators to produce boolean expressions and is therefor commonly used to access an exchange message's properties and use them for routing or calling OData services.

> [!Example] Dynamic OData call
> ```$select=ToHeader/CustomerID,ToHeader/CustomerName,ToHeader/DeliveryStatus&$expand=ToHeader&$filter=SalesOrderID eq '${property.SalesOrderID}' and ItemPosition eq '${property.ItemPosition}'```

SEL comes with several built-in variables. [Camel maintains a list of all these](https://camel.apache.org/components/4.8.x/languages/simple-language.html#_variables) but only a subset are available in SAP CPI:

| **Variable**                                  | **Description**                                                       |
| --------------------------------------------- | --------------------------------------------------------------------- |
| `id`                                          | The ID of the message                                                 |
| `exchangeId`                                  | The ID of the exchange                                                |
| `body`                                        | The payload of the input message                                      |
| `header.<name>`                               | The contents of the named header                                      |
| `property.<name>`                             | The contents of the named exchange property                           |
| `date:command:pattern`                        | Date and time formatting. [[Date handling in CPI\|More details]]      |
| `date-with-timezone:command:timezone:pattern` | Date and time formatting in a specific time zone (more details below) |
| `messageHistory`                              | The history of how this exchange was processed                        |
| `messageHistory(false)`                       | Similar to `messageHistory`, but without the contents of the exchange |
| `camelContext`                                | Provides access to the Apache Camel runtime                           |
| `exception.message`                           | The text of the current exception (or `null` if there's no exception) |
| `sysenv.name`                                 | The contents of the named environment variable                        |
It also supports operators, for example to route messages

```js
// Check for greater than properties
${property.MyNumericProperty} > '0'

// Check for substrings
${property.MyStringProperty} contains 'test'

// Check for regex
${property.ProductCode} regex '^[a-z]{5}\d{3}$'

// Work with arrays and maps
${property.MyList[0]}
${property.MyList[last-1]}
${property.MyMap[key]}
```

Find more examples on this [SAP blog article](https://community.sap.com/t5/technology-blogs-by-members/get-to-know-camel-s-simple-expression-language-in-sap-cloud-integration/ba-p/13292822)

### XPath
XPath is an expression language to target nodes inside an XML document. Simiar to **SEL**, it helps navigating through XML document nodes in a standardized manner.

> [!example] Demo webapp
> You can find a simulator for [XPath expressions here](https://tq-bit.github.io/xpath-editor/)

### Message Mapping
Message mapping is used to transform source data formats into target formats. SAP CPI includes several methods of implementing message mapping.

| **Mapping Type**       | **Description**                                                |
| ---------------------- | -------------------------------------------------------------- |
| [[Graphical Mapping]]  | Graphical mapping of source to data structures                 |
| [[Operation Mapping]]  | Operation Mappings imported from legacy SAP PO systems         |
| [[Script Mapping]]     | Script mapping is available using Groovy or Javascript scripts |
| [[XML Schemata (XSD)]] | Describes the structure and content of XML documents           |
| [[XSLT Mapping]]       | Used for more complex XML-based mapping requirements           |


## iFlow Components
iFlows consist of components and nodes. Components are **senders**, **receivers** and **lanes**. 
Nodes are process steps, such as **events**, **routing** or **changing the message content**. 

### Participants
Participants can also be [[Open Connectors]]

| **Name** | **Description**                   |
| -------- | --------------------------------- |
| Receiver | Recipient of the outbound message |
| Sender   | Sender of the inbound message     |
### Process 
| **Name**                  | **Description**                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Exception Sub-Process     | Handling of unexpected errors during flow execution. Started with a **Error Start Event**                                    |
| Integration Process       | A default cloud iFlow. Started with a variety of start events, such as **HTTP-In**, **Timer**                                |
| Local Integration Process | Sub-Processes that can be used to modularize process steps. Can be called by Integration Process using **Process Call** step |
### Event
| Name                                                                                                             | Description                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [(Message)End Event](https://help.sap.com/docs/cloud-integration/sap-cloud-integration/define-end-message-event) | Ends a message processing sequence                                                                                                               |
| [Error End Event](https://help.sap.com/docs/cloud-integration/sap-cloud-integration/define-error-configuration)  | Ends a message processing sequence and propagates errors to the main process. Usually used in **Exception Sub-Processes** to propagate the error |
| Error Start Event                                                                                                | Used at the beginning of an **Exception Sub-Process**. Can be configured to react to specific or all errors.                                     |
| Escalation Start Event                                                                                           | Terminates the process where is was called and propagates the error to the parent. **Does not interrupt the parent process**                     |
| Start Event                                                                                                      | Marks the beginning of a process. Commonly used in **Local Integration Processes**                                                               |
| Start Message                                                                                                    | Marks the beginning of an inbound message flow. Commonly used to start **Integration Processes** using SOAP, HTTP, TPC                           |
| Terminate Message                                                                                                | Stops the processing of a message and propagates status **Failed**                                                                               |
| Timer                                                                                                            | Marks the beginning of a timed process (Job / Schedule)                                                                                          |

### Mapping
See [[Integration flows#Message Mapping|Message Mapping]]

| Name              | Description                                                                                                                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID Mapping        | Generates a unique ID for a combination of source message ID and a provided context. This effectively marks messages as possible duplicates. [Example](https://help.sap.com/docs/cloud-integration/sap-cloud-integration/id-mapping-with-multicast) |
| Message Mapping   | Convert a message source data structure to a target structure using a mapping artifact                                                                                                                                                              |
| Operation Mapping | Legacy mapping from PI/PO                                                                                                                                                                                                                           |
| XSLT Mapping      | Transform more complex messages from one XML structure to another. Uses XSLT Schemata to work properly.                                                                                                                                             |

### Transformation
| Name             | Description                                                               |
| ---------------- | ------------------------------------------------------------------------- |
| Content Modifier | Set message header, properties or body to static or dynamic values        |
| Converters       | Convert between different message types, such as **JSON->XML, XML->CSV**  |
| Decoders         | Decode **Base64, GZIP, MIME Multipart and ZIP**                           |
| EDI Extractor    | Extract specific data elements from EDI documents                         |
| Encoder          | Encode **Base64, GZIP, MIME Multipart and ZIP**                           |
| Filter           | Filter out a particular set of nodes that does not match XPath expression |
| Message Digest   | Creates a hash value from the message payload and stores it in a header   |
| Script           | Executes **Groovy or Javascript** code on the message                     |
| XML Modifier     | Removes XML declarations, external DTD and invalid XML characters         |
### Call
| Name          | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| External Call | Call an external resource, with **Request Reply, Polling or Send** |
| Local Call    | Call an internal resource, such as a Sub Process                   |
### Message Routing
| Name       | Description                                                                               |
| ---------- | ----------------------------------------------------------------------------------------- |
| Aggregator | Combines a number of messages into a single XML message **over multiple flow executions** |
| Gather     | Collects messages from, multiple senders and combines then **within a set time window**   |
| Join       | Combines data **from parallel branches** in a single flow execution                       |
| Multicast  | Sends the same message to **one or more parallel branches**                               |
| Router     | Sends an **exclusive** message to one specific flow based on a condition                  |
| Splitter   | A collection of steps to **break down** message payloads **into multiple messages**       |
### Security
| Name      | Description                                        |
| --------- | -------------------------------------------------- |
| Decryptor | Decrypt data from inbound messages                 |
| Encryptor | Encrypt data for outbound messages                 |
| Signer    | Create a digital signature for an outbound message |
| Verifier  | Verify a digital signature from an inbound message |
### Persistence
| Name                  | Description                                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Data Store Operations | Execute CRUD operations on the tenant database. Default Temp Storage time is 30 days                                   |
| Persist               | Stores the entire message in the tenant database. Stored messages are accessible using the Cloud Integration OData API |
| Write Variable        | Store variables for longer-term use. Accessible under "Manage Stores->Variables'                                       |
### Validators
| Name          | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| EDI Validator | Validates an inbound EDI message against multiple defined schema |
| XML Validator | Validates an inbound XML message against a defined XML schema    |
## Data types
| **Name**       | **Description**               | **Expression**                     |
| -------------- | ----------------------------- | ---------------------------------- |
| String         | Text data                     | java.lang.String                   |
| Boolean        | True/false values             | java.lang.Boolean                  |

