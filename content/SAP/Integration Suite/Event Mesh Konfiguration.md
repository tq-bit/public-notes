---
description: Konfigurationsdetails zur Arbeit mit dem SAP Event Mesh
tags:
  - sap
  - sap-list
  - sap-public-cloud
  - integrationsuite
public: true
published: false
---

## Standardmäßiges Vorgehen für neue Events
Annahme: Es existiert bereits eine Verbindung zwischen dem Public Cloud System und der BTP
- [ ] Konfiguration des Events in der Public Cloud, siehe [[Appnamen Integration Suite]]
	- [ ] Suche des relevanten Events auf [api.sap.com](https://api.sap.com/products/SAPS4HANACloud/events/events)
	- [ ] Öffnen der App und Hinzufügen des Events
- [ ] Konfiguration im Event Mesh: Queue
	- [ ] Neue Queue erstellen
	- [ ] Subskription auf das Event in der Public Cloud über das Topic
- [ ] Konfiguration des Webhooks
	- [ ] Neuen Webhook erstellen mit Quelle: Queue
	- [ ] Ziel-HTTP Endpunkt einstellen, ggf. Credentials hinterlegen