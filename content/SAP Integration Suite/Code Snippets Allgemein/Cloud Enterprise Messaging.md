---
description: Code snippet um Cloud Enterprise Messaging im S4-HANA System mit der BTP zu verbinden.
public: true
published: true
tags:
  - cpi-code
  - integrationsuite
  - sap-public-cloud
---
Das folgende JSON kann verwendet werden, um einen Services vom Typ `s4-hana-cloud` -> `messaging` in der SAP BTP anzulegen.

> Hinweis: Es gibt einen einfacheren Weg, direkt den Event Mesh in der Integration Suite anzulegen. CEM sollte nicht mehr separat konfiguriert werden!

> [!important] Voraussetzungen 
> - Verbindung zwischen BTP und S4H über System Landscape im GA herstellen
> - Vor deployment **systemName** anpassen

```json
{
  "communicationArrangement": {
    "attributes": [
      {
        "name": "CHANNEL NAME",
        "value": "SAP_CP_XF_S4HC"
      },
      {
        "name": "DESCRIPTION",
        "value": "Integration with Enterprise Messaging for EM Client: s4ce"
      },
      {
        "name": "TOPIC SPACE",
        "value": "sap/S4HANAOD/s4ce"
      },
      {
        "name": "MQTT_QOS",
        "value": "1"
      },
      {
        "name": "RECONNECT ATTEMPTS",
        "value": "3"
      },
      {
        "name": "WAIT TIME",
        "value": "10"
      }
    ],
    "communicationArrangementName": "SAP_CLOUD_PLATFORM_XF_s4ce"
  },
  "emClientId": "s4ce",
  "ems": {
    "parameters": {
      "emname": "s4ce",
      "namespace": "sap/S4HANAOD/s4ce",
      "resources": {
        "units": "10"
      },
      "rules": {
        "topicRules": {
          "inboundFilter": [
            "${namespace}/#"
          ]
        }
      }
    }
  },
  "systemName": "my123456.s4hana.cloud.sap"
}
```