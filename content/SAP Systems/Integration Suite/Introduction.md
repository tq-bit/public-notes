---
description: General information about SAP Integration Suite and iPaaS
public: true
published: false
---

## SAP Integration Suite
### API First Approach
The API first approach treats application interfaces as first-class citizens. Everything revolves around the end product being universally usable by clients or other consumers.

- Software components that are developed in such a way are called **API Providers**. 
- Software components that use these providers are called **API Consumers**
- API Providers used by API Consumers are called **Services**

### REST API vs. SOAP API
|                       | SOAP                           | REST                                |
| --------------------- | ------------------------------ | ----------------------------------- |
| Data format           | XML                            | XML, JSON, HTML, ...                |
| Statefulness          | Stateful OR Stateless          | Stateless only                      |
| Implementation        | Protocol with strict standards | Architectural style with guidelines |
| Description languages | **WSDL**                       | **RAML, OpenAPI**                   |

### Implementation vs. Contract
There are two different styles of designing a service: 
1. **Implement first** and **generate** the API later automatically
2. **Design the API first** and **implement** according to its description

### Clean Core Approach
A 'core' as the foundation of corporate IT refers to six dimensions that are illustrated below

| Dimension          | Description                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| **Software stack** | Versions of standard software in use                                       |
| **Extensibility**  | Added functionality or customization to standard software stack            |
| **Integrations**   | Communication between Software Stack and Extensibility                     |
| **Processes**      | A series of steps taken within the system that lead to a desirable outcome |
| **Operations**     | Governance, policies, compliance and activities in the system              |
| **Data**           | Configuration data ; Master data ; Transactional data                      |

The **Clean Core Approach** now aims to implement these six elements using exclusively standardized guidelines for all its elements. 

Criteria for clean core are: 

> [!success] Software stack
> - Software version close to latest release and latest feature pack
> - Partner solutions are clean core compliant

> [!success] Extensibility
> - Upgrade-stable extensions
> - Only actively-used and well-documented extensions are deployed
> - Only code quality standard adhering extensions are deployed
> - Extensions to not duplicate standard functions

> [!success] Integrations
> - Upgrade-stable interfaces
> - Proper monitoring and error resolution capabilities
> - Only actively-used and well-documented integrations are deployed

> [!success] Data
> - Complete, correct and relevant data are maintained
> - Only data that is actually used is maintained, otherwise scrapped

> [!success] Processes
> - Only consistent and efficient processes are maintained
> - SAP best practices are leveraged and implemented

> [!success] Operations
> - Day-to-day operations are planned and executed regulary
> - Opt-in on life-cycle-events, such as periodic upgrades
> - Compliance with pre-approved maintenance windows

### Common uses of metadata in XML
Metadata are commonly used to provide descriptive, structural, administrative, technical or processing-relevant information to an XML file. Metadata in OData services are accessible by addressing the `$metadata` function of the respective service URL.

### Operating Modes
There are two primary operating modes: **Request-driven** and **Event-driven** architectures

While **Request-driven** architectures is based on *direct communication* between a consumer and a provider, **Event-driven** architectures are handled *asynchronously*. 

The pattern of Event-driven architecture (EDA) always involves pushing a message to an event mesh (or queue). Based on the Mesh's implementations, consumers can either 
- **pull** events by **subscribing beforehand** or 
- have events **pushed** to them by **exposing a dedicated interface**

### REST APIs and OData
REST architectures follow six guiding contraints: 
- **Client-server architecture** - there's always a provider and a consumer
- **Statelessness** - a request and response always includes all relevant information to be fulfilled and makes no assumptions about sender or receiver
- **Cache-ability** - requests and responses can be cached for several consumers
- **Layered system** - implementations includes HTTP-routes, controllers, integrations and data-services
- **Code on demand** - consumer code can be generated based on the description of a REST API
- **Uniform interface** - each entity in the REST system can be accessed in a similar manner

OData extends the REST architecture by adding additional architectural constraints: 
- Each resource must be identifiable by its URI
- Each resource is extended by a fixed service- and a metadata document that describe it
- Resources can be operated on and queried in a default banner using OData queries, parameters and operations

> Resources are commonly described as entities. Service documents list entity sets, as well as functions and singletons. Metadata documents describe entities and its types, sets, functions and actions.

### SAP Graph
SAP Graph is based on OData v4. It's commonly used for very specific queries that would usually require several single HTTP requests. SAP Graph can be implemented using the Node.js or a low-code solution via. API management in the Integration Suite.

## Questions
1. Conigure VHost alias under Settings->Integrations->Configure
2. EDA is a software **pattern** where apps **publish/subscribe to events** using a broker, providing **decoupling** and **async communication**
3. API-first approach supports overcoming heterogeneity and complex solutions
4. Main capabilities of SAP Integration suite are 
	1. Extending Non-SAP connectivity
	2. Design, develop and manage APIs
	3. Design, develop and operate integration scenarios
5. EDA supports pull and push mechanisms
6. REST is characterized by 
	1. Statelessness
	2. Client-Server architecture
	3. Caching
7. Metadata in XML provides context, structure and control over XML documents
8. Commonly used HTTP methods are GET, POST, PATCH, DELETE
9. Clean core is characterized by Software Stack, Extensibility, Integrations

## iPaaS
### SAP's integration strategy
1. **Predefined integration** of end-to-end processes using prebuilt integrations in SAP Business Accelerator Hub
2. **Open integration** of third-party integrations and custom extensions
3. **Holistic integration** that covers most of integration required in cloud and hybrid landscapes
4. **AI-driven integration** that uses AI to simplify development of integration scenarios

### Integration Suite capabilities
1. **Integration assessment** using the [[_SAP ISA-M|ISA-Methodology]] and the latest integration technology
2. **Cloud integration** using prebuilt integrations and modern technologies
3. **API management** by standardizing, safeguarding and releasing APIs in a consistent manner
4. **Integration Advisor** that accelerates building integrations, mappings and monitoring solutions
5. **Trading partner management** streamlines partner management and helps creating and maintaining business partner relationships and data exchange
6. **Open Connectors** to quickly connect to third party cloud apps and quick conversion of data from one system to another
7. **Event Mesh** to quickly respond to state changes in core systems
8. **SAP Graph** for a unified access to SAP-managed data
