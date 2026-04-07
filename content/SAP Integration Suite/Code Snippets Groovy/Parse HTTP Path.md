---
description: Code snippet to parse HTTP path parameters when an iFlow is accessed in SAP Integration Suite
tags:
  - integrationsuite
  - cpi-code
  - cpi-javascript
public: true
published: true
---
Parse eingehende HTTP-Pfad Parameter. Besonders nützlich bei REST-APIs oder dynamischen iFlow Aufrufen von anderen Apps.

**Erwartetes Verhalten**: Alle Pfad-Parameter werden mit einem `p_HTTPPath_Index<index>` - prefix als Exchange Property gesetzt.

> Der Pfad des Senders muss immer eine Wildcard `/*` enthalten, damit HTTP Parameter berücksichtigt werden.

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import java.net.URLDecoder

/**
 * @description   Script to parse inbound HTTP path segments from CamelHttpPath
 *                and assign them to message properties. Does not change the message.
 *                Assumption: CPI HTTP sender has /* wildcard
 * @author        Cpro Industry
 * @version       1.0.0
 * @example       HTTP-Path: "/orders/4711/items/3" --> MessageProperties:
 *                "p_HTTPPath_Index1=orders", "p_HTTPPath_Index2=4711",
 *                "p_HTTPPath_Index3=items", "p_HTTPPath_Index4=3"
 */

Message processData(Message message) {
    // Get raw path from incoming HTTP request header
    def path = message.getHeaders().get('CamelHttpPath') as String  // e.g. /orders/4711/items/3
    if (!path) {
        return message
    }

    // Split path into segments; tolerate leading/trailing slashes and empty entries
    def segments = path.split('/')
                       .findAll { it != null && it.trim().length() > 0 }

    if (segments.isEmpty()) {
        return message
    }

    // Store each segment as property p_HTTPPath_Index1, p_HTTPPath_Index2, ...
    segments.eachWithIndex { segment, index ->
        def value = URLDecoder.decode(segment, 'UTF-8')
        def propName = 'p_HTTPPath_Index' + (index + 1)
        message.setProperty(propName, value)
    }

    return message
}
```