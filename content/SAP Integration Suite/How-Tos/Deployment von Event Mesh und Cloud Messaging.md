---
description: Standardvorgehen bei Deployment des Event Mesh in der Cloud Foundry
tags:
  - integrationsuite
  - development
  - sap-public-cloud
public: true
published: true
---
## 1. Event Mesh Subscription im BTP Marketplace anlegen

1. Im SAP BTP Cockpit auf den gewünschten Subaccount wechseln.
2. Öffne den **Service Marketplace**.
3. Suche nach **Event Mesh** und erstelle eine neue Subscription.
4. Navigiere unter **Instances and Subscriptions** zum Event Mesh Service.
    - Wähle: **Create** → **Event Mesh (Enterprise Messaging)**
    - Instanzdetails festlegen:
        - **Instance-Plan:** Default
        - **Region/Space:** Nach Vorgabe wählen
        - **Name:** Eindeutigen Namen vergeben
    - Konfiguration nach [[Event Mesh Config|diesem Beispiel]] vornehmen.

## 2. Cloud Messaging Service instanziieren
1. Unter **Service Marketplace** den **Cloud Messaging Service** auswählen und eine Instanz erzeugen.
2. Im **Global Account** das S/4 System über einen Service Token anlegen:
    - **System Landscape** → **Systems** → **Add System**
    - Token generieren: **Get Token** (alle Kommunikationsszenarien auswählen)
        

## 3. Integration im S/4HANA System
1. Im S/4 System die App **SAP-BTP-Erweiterungen pflegen** öffnen.
2. Den generierten Service Token einfügen.    
3. Sicherstellen, dass die Kommunikationsszenarien **SAP_COM_0092** (oder das relevante Scope) im System aktiviert ist.

## 4. Deployment im BTP Subaccount
1. Im gewünschten BTP Subaccount den Service **s4-hana-cloud-messaging** deployen.
2. Bei der Konfiguration:
    - Passenden Namespace gemäß Event Mesh Vergabe hinterlegen.
    - [[Cloud Enterprise Messaging|Beispielkonfiguration]] für Cloud Enterprise Messaging beachten.