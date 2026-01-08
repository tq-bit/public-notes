---
description: Template zur Skizzierung eines Integrationsprozesses
tags:
  - template
  - integrationsuite
---
Siehe auch [[Mermaid Templates]] für Beispiel zum Sequenzdiagramm & Beispiel für Architekturdiagramm, sofern notwendig. 

```markdown
---
Letztes Update: 2025-10-20
Aktueller Status: Das hier ist der aktuelle Status
Transportiert:
Verbindung: System1-System2
Typ: Integrationsprozess | REST API
Quellen:
  - User Story 1
  - Spezifikation 2
  - cALM Ticket 3
---

Kurze Zusammenfassung

## 1. Übersicht Implementierung

> Testitem: 12345

> [!warning] Notwendige Felder im System1
> Beispieltext

### 1.1. System1 an System2

| Konfigurierbares Element | Konfigurierter Wert                        | ERP | IS  |
| ------------------------ | ------------------------------------------ | --- | --- |
| Pfad Integration Suite   | `/EquipmentToSystem1`                           |     | X   |
| Kommunikationsszenario   | SAP_COM_0395 ([[Kommunikationsszenarien]]) | X   |     |
| Event                    | Beispielevent                              | X   | X   |



### 1.2. System2 an System1
Nicht vorgesehen.

## 2. Mappings

### 2.1. Quelle An Ziel

#### 2.1.1. Zu füllende Felder

| Pfad System1 | Pfad System2 | Bemerkung | Beispielwert |
| -------------- | -------------- | --------- | ------------ |

#### 2.1.2 Sonstige Felder und Systemfelder

| Pfad System1 | Pfad System2 | Bemerkung |
| -------------- | -------------- | --------- |

### 2.2. System2 an System1
Nicht vorgesehen, Verbindung ist Unilateral

## 3. Sequenz Flow

```mermaid
sequenceDiagram
    participant System1 System1
    participant CPI as Integration Suite
    participant System2 as System2

    System1->>CPI: Event: Etwas ist passiert
/```

## 4. Checkliste Cutover
- [ ] Aufgabe 1
```