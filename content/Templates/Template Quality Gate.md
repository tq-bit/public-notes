---
description: Template für die Erstellung eines Quality Gates
tags:
  - template
  - integrationsuite
public: false
---
Quality Gates müssen einfach in HTML- oder Word Strukturen unterzubringen sein. Dieses Template richtet sich insbesondere an Übergaben von iFlows, die mithilfe von SAP cALM dokumentiert werden. 

## 1. Beschreibung
Die Beschreibung sollte kurz und bündig zusammenfassen, um welche Integrationsprozesse es sich handelt und auf welche Aufgabe sie sich beziehen. 

```markdown
Ich bitte um die Abnahme der folgenden Integrationsprozesse: 

| Name Integrationsartefakt | cALM Aufgabe | Version |
| ------------------------- | ------------ | ------- |
| Name des Artefakts + Link | 3-1234       | 1.0.4   |

- hier können weitere Links zu User Stories und verwandten Ressourcen hinzugefügt werden -
  
Ohne Freigabe des Quality Gates können die oben genannten Integrationsartefakte nicht in der Produktivumgebung freigegeben werden
```

## 2. Checkliste

Notwendige Punkte
1. Abnahme durch Key-User
2. Verantwortlicher Entwickler
3. Version des iFlow
4. Entscheidungstermin Freigabe

Zusätzlich können weitere Punkte, die Teil der Cutovertätigkeiten waren, hier hinzugefügt werden, z.B. 
5. Aktivierung COM-Vereinbarungen
6. Pflege Credentials
7. Versendung von Endpunkten & Credentials an Dienstleister
## 3. Links

1. Dokumentation in der Integration Suite
2. Links zu Tickets, User Stories, externen Ressourcen