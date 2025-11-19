---
description: Vorlage für eine Adaptive Karte, die per Outllook oder Teams versendet werden kann
public: true
published: true
tags:
  - development
  - cpi-code
  - btp
  - microsoft
---

 Verwendbar als Template in der App "https://adaptivecards.microsoft.com/designer", die auch eine GUI bietet.

```json
{
  "type": "message",
  "attachments": [
    {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "type": "AdaptiveCard",
        "version": "1.4",
        "body": [
          {
            "type": "Container",
            "style": "attention",
            "items": [
              {
                "type": "TextBlock",
                "text": "Fehler beim Aufruf eines iFlows registriert",
                "weight": "Bolder",
                "size": "Large",
                "color": "Error",
                "wrap": true
              }
            ]
          },
          {
            "type": "TextBlock",
            "text": "In einem iFlow in der Integration Suite wurde ein Fehler registriert. Dieser kann entweder durch den iFlow selbst oder durch eines der Systeme verursacht werden.",
            "wrap": true
          },
          {
            "type": "FactSet",
            "facts": [
              {
                "title": "Umgebung:",
                "value": "${property.Environment}"
              },{
                "title": "Paket:",
                "value": "${header.X-InboundMessagePackageName}"
              },
              {
                "title": "iFlow Name:",
                "value": "${header.X-InboundMessageFlowName}"
              },
              {
                "title": "Fehlermeldung:",
                "value": "${header.X-InboundEventErrorMessage}"
              },
              {
                "title": "Nachrichten-ID:",
                "value": "${header.X-InboundMessageId}"
              },
                            {
                "title": "Trace-ID:",
                "value": "${header.SAP_MessageProcessingLogID}"
              }
            ]
          }
        ],
        "actions": [
          {
            "type": "Action.OpenUrl",
            "title": "Zum iFlow",
            "url": "https://pyxdzrvp5c6lg5fb.integrationsuite.cfapps.eu10-002.hana.ondemand.com/shell/design/contentpackage/${header.X-InboundMessagePackageName}/integrationflows/${header.X-InboundMessageFlowName}"
          },
          {
            "type": "Action.OpenUrl",
            "title": "Zur Nachricht",
            "url": "https://pyxdzrvp5c6lg5fb.integrationsuite.cfapps.eu10-002.hana.ondemand.com/shell/monitoring/Messages/%7B%22identifier%22%3A%22${header.X-InboundMessageId}%22%7D"
          },
          {
            "type": "Action.OpenUrl",
            "title": "Zum Error Trace",
            "url": "https://pyxdzrvp5c6lg5fb.integrationsuite.cfapps.eu10-002.hana.ondemand.com/shell/monitoring/Messages/%7B%22identifier%22%3A%22${header.SAP_MessageProcessingLogID}%22%7D"
          }
        ]
      }
    }
  ]
}
```