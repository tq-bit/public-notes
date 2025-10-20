---
description: Schnell Integrationskonzepte erstellen
tags:
  - integrationsuite
  - workflow
  - konzept
public: true
published: true
---
## Symptome
- Neue Kundenanforderung
- Wenig bis keine Konzeptionierung
- Kein Mapping, keine weiteren Informationen

## Voraussetzungen
- Obsidian oder ein Markdown-fähiges Textprogramm
- Zugriff auf SAP Integration Suite (optional)
- Notwendige Berechtigungen in CPI (optional) 

## Schrittweise Konfiguration

### Erstellung einer Base
- Obsidian Base zur Nachverfolgung des aktuellen Status
- Übersicht und leichte Navigation bei Kundenfragen

### Better PDF Export
- Besonders nützlich, um einfach Spezifikationen zu exportieren
- Siehe [[Better PDF Export]] für Header / Footer

### Verwendung des Integrstions-Templates
- Template als Basis für Konzept und Dokumentation verwenden
- Siehe [[Konzeptionierung & Dokumentation von Integrationsszenarien]]

### Ordnerstruktur
In der Minimalausprägung

```
| /Home.md
| - /Ansprechpartner (Bei größeren Projekten)
| - /Assets
| - /Besprechungen
| - /Flows (Spezifikationen)
| - /Mappings (Optional, kann direkt in Flows gepflegt werden)
| - - /System1 (= System1 ist führendes System)
| - - /System2 (= System2 ist führendes System)
| - Prozesse (optional, falls notwendig)
| - Services & Customizing (z.B. Custom Fields, Komm-Scenarien)
| - - Kommunikationsszenarien
| - Tests (Bruno Collections)
| - Vorgaben (nur, falls Dev für System verantwortlich ist
| - - Architektur.md
| - - Meilensteine
| - - Namenskonventionen.md
| - - Retry Mechanismen.md
| - Work Files (Lose Daten, sonstiges)
```