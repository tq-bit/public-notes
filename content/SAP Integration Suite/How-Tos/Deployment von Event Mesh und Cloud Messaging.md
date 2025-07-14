---
description: Standardvorgehen bei Deployment des Event Mesh in der Cloud Foundry
tags:
  - integrationsuite
  - development
  - sap-public-cloud
public: true
published: true
---
- [ ] Erstellung der Event-Mesh Subscription im BTP Marketplace
- [ ] Erstellung des Event-Mesh Services unter 'Instances and Subscriptions'
	- Create -> Event-Mesh (enterprise messaging)
	- Auswahl: Instances -> Default
	- Auswahl RTE, Space & Name
	- Konfiguration nach [[Event Mesh Config|diesem Beispiel]]
- [ ] Erstellung des Cloud Messaging Serivces
	- Anlage des S4 Systems im Global Account über Service Token 
	  ( System Landscape -> Systems -> Add System)
	- Get Token -> Alle Kommunikationsszenarien
	- In S4-System, App **SAP-BTP-Erweiterungen pflegen** -> Token einfügen
	- Dann in S4-System -> Sicherstellen, dass **SAP_COM_0092** bzw. dessen Scope aktiviert ist
	- Dann in BTP Subaccount -> **s4-hana-cloud**-**messaging** deployen
	- Dabei auf Event-Mesh Konfiguration achten und den entsprechenden Namespace vergeben. [[Cloud Enterprise Messaging|Beispielkonfiguration]]