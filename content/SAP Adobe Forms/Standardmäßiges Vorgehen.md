---
description: Arbeit mit Cloud Formularen
public: true
published: true
tags:
  - workflow
  - sap
  - sap-public-cloud
  - adobe-forms
---

## Workflow: Formularerstellung
Siehe auch [[Apps#Adobe Forms]] & [[Formularnamen]]

- [ ] App **Formularvorlagen Pflegen**: Kopie eines Standardformulars
- [ ] Download Formular, Bearbeitung, Upload
- [ ] App **Implementierungsaktivitäten**: Formular über Ausgabenverwaltung zuweisen `Einstellungen->Erweiterbarkeit->Ausgabenverwaltung->Formularvorl. zuordnen`
	Standardeintrag für das Formular kopieren und an YY1_ NS anpassen
- [ ] App **Ausgabeparameterfindung**: Aktivierung des Formulars im jeweiligen Geschäftskontext
- [ ] Optional App **Findungsregeln für Formularvorlagenmaster erstellen**: Regel für Findung des Folienmasters erstellen
- [ ] App **Softwarekollektion exportieren**: Transport aus Customizing in Test / Prod

## Workflow: Zusätzliche Felder aus OData Service
Beispiele für BAdI sind zu finden unter `/BAdI Code`, z.B.
- [[Auslesen von eigener Kundennummer bei Lieferant]]

- [ ] App **Benutzerdefinierte Felder**: Neues Feld für den Geschäftskontext des Formulars erstellen und freigeben. Dann Download neues Formular - dort ist Feld nun in Datenstruktur vorhanden
- [ ] App **Benutzerdefinierte Logik**: Geschäftskontext & BAdI für das Formular auswählen und neue Logik anlegen. Freigeben, dann im Code Editor bearbeiten

> [!info] Hinweis zum Debugging
> Custom Logic als BAdI kann im Eclipse gedebuggt werden. Der BAdI wird als eigene Klasse angelegt mit einem **KU** - Prefix



