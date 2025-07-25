---
description: Vorgehen des CSRF-Token Handlings im SAP ERP, falls ODataV2 Adapter keine Option darstellt
tags:
  - integrationsuite
  - development
  - sap-public-cloud
public: true
published: true
---
## Symptome
- Standard SAP OData Adapter kann nicht mit JSON POST Payloads umgehen
- Atom XML wird nicht vom Backend akzeptiert, z.B. beim BillOfMaterial v0002 Service

## Konfiguration des Flows
1. iFlow anlegen
2. Unter Runtime Configuration `HTTP Session Reuse` auf `On Exchange` stellen

So werden CSRF-Token und Session-Id korrent gesichert und stehen im POST zur Verfügung
## iFlow Aufbau
### 1. Content Modifier
- Setzen von 2 Header - Parametern:
	- `accept: application/json`
	- `x-csrf-token: fetch`
### 2. HTTP GET Adapter
- Adresse z.B. auf `API_BILL_OF_MATERIAL_SRV;v=0002/MaterialBOM`
- Query: Idealerweise mit `$top=1`
- Credentials pflegen
- Bei Request Headers `x-csrf-token|accept` eintragen
### 3. Content Modifier
- Setzen von 1 Header Parameter
	- `Cookie: set-cookie` (source type: header)
### 4. HTTP POST Adapter
- Adresse z.B. auf `API_BILL_OF_MATERIAL_SRV;v=0002/MaterialBOM`
- Credentials pflegen
- Bei Request Headers `x-csrf-token|Cookie` eintragen
