---
description: Ausgehende und eingehende SOAP-Nachrichten Überprüfen
tags:
  - integrationsuite
  - development
  - sap-public-cloud
public: true
published: false
---
## Symptome
- Eingehende SOAP-Nachrichten werden nicht korrekt verbucht
- Ausgehende SOAP-Nachrichten werden nicht korrekt versendet

## Voraussetzungen
- Zugriff auf SAP Public Cloud System
- Berechtigung für die Apps 'Empfänger an Nutzer zuweisen' (Assign Recipients to Users) & 'Nachrichtendashboard' (Message Dashboard)
## Schrittweise Konfiguration

## Kanal an Nutzer zuweisen

1. App 'Assign Recipients to Users' im ERP
2. User neu Anlagen (Suche mit Nachname möglich)
3. Den jeweiligen Empfängerkanal auswählen, z.B: /CMDPR/CMD_PRODUCT für produktbezogene Nachrichten
4. Sichern und App Schließen
5. Dann App 'Message Dashboard' öffnen und den aktuellen Tag auswählen
6. Hier tauchen alle relevanten SOAP-Nachrichten im jeweiligen Namespace /CMDPR auf