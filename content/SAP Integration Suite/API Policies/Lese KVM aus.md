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