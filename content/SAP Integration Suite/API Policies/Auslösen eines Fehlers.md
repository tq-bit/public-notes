---
description: Policy-Vorlage für Fehlerbehandlung und Rückgabe von JSON
public: true
published: true
tags:
  - development
  - btp
  - api-management
---
Dieses Beispiel gilt für folgendes Szenario: 
- Vorab wurden [[Lese KVM aus]], [[Lese Header-Wert aus]] und [[Vergleiche zwei Parameter]] ausgeführt

> Wichtig: Condition-String muss auf `private.apikey.valid = "false"` gesetzt werden, sonst wird der Fehlerfall immer ausgelöst

Der Payload kann beliebig angepasst werden

```xml
<RaiseFault async="true" continueOnError="false" enabled="true"
    xmlns="http://www.sap.com/apimgmt">
    <FaultResponse>
        <Set>
            <Headers>
                <Header name="Content-Type">application/json</Header>
            </Headers>
            <Payload contentType="application/json">
                {"error":"invalid_api_key","message":"Missing or invalid x-api-key header"}
            </Payload>
            <StatusCode>401</StatusCode>
            <ReasonPhrase>Unauthorized</ReasonPhrase>
        </Set>
    </FaultResponse>
    <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
</RaiseFault>
```
