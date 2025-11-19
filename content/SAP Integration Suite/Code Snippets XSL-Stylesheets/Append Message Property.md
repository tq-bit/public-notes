---
description: XSLT-Mapping in Kombination mit einem Groovy Timestamp, der einer Nachricht angefügt werden kann.
public: true
published: true
tags:
  - integrationsuite
  - cpi-code
  - cpi-xsld
---
Groovy code to create a timestamp

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import java.time.ZonedDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter

def Message processData(Message message) {

    String tzProp = (message.getProperty("TimeZoneId") ?: "Europe/Berlin") as String

    ZoneId zone = ZoneId.of(tzProp)
    ZonedDateTime now = ZonedDateTime.now(zone)
    DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    String isoTs = now.format(fmt)

    // In this context, a requestID is always the current
    // timestamp
    message.setProperty("p_requestID", isoTs)

    return message
}
```

Add to the XML by adding this to the schema property

```xml
<xsl:param name="p_requestID" />

<!-- Then parse in the XSL-Mapping, e.g. -->
<replication requestID="{ $p_requestID }"/>
```