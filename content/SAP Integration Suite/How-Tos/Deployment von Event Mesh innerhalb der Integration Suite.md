---
description: Standardvorgehen bei Deployment des Event Mesh in der Integration Suite
tags:
  - integrationsuite
  - development
  - sap-public-cloud
public: true
published: true
---
> [!hint] Alternatives Setup
> Bei dieser Event-Mesh Konfiguration handelt es sich um eine Alternative zum [[Deployment von Event Mesh & Cloud Messaging|Deployment von Event Mesh Clients in der BTP]]. Stattdessen werden Clients direkt in der Integration Suite angelegt und verwaltet.

## Voraussetzungen
- Zugang zum SAP BTP Cockpit und entsprechende Berechtigungen für Service-Instanziierung sowie Zugang zum S/4HANA System.
- [[Verbindung zwischen BTP und EPR herstellen]]
- [[Deployment von Event Mesh & Cloud Messaging im Subaccount ermöglichen]] (Besonderheit ist hierbei, dass der Service, der zu aktivieren ist, `SAP Integration Suite, Event Mesh` heißt)

## Schrittweise Konfiguration
### Aktivierung des Event Mesh in der Integration Suite
1. Im gewünschten BTP Subaccount -> Integration Suite Event Mesh aktivieren
2. Die notwendigen Rollen für den Event Mesh vergeben

### Deployment des Event Mesh Service im BTP Marketplace
1. Im SAP BTP Cockpit auf den gewünschten Subaccount wechseln
2. Service Marketplace öffnen
3. Event Mesh suchen und neue Instance erstellen
4. Instanz: `SAP Integration Suite, Event Mesh`
5. Verwendung der [[Event Mesh Config]] (nur `namespace` und `rules` verwenden)
6. Sobald erstellt, neuen Service Key erstellen und kopieren

### Aktivierung des notwendigen Kommunikationsszenarios
1. Login in den S4-Account, der Events an die Integration Suite senden soll
2. Kommunikationsvereinbarung `SAP_COM_0092` aktivieren und Service Key hinterlegen
3. Anschließend über [[Apps]] 'Bereitstellung von Unternehmens-/technischen Ereignissen prüfen, ob Kanal angelegt wurde'
4. Alles weitere kann konfiguriert werden wie bekannt

## Prozess
