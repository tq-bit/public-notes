---
description: Policy-Vorlage für ein Javascript, welches zwei Kontextwerte miteinander vergleicht
public: true
published: true
tags:
  - development
  - btp
  - api-management
---
Dieses Beispiel gilt für folgendes Szenario: 
- Auszulesener Wert aus Header: `clientrequest.apikey`
- Auszulesener Wert im Kontext:  `private.expected.apikey`
- Wert, der beschrieben wird: `private.apikey.valid`

```xml
<Javascript async="true" continueOnError="false" enabled="true"
    timeLimit="200"
    xmlns="http://www.sap.com/apimgmt">
    <ResourceURL>jsc://compare-apikey.js</ResourceURL>
</Javascript>
```

Zugehöriges Javascript Snippet: 

```javascript
var provided = context.getVariable('clientrequest.apikey');
var expected = context.getVariable('private.expected.apikey');

if (!provided || !expected || provided !== expected) {
    context.setVariable('private.apikey.valid', 'false');
} else {
    context.setVariable('private.apikey.valid', 'true');
}
```