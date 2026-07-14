---
description: Lose Sammlung von Konfigurationen in SAP BTP
---
## Aktivierung Destination für SAP Build Process Automate

Wert = true - damit wird die SAP Destination innerhalb von SAP Build erreichbar.

```
sap.processautomation.enabled
```

## Allgemein für SAP Build

### 1. Kommunikationsvereinbarung

1. COM-Vereinbarung anlegen
2. User & PW notieren

### 2. Destination anlegen
 Anlegen mir folgenden Additional properties
 - HTML5.DynamicDestination: true
 -  AppgyverEnabled: true
 -  WebIDEEnabled: true
 -  sap-client: 100
 - sapBuildEnabled: true
 -  WebIDEUsage: odata_gen

Speichern

### 3. In SAP Build

1. Neue App erstellen
2. In Integrations → Data Entities
3. Dort die Destination auswählen
4. Dann jeweils die Entitäten aktivieren