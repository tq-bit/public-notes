---
description: Template zur Skizzierung einer Integrationsdokumentation
---
Siehe auch [[Mermaid Templates]] für Beispiel zum Sequenzdiagramm & Beispiel für Architekturdiagramm, sofern notwendig. 

```markdown
---
Typ: REST-Schnittstelle | Integrationsprozess | ...
Requirement:
  - Links zur Aufgabe / zum Requirement
Deployed auf:
  - TEST
  - PROD
  - UAT
Quality Gate: Link zum Quality Gate
Abnahmepartei: Durch wen wurde abgenommen?
Abnahmedatum: Wann wurde abgenommen?
Beschreibung: Kurzbeschreibung (/Optional)
---
## 1. Übersicht Implementierung

### 1.1. Komponente Changelog
Changelog kann durch Versionierung auch als Teil des Artefakts gepflegt werden

| Datum      | Artefakt | Author | Version |
| ---------- | -------- | ------ | ------- |
| 01.12.2026 | iFlow    |        | 1.0.0   |
### 1.2. Komponente Zusammenfassung
Zusammenfassender Text, was die Schnittstelle tut, z.B. Übernahme von Text aus [[Template Integrationsszenario]]
### 1.3. Komponente Konfiguration

| Konfigurierbares Element     | Wert         | Aktiv Test | Aktiv Prod |
| ---------------------------- | ------------ | ---------- | ---------- |
| Kommunikationsvereinbarungen | SAP_COM_1234 |            |            |

## 2. Interfacebeschreibung

### 2.1. Komponente Quellsystem
**Mindestanforderungen, die beschrieben werden sollten, sind**:
- **Trigger**: Ausgelöst wird das Integrationsszenario durch ...
- **Datenselektion**: Daten werden selektiert auf Basis von ...

### 2.2. Komponente Verarbeitung
- **Zwischenendpunkt**: Endpunkt für Datenanreicherung
- **Datenanreicherung**: Zusätzliche Daten werden benötigt, wenn ...
- **Routing**: Falls Feld X den Wert Y hat, passiert ...

### 2.3. Komponente Robustheit
- **Fehlerbehandlung**: In Fällen von fehlerhaften Durchläufen passiert ...
- **Retry-Mechanismen**: z.B. Queues
- **Monitoring**: z.B. cALM, Custom Headers

### 2.4. Komponente Zielsystem
- **Endpunkt Zielsystem**: HTTP, TCP, FTP Endpunkt...
- **Authentifizierung**: Zielsystem hat Zielmechanismen ...

### 2.5. Komponente Sequenzflow
- Sequenzdiagramm o. Prozessdiagramm auf Basis von Mermaid o. Draw.io
- Siehe auch [[Mermaid Templates]]
\```mermaid
sequenceDiagram
    participant System1 as System1
    participant CPI as Integration Suite
    participant System2 as System2

    System1->>CPI: Event: Etwas ist passiert
\```

## 3. Datenmapping
Übernahme von Tabelle aus [[Template Integrationsszenario]]. Dokumentation über XPath, JSONPath oder vergleichbare Syntax. 

### 3.1. Komponente XPath

| Pfad System1   | Pfad System2 | Bemerkung | Beispielwert |
| -------------- | ------------ | --------- | ------------ |
| /Document/Path | /Text/Path   |           |              |

### 3.2. Komponente JSONPath

| Pfad System1    | Pfad System2 | Bemerkung | Beispielwert |
| --------------- | ------------ | --------- | ------------ |
| `Document.Path` | `Text.Path`  |           |              |

### 3.3. Komponente Tabelle zu JSON

| Tabelle System 1 | Feld System 1 | Feld System 2 | Bemerkung                | Beispielwert |
| ---------------- | ------------- | ------------- | ------------------------ | ------------ |
| `Tabellenname`   | `Feldname`    | `Text.Path`   | Anfangsbuchstabe capital | Abcde        |

```