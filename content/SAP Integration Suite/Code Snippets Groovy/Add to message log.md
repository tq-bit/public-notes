---
description: Add a message to the default CPI logs. useful for error handling or debugging
public: true
published: true
tags:
  - integrationsuite
  - cpi-code
  - cpi-groovy
---
## Attach message to log
E.g. in an exception subprocess, add this Groovy script to add payload to message body so it can be read and downloaded

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    def messageBody = message.getBody(String)

    def logContext = message.getProperty("p_LogContext") ?: "Payload"
    def logType = message.getProperty("p_LogType") ?: "text/plain"
    def messageLog = messageLogFactory.getMessageLog(message)

    if (messageLog != null) {
        messageLog.addAttachmentAsString(logContext, messageBody, logType)
    }

    return message
}
```