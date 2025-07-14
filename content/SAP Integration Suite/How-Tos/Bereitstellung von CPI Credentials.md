---
description: Erstellung von Basic-Auth Credentials für HTTP-Endpunkte der CPI
public: true
published: true
tags:
  - integrationsuite
  - btp
  - cloudfoundry
---
- [ ] Falls noch nicht aktiviert: Im Global Account den Notwendigen Service aktivieren
	- [ ] Dazu klick auf "Entity Assignments"
	- [ ] Auswahl Subaccount / Directory
	- [ ] Klick auf Edit -> Add Service Plans
	- [ ] Auswahl **SAP Process Integration Runtime**
- [ ] Falls kein Zugriff auf die Cloud Foundry: Hinzufügen Mail als Org-Member
	- [ ] Entweder über den Owner beantragen
	- [ ] Oder sich selbst hinzufügen über **Instances and Subscriptions** -> Auswahl Environment -> Weitere Optionen -> Update -> Hier Email-Adresse hinzufügen
- [ ] Anschließend Klick auf **Create** -> Service -> **SAP Process Integration Runtime** -> Plan: **integration-flow**
- [ ] Instanz erstellen
- [ ] Klick auf Instanz
- [ ] Bei Service Keys auf **Create**
- [ ] ClientID und ClientSecret aus der JSON herauskopieren
- [ ] Als Basic Auth für den Aufruf des Endpunktes verwenden