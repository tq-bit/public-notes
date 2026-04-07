---
description: Policy-Vorlage für das Auslesen eines Key-Value-Mapping Sotres
public: true
published: true
tags:
  - development
  - btp
  - api-management
---
Dieses Beispiel gilt für folgendes Szenario:
- Name KVM: `APIKey`
- Auszulesener Key: `APIKey`
- Wert im Kontext, der beschrieben wird: `private.expected.apikey`

> Hinweis: Falls im KVM ein API-Key gesetz wird, sollte dieser folgendes Format haben:
> `sk_7wYdKpH2nQvR3x9La4Cb8Mf0TuZ6Ej1Sg5Vr2Xc`

```xml
<KeyValueMapOperations mapIdentifier="APIKey"
    async="true"
    continueOnError="false"
    enabled="true"
    xmlns="http://www.sap.com/apimgmt">
    <Get assignTo="private.expected.apikey">
        <Key>
            <Parameter>APIKey</Parameter>
        </Key>
    </Get>
    <Scope>environment</Scope>
</KeyValueMapOperations>
```