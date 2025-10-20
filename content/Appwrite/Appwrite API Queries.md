---
description: Appwrite HTTP API snipets für Authorisierung und dynamische Queries
tags:
  - n8n
  - appwrite
---
## Standard-Header

```json
{
  "X-Appwrite-Project": "<project-id>",
  "X-Appwrite-Key": "<appwrite-key>",
  "content-type": "application/json"
}
```

## Equals

Beispiel: Monatsabgleich
```sh
queries[0]={"method":"equal","attribute":"month","values": ["August"]}
```

## Between

Beispiel: $createdAt zwischen zwei Werten
```sh
queries[0]={"method":"between","attribute":"$createdAt","values":["2025-10-01T22:00:00.000Z", "2025-10-31T23:59:59.999Z"]}
```

## Limit

Beispiel: 500 Werte
```sh
queries[0]={"method":"limit","values":[500]}
```

## Order By (asc and desc)

Beispiel: Importance
```sh
queries[0]={"method":"orderDesc", "attribute":"importance"}
```

## Less Than

Beispiel: $createdAt größer als Stichtag
```sh
?queries[0]=
{"method":"lessThan","attribute":"$createdAt","values":["2025-09-12T16:51:23.619Z"]}
```