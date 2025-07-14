---
title: SAP Capire Overview
public: true
published:
---
> [!note] 
> This content is AI generated (for now).

> [!example]
>  You can find a full walkthrough into quickly creating a CDS service [[Tickets app walkthrough|here]]


SAP Capire, also known as the SAP Cloud Application Programming Model (CAP), is a framework designed to accelerate the development of enterprise-grade services and applications[2](https://cap.cloud.sap/docs/about/). It provides developers with a set of languages, libraries, and tools that follow best practices for building cloud-native applications.

## Core Concepts

## Service-Centric Paradigm

CAP applications are built around services defined in CDS (Core Data Services) models[4](https://cap.cloud.sap/docs/guides/providing-services). These services encapsulate the behavioral aspects of a domain, including exposed entities, actions, and events.

## Event-Driven Architecture

CAP uses a ubiquitous event model, treating both synchronous API requests and asynchronous event messages uniformly[4](https://cap.cloud.sap/docs/guides/providing-services). This approach simplifies the handling of various types of interactions within the application.

## Domain Modeling

Developers start by capturing essential domain objects in a domain model using CDS[1](https://cap.cloud.sap/docs/guides/). This allows for a clear representation of the application's data structure and relationships. 

## Key Features

## Automatic Request Handling

CAP provides generic implementations for many common tasks, reducing boilerplate code and accelerating development[2](https://cap.cloud.sap/docs/about/). This includes features like:

- Implicit pagination
- Input validation
- Authentication and authorization
- Localization and internationalization
- Concurrency control

## Database Support

Out-of-the-box support is provided for various databases, including SAP HANA, SQLite, H2 (Java only), and PostgreSQL[1](https://cap.cloud.sap/docs/guides/).

## Multitenancy

CAP offers built-in support for developing multitenant applications, which is crucial for SaaS solutions[1](https://cap.cloud.sap/docs/guides/).

## Extensibility

The framework provides intrinsic capabilities for extending applications in verticalization and customization scenarios[1](https://cap.cloud.sap/docs/guides/).

## Development Workflow

1. **Project Initialization**: Developers can quickly start a new project using CAP's tools[5](https://cap.cloud.sap/docs/java/getting-started).
2. **Domain Modeling**: Define the data model using CDS language[1](https://cap.cloud.sap/docs/guides/).
3. **Service Definition**: Create services that expose the domain model, often as projections or views[4](https://cap.cloud.sap/docs/guides/providing-services).
4. **Implementation**: Add custom logic to service handlers as needed[4](https://cap.cloud.sap/docs/guides/providing-services).
5. **Testing**: Utilize CAP's support for local development and testing, including mocks for platform features[4](https://cap.cloud.sap/docs/about/).
6. **Deployment**: Deploy the application to various environments, with easy configuration changes for production settings[1](https://cap.cloud.sap/docs/guides/).

## Language Support

CAP provides support for both Node.js and Java development:

- **Node.js**: Offers a comprehensive SDK for building CAP applications[5](https://cap.cloud.sap/docs/java/getting-started).
- **Java**: The CAP Java SDK enables Java developers to build CAP applications, integrating well with Spring Boot[5](https://cap.cloud.sap/docs/java/getting-started).

## Integration and Extensibility

CAP facilitates integration scenarios by allowing developers to import APIs from other systems (e.g., SAP S/4HANA) and run local mocks[2](https://cap.cloud.sap/docs/about/). It also supports consuming remote services through a unified API[6](https://cap.cloud.sap/docs/guides/using-services).

## Conclusion

SAP Capire (CAP) empowers developers to build robust, scalable, and maintainable enterprise applications with reduced complexity. By providing a comprehensive framework that handles many common tasks automatically, CAP allows developers to focus on business logic and domain-specific requirements, significantly accelerating the development process.