---
description: Wichtige Kommandos und Hinweise zur Arbeit mit Adobe Forms
public: true
published: true
tags:
  - sap
  - sap-public-cloud
  - sap-on-prem
  - adobe-forms
---
## Print XML
Download von XML Daten für die Vorschau direkt im Adobe Lifecycle Manager

> [!warning] Hinweis zum Dateiformat
> Download als Datei, einfügen in neue Datei funktioniert nicht korrekt. Falls über `DownloadXML` - sicherstellen, dass XML Datei richtig formatiert ist

- Erster Befehl (z.B. in ME23N) als Print-Queue in Ausgabe
- Zweiter Befehl (z.B. in 'Korrespondenz anlegen') als URL-Parameter vor der Eingabe des Buchungskreises

```
# Printer Queue Auswahl:
#&&DOWNLOAD_FORM_DATA_XML&&#

# Alternativ: In manchen Apps lässt sich dieser Query Parameter bestimmen
?DownloadXML=true
```

Anschließend kann die XML als Datenquelle im Adobe LivecycleDesigner eingestellt werden:
`Datei -> Formulareigenschaften -> Vorschau`