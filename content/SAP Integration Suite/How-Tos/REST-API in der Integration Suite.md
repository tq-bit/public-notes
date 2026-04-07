---
description: Beschreibung und Hinweise, wie eine REST-API in der Integration Suite entwickelt werden kann.
public: true
published: true
tags:
  - integrationsuite
  - konzept
  - development
---
## Motivation
Die Integration Suite bietet mit den REST-API Artefakten die Möglichkeit, wiederverwendbare Schnittstellen zur Verfügung zu stellen. Diese Schnittstellen können, wie iFlows, für A2A Kommunikation- durch eine Kapselung hinter einen API-Proxy allerdings auch von Frontend-Clients verwendet werden. 

## Abgrenzung zu iFlows
Technisch betrachtet sind iFlows und REST-APIs ähnlich. Beide werden in der CPI-Runtime ausgeführt und verwenden dieselben - von Apache Camel bereitgestellten - Funktionalitäten. Die Unterschiede finden sich eher in den Implementierungsdetails

| Aspekt           | REST-API                                                          | iFlow                                                      |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| Zweck            | Definition eines API-Kontraktes                                   | Implementierung von Integrationslogik                      |
| Aufruf           | Synchron, Request-Response                                        | Synchron & Asynchron                                       |
| Consumer         | Frontends, Partner APIs                                           | Backends, Middleware, Queues, Schedulers                   |
| Wiederverwendung | Generisch                                                         | Spezifisch                                                 |
| Typische Pattern | Verwendet intern iFlows oder andere Backends zur Datenbeschaffung | iFlow wird über API, Events oder direkte Aufrufe gestartet |
Zusammenfassend empfiehlt sich die Verwendung von
- **REST-APIs** bei rigiden, synchronen und dynamischen Aufrufen
- **iFlows** bei prozessualen, asynchronen und spezifischen Aufrufen

> [!example] Beispiel REST-API
> **API zum Abruf von einer gesicherten Salesforce Schnittstelle. **
> - API definiert Query-Parameter, Ausgabeformat
> - API ist für Aufbau der SOQL Query zuständig
> - API kann von mehreren Clients verwendet werden (z.B. Monitor FE, Shop Backend)
> - API ist versionierbar und stabil

> [!example] Beispiel iFlow
> iFlow zur Anlage/Änderung eines neuen Kontaktes in HubSpot bei Anlage in SAP
> - iFlow definiert Eingabeformat (SOAP, JSON, CSV)
> - iFlow ist für Aufruf der HubSpot API zuständig
> - iFlow wird von SAP per SOAP aufgerufen
> - iFlow ändert sich, sobald sich min. eine der zugrundeliegenden APIs ODER der Integrationsprozess ändert

## Implementierung
In der Integration Suite muss zunächst ein neues  REST-API Artefakt angelegt werden. Dieses wird, wie ein iFlow, direkt über den Editor bedient und bildet einen vollständigen Request-Reply Zyklus ab

Die empfohlene Implementierung wie folgt
1. [[Parse Query Params|Parsing von Query Parametern]] (Skript)
2. [[Parse HTTP Path|Parsing des HTTP-Pfads]] (Skript)
3. optional: [[Write Custom Header Properties|Schreibe Custom Headers]] (Skript)
4. Lesen von eingehenden HTTP-Headern (Content-Modifier)
5. Geschäftslogik (Abruf Datenbank, OData, iFlows, ...)
6. Setzen von ausgehenden HTTP-Headern
7. Setzen des ausgehenden Payloads (Message Mapping auf Basis der OpenAPI Dokumentation)
8. Sofern notwendig: Implementierung eines API-Proxies mit Policies

## API Proxy
Diese Implementierung verwendet eine vereinfachte Version des API-Management, um API Keys zu erzeugen und per Policy zu mappen. Intern validiert die Integration Suite 

Hierzu können, nach Deployment des API-Proxy, die folgenden Policies verwendet werden. Natürlich ist es empfehlenswert, für API-Keys den Developer-Hub zu nutzen, dies ist aber nicht immer der Fall :)

1. [[Lese Header-Wert aus]] oder
2. [[Lese KVM aus]]
3. [[Vergleiche zwei Parameter]]
4. [[Auslösen eines Fehlers]]
5. [[Setzen eines Basic Auth Headers]]