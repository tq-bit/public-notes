---
description: Add metadata to a consumption view
public: true
published:
---
## Example to add a single section with two input elements
```ts
@Metadata.layer: #CUSTOMER
@UI.headerInfo: {
  typeName: 'Beispiel CDS View',
  typeNamePlural: 'Beispiel CDS Views',
  title: {
    value: 'Beispiel Fiori App View',
    type: #STANDARD
  }
}

annotate entity ZC_SOME_CDSVIEW with
{
  // Facet Definition für die Detailansicht
  @UI.facet: [{
      id: 'BereichEins',
      label: 'BereichEins',
      purpose: #STANDARD,
      type: #FIELDGROUP_REFERENCE,
      targetQualifier: 'GruppeEins',
      position: 10
  }]

  @UI.lineItem: [{
        position: 10,
        label: 'Feld Eins'
    }]
  @UI.fieldGroup: [{
      qualifier: 'GruppeEins',
      label: 'Feld Eins',
      position: 10
  }]
  FeldEins;

  @UI.lineItem: [{
      position: 20,
      label: 'Feld Zwei'
  }]
  @UI.fieldGroup: [{
      qualifier: 'GruppeEins',
      label: 'Feld Zwei',
      position: 20
  }]
  FeldZwei;
}
```