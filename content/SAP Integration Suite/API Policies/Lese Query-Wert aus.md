---
description: Policy-Vorlage für das Auslesen einer HTTP Query
public: true
published: true
tags:
  - development
  - btp
  - api-management
---
Dieses Beispiel gilt für folgendes Szenario: 
- Query Key: `apikey`
- Wert im Kontext, der beschrieben wird: `clientrequest.apikey`

Siehe auch [[Lese Header-Wert aus]]

```xml
<ExtractVariables async="true" continueOnError="false" enabled="true"
    xmlns="http://www.sap.com/apimgmt">
    <Source>request</Source>
    <QueryParam name="apikey">
        <Pattern ignoreCase="true">{apikey}</Pattern>
    </QueryParam>
    <VariablePrefix>clientrequest</VariablePrefix>
    <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
</ExtractVariables>
```