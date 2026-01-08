---
description: Code snippet to add custom header properties which are searchable and show in the monitoring log as separate key-value pairs
tags:
  - integrationsuite
  - cpi-code
  - cpi-javascript
public: true
published: true
---
Dieser Typ von Variable wird ausschließlich über die Message Log API generiert, muss daher über ein Groovy Script angelegt werden.

**Erwartetes Verhalten**: Alle Exchange Properties, die mit dem Prefix `CH_` angelegt sind, werden durch dieses Skript automatisch in Custom Header Properties der Message angefügt.

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    def messageLog = messageLogFactory.getMessageLog(message)
    if (messageLog != null) {
      Map messageProperties = message.getProperties()
      List<String> CHKeys = []
      messageProperties.keySet().each { propertyKey ->
          if (propertyKey != null && propertyKey.toString().startsWith('CH_')) {
              CHKeys.add(propertyKey.toString())
          }
      }
      CHKeys.each { chPropertyKey ->
          def chPropertyValue = messageProperties.get(chPropertyKey)
          // Strip the CH_ prefix when creating the real header name
          def chName = chPropertyKey.substring(3)
          // Set to null by default if no custom val is maintained
          def chValue = chPropertyValue == null ? "" : chPropertyValue.toString()
          messageLog.addCustomHeaderProperty(chName, chValue)
      }
    }

    return message
}

```