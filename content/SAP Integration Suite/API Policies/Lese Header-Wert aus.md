---
description: Policy-Vorlage für das Auslesen eines HTTP-Headers
public: true
published: true
tags:
  - development
  - btp
  - api-management
---
Dieses Beispiel gilt für folgendes Szenario: 
- Header Key: `x-api-key`
- Wert im Kontext, der beschrieben wird: `clientrequest.apikey`

Siehe auch [[Lese Query-Wert aus]]

```xml
<ExtractVariables async="true" continueOnError="false" enabled="true"
    xmlns="http://www.sap.com/apimgmt">
    <Source>request</Source>
    <Header name="x-api-key">
        <Pattern ignoreCase="true">{apikey}</Pattern>
    </Header>
    <VariablePrefix>clientrequest</VariablePrefix>
    <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
</ExtractVariables>
```