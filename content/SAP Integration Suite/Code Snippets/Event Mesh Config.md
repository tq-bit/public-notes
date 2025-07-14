---
description: Event-Mesh Konfiguration für einen neuen Event Mesh, der auf einen Cloud Extensibility Service mit dem Namen `s4hc` subscribed.
public: true
published: true
tags:
  - development
  - cpi-code
  - btp
  - cloudfoundry
---
 Perfekt im Zusammenspiel mit [[Cloud Enterprise Messaging]]

```json
{
    "emname": "s4hc",
    "namespace": "cpro/S4HANAOD/s4hc",
    "options": {
        "management": true,
        "messaging": true,
        "messagingrest": true
    },
    "resources": {
        "units": "10"
    },
    "rules": {
        "queueRules": {
            "publishFilter": [
                "${namespace}/*",
                "sap/S4HANAOD/s4ce/*"
            ],
            "subscribeFilter": [
                "${namespace}/*",
                "sap/S4HANAOD/s4ce/*"
            ]
        },
        "topicRules": {
            "publishFilter": [
                "${namespace}/*",
                "sap/S4HANAOD/s4ce/*"
            ],
            "subscribeFilter": [
                "${namespace}/*",
                "sap/S4HANAOD/s4ce/*"
            ]
        }
    },
    "version": "1.1.0"
}
```