---
description: Policy-Vorlage für das Setzen eines Basic-Auth Headers zum Zugriff auf einen iFlow
public: true
published: true
tags:
  - development
  - btp
  - api-management
---
So wird externen Clients Zugriff auf einen iFlow gestattet, ohne dass hierfür Credentials benötigt werden. 'base64' muss mit der encodierten Client-ID und Client-Secret ersetzt werden.

```xml
<AssignMessage async="true" continueOnError="false" enabled="true" xmlns="http://www.sap.com/apimgmt">
    <Set>
        <Headers>
            <Header name="Authorization">Basic 'base64'</Header>
        </Headers>
    </Set>
    <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
    <AssignTo>request</AssignTo>
</AssignMessage>

```

