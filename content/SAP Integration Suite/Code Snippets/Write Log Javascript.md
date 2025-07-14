---
description: Write a log that includes the current payload - Javascript variant
tags:
  - integrationsuite
  - cpi-code
  - cpi-javascript
---
See also [[Add to Error Log]] for a Groovy implementation

```javascript
importClass(com.sap.gateway.ip.core.customdev.util.Message);

function processData(message) {
	const body = message.getBody(java.lang.String) || 'Empty Payload';
	const context = message.getProperty('Log_Context') || 'Current Payload';
	const messageLog = messageLogFactory.getMessageLog(message);
	if(messageLog =! null) {
		messageLog.addAttachmentAsString(context, body, "text/plain");
	}
	
	return message;
}
```