---
description: Erstellung von Basic-Auth Credentials für HTTP-Endpunkte der CPI
public: true
published: true
tags:
  - integrationsuite
  - btp
  - cloudfoundry
---
## Zielsetzung

Bereitstellung und Freischaltung des **SAP Process Integration Runtime Service** im SAP BTP Global Account sowie die Generierung der Authentifizierungsdaten für den API-Zugriff.

## Voraussetzungen
- Berechtigungen zur Verwaltung von **Service-Entitlements** und **Subscriptions** im SAP BTP Global Account
- Zugang zum SAP BTP Cockpit
- E-Mail-Adresse des Nutzers für Cloud Foundry Berechtigungen

## Schrittweise Umsetzung

### 1. Service-Entitlement aktivieren

1. Im BTP Cockpit auf den Global Account wechseln.
2. Zu **Entity Assignments** navigieren.
3. **Subaccount** oder **Directory** auswählen.
4. Auf **Edit** → **Add Service Plans** klicken.
5. **SAP Process Integration Runtime** auswählen.

### 2. Zugriff auf Cloud Foundry Umgebung sicherstellen
1. Falls kein Zugriff besteht:
   - Die eigene **E-Mail-Adresse als Org-Member** hinzufügen
   - Entweder den **Owner** kontaktieren oder
   - Selbst hinzufügen über **Instances and Subscriptions** → entsprechendes **Environment** auswählen → **Weitere Optionen** → **Update** → E-Mail-Adresse hinzufügen

### 3. Service-Instanz anlegen
1. Auf **Create** klicken, **Service** → **SAP Process Integration Runtime** auswählen
2. **Plan:** `integration-flow` auswählen
3. Instanz erstellen

### 4. Service Key generieren
1. Service-Instanz öffnen
2. Zu **Service Keys** navigieren und **Create** anklicken
3. **ClientID** und **ClientSecret** aus der bereitgestellten JSON kopieren

   > **Validierung:**  
   Dies ist die empfohlene Methode für den Zugriff auf APIs via Service Key.

### 5. Basic Auth für API-Endpunkt
1. Die kopierte **ClientID** und das **ClientSecret** für Basic Auth beim API-Aufruf verwenden

## Hinweise
- Passwörter und Service Keys niemals ungesichert weitergeben oder speichern.
- Berechtigungen regelmäßig überprüfen, nicht mehr benötigte Zugänge entfernen.
- Unternehmensrichtlinien für Sicherheit und Compliance beachten.