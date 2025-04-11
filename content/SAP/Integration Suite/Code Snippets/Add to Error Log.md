---
description: Add a message to the error log
public: true
published: true
tags:
  - integrationsuite
  - cpi-code
  - cpi-groovy
---
## Attach error message into message log
In an exception subprocess, add this Groovy script to add payload to message body so it can be read and downloaded
```groovy
import com.sap.gateway.ip.core.customdev.util.Message;
import java.util.HashMap;

def Message processData(Message message) {
	def body = message.getBody(java.lang.String) as String;
	def messageLog = messageLogFactory.getMessageLog(message);
	if(messageLog != null) {
		messageLog.addAttachmentAsString("Error Payload", body, "text/plain")
	}
	return message;
}
```

Even better - you can access the log level and process these messages only when **trace** or **debug** is enabled.

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
	def logLevels = ['DEBUG', 'TRACE']
	def mplPropertyName = 'SAP_MessageProcessingLogConfiguration'
    def mplConfig = message.getProperty(mplPropertyname)
    def logLevel = mplConfig?.getLogLevel() as String

    if (logLevel in logLevels) {
        // Perform actions when log level is DEBUG or TRACE
        def messageLog = messageLogFactory.getMessageLog(message)
        if (messageLog != null) {
            messageLog.addAttachmentAsString('Payload', message.getBody(String), 'text/plain')
        }
    }

    return message
}

```