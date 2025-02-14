---
description: Descriptions on how to work with Adobe Forms - Public Cloud Systems
public: true
published: true
---
> Erweiterung von [[Adobe Forms - On Premise]]
> Vieles, was On Premise gilt, gilt auch in der Cloud

## Unterschiede zu On-Premise
- Datenbereitstellung über OData
- Gibt keine Druckprogramme mehr, nur den Client & OData Services
- Grafischer Editor wird standalone verwendet
- Übersetzung funktoniert mit integrierten Cloud Apps
- Datenhandling für Formulare wird komplett über XML abgebildet
- Gibt zwar auch hier Master- und Detailansicht, diese werden aber über unterschiedliche OData Services bedient
- Pflege von einzelnen Feldern nicht ohne weiteres möglich
- Erstellung von Formularen auf eigenen Daten ohne Prozesshintergrund auch nicht ohne weiteres möglich

## Relevante Apps

| App                                                | Beschreibung                        |
| -------------------------------------------------- | ----------------------------------- |
| Formularvorlagen Pflegen                           | Einstieg in die Formularbearbeitung |
| Implementierungsaktivitäten (Manage your solution) | Pflege von Formular zu Workflow     |
| Logos Verwalten                                    | Upload von Logos                    |
| Texte Verwalten                                    | Pflege von Textbausteinen           |
| Softwarekollektion Exportieren                     | Transport von Adobe Forms           |

## Workflow
1. Kopie eines Standardformulars
2. Download des Formulars
3. Bearbeitung & Upload
4. Formular zuweisen über Ausgabenverwaltung in **Implementierungsaktivitäten**:
   `Einstellungen -> Erweiterbarkeit -> Ausgabenverwaltung`
   `->Formularvorlagen zuordnen` 
   Auswahl des Standardeintrags -> Kopieren als -> Auswahl Vorlage
5. Auswahl Customizingauftrag in **Softwarekollektion exportieren**, um in Prod zu transportieren
6. Hier wird in der Ausgabe noch der Standard-Folienmaster angezeigt. Dies kann über **Findungsregeln für Formularvorlagenmaster erstellen** geändert werden
7. Neue Regel erstellen über eingabe ID, Regelpriorität, Auswahl Masterformularvorlage
8. Wieder Transport über Customizing
9. Standard-Master Formularvorlage ist **SOMU_FORM_MASTER_A4** in Ausgabeverwaltung

## Zusätzliche Felder aus OData Services
z.B. Ansprechpartner auf Formular
- Öffnen App 'Benutzerdefinierte Felder und Logik'
- Klick auf +, Auswahl Geschäftskontext + Beleg
- Eingabe Bezeichner und Typ (z.B. Text)

> [!warning] Achtung bei Kapazität
> Es kann je Cloud Instanz mmer nur eine bestimmte Auswahl an Kontexten erweitert werden

- Klick auf **Formularvorlagen** -> Auswahl der Vorlage für das Dokument
- Klick auf **Verwendung aktivieren**
- Klick auf **Freigeben**
- Öffnen App **Benutzerdefinierte Logik** -> Anlegen zur Erweiterung der Standardlogik von SAP
- Hier muss Implementierungspaket ausgewählt werden, welches die Daten liefert
- Dazu Auswahl Geschäftskontext anhand der Beschreibung
- Falls es das Implementierungspaket bereits gibt muss es angepasst werden und nicht neu erstellt
- In diesem Implementierungspaket wird nun die Logik geschrieben, um einen Wert aus den CDS Views zu lesen, der dem Wert entspricht, der später angedruckt werden soll
## Sonstiges & Tips
- Daten von Formularen kann man sich besorgen über, z.B.
  `Kundenauftrag öffnen -> Ausgabeposition -> Druckwarteschlange`
  `#&&DOWNLOAD_FORM_DATA_XML&&#
- Felder können durch Teilformulare einfach erweitert werden ,z.B. für Tabellen