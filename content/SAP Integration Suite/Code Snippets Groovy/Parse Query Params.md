---
description: Code snippet to parse HTTP query parameters when an iFlow is accessed in SAP Integration Suite
tags:
  - integrationsuite
  - cpi-code
  - cpi-javascript
public: true
published: true
---
Parse eingehende URL-Query Parameter. Besonders nützlich bei REST-APIs oder dynamischen iFlow Aufrufen von anderen Apps.

**Erwartetes Verhalten**: Alle Query Parameter werden mit einem `q_` - prefix als Exchange Property gesetzt.

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import java.net.URLDecoder

Message processData(Message message) {
    // Get raw query string from incoming HTTP request header
    def query = message.getHeaders().get('CamelHttpQuery') as String
    if (!query) {
        return message
    }

    // Split pairs; tolerate stray ampersands and empty entries
    query.split('&')
         .findAll { it != null && it.length() > 0 }
         .each { pair ->
             // Split into key and value once
             def parts = pair.split('=', 2)
             if (parts.size() >= 1 && parts[0].trim().length() > 0) {
                 def rawKey = parts[0]
                 def rawVal = parts.size() == 2 ? parts[1] : ''
                 // Decode key- and value pair
                 def key = URLDecoder.decode(rawKey.replace('+','%2B'), 'UTF-8')
                 def value = URLDecoder.decode(rawVal.replace('+','%2B'), 'UTF-8')

                 // Normalize property name: prefix q_ and replace illegal characters with '_'
                 def propName = 'q_' + key.replaceAll('[^A-Za-z0-9_\\-\\.]', '_')

                 // If parameter repeats, append subsequent values comma-separated
                 if (message.getProperties().containsKey(propName)) {
                     def existing = message.getProperty(propName) as String
                     message.setProperty(propName, existing + ',' + value)
                 } else {
                     message.setProperty(propName, value)
                 }
             }
         }

    return message
}

```