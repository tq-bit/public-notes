---
description: Descriptions on how to work with Adobe Forms - On Premise Systems
public: true
published: true
---
## Voraussetzungen
- Adobe Lifecycle Manager (von https://me.sap.com)
- Java Stack auf Server
- SAP Netweaver

## Relevante Transaktionen

| Transaktion | Beschreibung                                                     |
| ----------- | ---------------------------------------------------------------- |
| SE83        | Einstieg in die Formularbearbeitung                              |
| SE63        | i18n Tool für Übersetzungen                                      |
| NACE        | Zentrale Nachrichtensteuerung                                    |
| CQ85/FBMP   | Anzeige von einigen Formularen, die nicht über NACE bedient sind |
| VA02        | Anzeige von Nachrichtenart                                       |
| BA02        | Suche von Nachrichtenart                                         |
| SE80        | Einstieg in die Schnittstellenerstellung                         |
| SO10        | Belegtexte / Standardtexte pflegen                               |
| SE36        | Funktionsbausteine Testen                                        |
| SE38        | Aufruf von Funktionsmodulen                                      |
| SE78        | Hinterlegen von Bildern / Logos                                  |
| SE80        | Speichern von Bildern / Logos                                    |
## Workflow
### Schnittstelle
1. SE80 öffnen
2. Schnittstelle anlegen mit Namensraum **Z_IF_...*
3. Auswahl von Datenquelle & Angabe von Typen
4. Hinweis: Leeres Datum = *INITIAL*, leerer String = *SPACE*

### Formular
1. SE80 / SFP öffnen
2. Neues Formular erstellen bzw. bestehendes kopieren
3. Formular kann dann innerhalb von SAP mit Adobe LCM bearbeitet werden
4. Zur besseren Bearbeitung von Formularen in Adobe Forms folgendes: 
	1. In Usereinstellungen folgende Variablen setzen:
		1. **FPSAVEERORPDF; 1**
		2. **FPTRACELEVEL; 04**
	2. Exportierte XML Datei (XFD.xml) kann als Datenquelle in Formular verwendet werden unter `Bearbeiten -> Formulareigenschaften -> Vorschau`
5. Adobe Forms Texte sind gepflegt unter 
   `Andere Texte -> PDF Basierte Formulare -> PDFB`
## Zum Formulardesign
### Allgemeines
- Seitenumbrüche werden über **Teilformulare** abgebildet
- Adobe LCM teilt auf in Design und Daten (= Schnittstelle)
- Felder in Tabellen werden über Rechtsklick hinzugefügt:
  `Einfügen -> Spalte Links/Rechts -> Daten`
  Dann eingabe der Datenbindung, z.B. $BOOKID über Dropdown neben dem Feld
- Falls z.B. Anschriftsdaten oder Logos nur auf einer Seite angezeigt werden sollen
	1. Erstellung neue Masterseite
	2. Dann `Objekt -> Masterseiten -> Auftreten der Seite begrenzen`
	3. Min: 1, Max: 2
### Formcalc / Javascript
- Skripte sollten nur in Ausnahnefällen benutzt werden
- Beziehen sich auf ein einzelnes Feld, welches ausgewählt werden muss
- In Event `layout:ready`
#### Dynamisch Felder ausblenden - Formcalc
```shell
if(HasValue($)) then
$presence = "visible"
else 
$presence = "hidden"
endif
```
#### Dynamisch Felder ausblenden - Javascript
```js
// this = ausgewähltes Formularelement
if(this.rawValue === "test@sap.com") {
	this.presence = "visible";
} else {
	this.presence = "hidden";
}
```

## Tips und Hilfestellungen
- Übersetzung von Formularen geht schneller für einzelne Felder durch Wiederverwendung des XML Felds **xliff:rid**
- Das funktioniert über `SE63 -> Auswahl und Anzeige von Quelltext`
- Standardformulare werden nicht geändert, sondern kopiert in T-Code **SFP**
	1. Klick auf 'Formular' oder 'Schnittstelle'
	2. Klick auf Button 'Kopieren'
	3. Eingabe neuer Name in Z-Namensraum
	4. Schnittstelle aktivieren
	5. Im Formular: Neue Schnittstelle hinterlegen
	6. Test: VA02 -> Auftrag -> Nachrichtenart
- Kunde immer fragen: 
	1. Wie wird das Formular ausgegeben?
	2. Wie heißt das Formular?