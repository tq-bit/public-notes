---
description: Standardvorgehen bei Anlage von neuen Events im Event Mesh
tags:
  - sap
  - sap-list
  - sap-public-cloud
  - integrationsuite
public: true
published: true
---
## Voraussetzungen
Siehe [[Deployment von Event Mesh und Cloud Messaging]]

## Schrittweise Konfiguration
- [ ] **Konfiguration des Events in der Public Cloud**  
    Siehe [[Appnamen Integration Suite]]
    - Suche des relevanten Events auf [api.sap.com](https://api.sap.com/products/SAPS4HANACloud/events/events)
    - Öffnen der App und Hinzufügen des Events

- [ ] **Konfiguration im Event Mesh: Queue**
    - Neue Queue erstellen
    - Subskription auf das Event in der Public Cloud über das Topic

- [ ] **Konfiguration des Webhooks**
    - Neuen Webhook erstellen mit Quelle: Queue
    - Ziel-HTTP Endpunkt einstellen, ggf. Credentials hinterlegen
