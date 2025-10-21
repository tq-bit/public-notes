---
description: Herstellen einer Verbindung zwischen der BTP und einem S4HANA Public Cloud System mit Fokus auf Deployment von Cloud Event Messaging Services, z.B. Event Mesh und Cloud Messaging
public: true
published: true
tags:
  - integrationsuite
  - btp
  - cloudfoundry
---
## Symptome
- Für eine S4 Public Cloud Instanz können keine [[Deployment von Event Mesh & Cloud Messaging|Cloud Messaging oder Event Mesh]] Instanzen erstellt werden
- Es besteht keine Verbindung zwischen einem Public Cloud System und einer BTP Landschaft

## Voraussetzungen
- Zugang zum SAP BTP Cockpit
- Berechtigungen zur Verwaltung von Service-Assignments und Entity-Assignments im globalen Account

## Schrittweise Konfiguration

### System zur System Landscape hinzufügen
1. im BTP Cockpit auf den Global Account wechseln
2. Unter System Landscape zu Systems navigieren
3. Auf **Add** klicken
4. **Systemtyp = SAP S4/HANA Cloud** auswählen
5. **Systemname = Host, z.B. my123466.s4hana.cloud.sap** eintragen
6. Auswahl der notwendigen COM-Szenarien & warten, bis Token erzeugt wird
7. Im S4HANA Cloud System die App **SAP-BTP-Erweiterungen pflegen** öffnen
8. Hier das Token eintragen und warten, bis die Verbindung hergestellt wird

### Service-Entitlements aktivieren
1. Im BTP Cockpit auf den Global Account wechseln
2. Zu **Entity Assignments** navigieren
3. Subaccount oder Directory auswählen
4. Auf **Edit** → **Add Service Plans** klicken
5. **Event Mesh** auswählen 
6. Pläne `enterprise-messaging` wie `enterprise-messaging-hub` auswählen 
7. **SAP S4/HANA Cloud Extensibility** auswählen
8. Pläne nach Bedarf aktivieren, mindestens aber `messaging`

## Prozess
Hinweis: Automatisch per KI erstellt
```mermaid
sequenceDiagram
    actor Admin as Administrator
    participant BTP as BTP Cockpit
    participant GA as Global Account
    participant SL as System Landscape
    participant S4 as S/4HANA Cloud System
    participant EA as Entity Assignments
    participant SP as Service Plans
    participant EM as Event Mesh
    participant S4E as S/4HANA Cloud Extensibility

    Admin->>BTP: Zugang zum BTP Cockpit
    Admin->>GA: Zu Global Account wechseln
    
    rect rgb(250, 220, 200)
        Note over Admin,S4: System zur System Landscape hinzufügen
        Admin->>SL: Zu Systems navigieren
        Admin->>SL: Add klicken
        Admin->>SL: Systemtyp "SAP S4/HANA Cloud" auswählen
        Admin->>SL: Systemname eintragen (z.B. my123466.s4hana.cloud.sap)
        Admin->>SL: COM-Szenarien auswählen
        SL->>SL: Token wird erzeugt
        SL-->>Admin: Token bereitgestellt
        
        Admin->>S4: App "SAP-BTP-Erweiterungen pflegen" öffnen
        Admin->>S4: Token eintragen
        S4->>S4: Verbindung wird hergestellt
        S4-->>Admin: Verbindung erfolgreich
    end
    
    rect rgb(200, 220, 250)
        Note over Admin,EM: Event Mesh Entitlements aktivieren
        Admin->>EA: Zu Entity Assignments navigieren
        Admin->>EA: Subaccount oder Directory auswählen
        Admin->>EA: Edit → Add Service Plans klicken
        Admin->>SP: Event Mesh auswählen
        Admin->>EM: Plan "enterprise-messaging" auswählen
        Admin->>EM: Plan "enterprise-messaging-hub" auswählen
        EM-->>Admin: Event Mesh Pläne ausgewählt
    end
    
    rect rgb(220, 250, 200)
        Note over Admin,S4E: S/4HANA Cloud Extensibility aktivieren
        Admin->>SP: SAP S4/HANA Cloud Extensibility auswählen
        Admin->>S4E: Plan "messaging" (mindestens) auswählen
        Admin->>S4E: Weitere Pläne nach Bedarf aktivieren
        S4E-->>Admin: S/4HANA Pläne ausgewählt
    end
    
    Admin->>EA: Save klicken
    EA-->>Admin: Alle Entitlements aktiviert
    
    Note over Admin,S4E: Konfiguration abgeschlossen
```