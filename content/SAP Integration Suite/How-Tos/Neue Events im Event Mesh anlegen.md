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
Siehe [[Deployment von Event Mesh & Cloud Messaging]]

## Schrittweise Konfiguration
### Konfiguration des Events in der Public Cloud  
Nach der Anlage des Cloud Messaging Services können Events in Event Mesh empfangen werden. Jedes Event muss separat aktiviert werden. Siehe auch  [[Apps#Integration]] 

1. Suche des relevanten Events auf [api.sap.com](https://api.sap.com/products/SAPS4HANACloud/events/events)
2. Öffnen der App und Hinzufügen des Events in der App


### Konfiguration im Event Mesh: Queue
Mit Queues können bestimmte Topics aus dem Cloud Event Messaging ausgelesen - sich auf sie subscribed werden. Diese werden bei der Auslösung in die jeweilige Queue hinzugefügt, um weiter verarbeitet werden zu können.

 1. Neue Queue erstellen
2. Subskription auf das Event in der Public Cloud über das jeweilige Topic

### Konfiguration des Webhooks
1. Neuen Webhook erstellen mit Quelle: Queue
2. Ziel-HTTP Endpunkt einstellen, ggf. Credentials hinterlegen
3.  **Alternativ**: Subscription mit AMPQ-Adapter auf das jeweilige Topic aus der Integraiton Suite

## Beispiel für eine Event Subscription
Siehe auch [[Deployment von Event Mesh & Cloud Messaging]] und [[Cloud Enterprise Messaging]] für die Herleitung der Benamung der jeweiligen Subscription

```sh
# Voll Qualifizierter Subscription Name
sap/S4HANAOD/s4ce/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1

# Namespace des Event Mesh des Cloud Messaging Services
sap/S4HANAOD/s4ce

# Cloudevent / SAP / S4 System / Business Event Hub
ce/sap/s4/beh

# Typ des Events aus dem Event Mesh
businesspartner/v1/BusinessPartner/Changed/v1
```

## Prozess
Hinweis: Automatisch mit KI erstellt

```mermaid
sequenceDiagram
    actor Admin as Administrator
    participant API as api.sap.com
    participant PC as Public Cloud App
    participant EM as Event Mesh
    participant Queue as Queue
    participant WH as Webhook
    participant EP as HTTP Endpunkt
    participant IS as Integration Suite

    rect rgb(250, 220, 200)
        Note over Admin,PC: Event in Public Cloud aktivieren
        Admin->>API: Relevantes Event suchen
        API-->>Admin: Event gefunden
        Admin->>PC: App öffnen
        Admin->>PC: Event in App hinzufügen
        PC-->>Admin: Event aktiviert
    end
    
    rect rgb(200, 220, 250)
        Note over Admin,Queue: Queue konfigurieren
        Admin->>EM: Event Mesh öffnen
        Admin->>Queue: Neue Queue erstellen
        Admin->>Queue: Subskription auf Topic erstellen
        Queue->>PC: Subscribe auf Event Topic
        PC-->>Queue: Subskription aktiv
    end
    
    rect rgb(220, 250, 200)
        Note over Admin,EP: Webhook konfigurieren
        Admin->>WH: Neuen Webhook erstellen
        Admin->>WH: Quelle "Queue" auswählen
        Admin->>WH: Ziel-HTTP Endpunkt einstellen
        Admin->>WH: Credentials hinterlegen (optional)
        WH->>EP: Verbindung zum Endpunkt herstellen
        EP-->>WH: Webhook konfiguriert
    end
    
    alt Alternative: AMQP-Adapter
        rect rgb(250, 240, 220)
            Note over Admin,IS: Alternative Konfiguration
            Admin->>IS: Integration Suite öffnen
            Admin->>IS: AMQP-Adapter konfigurieren
            Admin->>IS: Subscription auf Topic erstellen
            IS->>Queue: Subscribe auf Topic
            Queue-->>IS: Subscription aktiv
        end
    end
    
    Note over PC,IS: Event-Verarbeitung konfiguriert

```