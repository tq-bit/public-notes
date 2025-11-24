---
description: Aktivierungsvorgang für das MessageLog Monitoring in der SAP cALM
public: true
published: true
tags:
  - integrationsuite
  - btp
  - calm
---
## Voraussetzungen
- Zugang zur cALM mit Rolle 'Integration Architect' in cALM
- Service-Key für Runtime Integration 'api' - Plan, siehe [[Bereitstellung von CPI Credentials]]

## Schrittweise Konfiguration

### Aktivierung der Integration
1. In SAP cALM App 'Landscape Management' öffnen
2. Hinzufügen des Systems über 'Bullet Point' Auswahl -> System ist initial Inaktives 'Cloud Integration' - Integration Suite System
3. Klick auf 'Add Endpoint' und Eingabe des Service Keys. 
   Wichtig: Service Key muss immer die folgenden Rollen haben:
	- MonitoringArtifactsDeploy
	- MonitoringDataRead
	- HealthCheckMonitoringDataRead
4. Klick auf Anlegen und prüfen, ob die 'Supported Use Cases' aktiviert werden

### Aktivierung der Monitor-Konfiguration
1. In SAP cALM App 'Integration & Exception Monitoring' öffnen
2. Filter Anpassen über 'Bullet Point' -> System ist initial inaktiv
3. Integration Suite hinzufügen, dann Klick auf 'Optionen' -> 'Edit Configuration'
4. Data Collection für den Tenant anstellen (Slider auf 'On')
5. Navigation in den Tenant und aktivieren von 'Sap Integration Suite Messages' & 'Artifact Integration Content'
6. Filter mit den Parametern einstellen und ggf. Events aktivieren

### Health Monitor
1. In SAP cALM App 'Health Monitoring'
2. Integration Suite hinzufügen
3. Ggf. Events mit den Thresholds aktivieren