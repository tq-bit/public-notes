---
description: Code snippet to parse HTTP query parameters when an iFlow is accessed in SAP Integration Suite
tags:
  - integrationsuite
  - cpi-code
  - cpi-javascript
public: true
published: true
---
Dieses Skript fügt zu einer CSV-Datei drei BOM-Bytes hinzu, die dafür sorgen, dass die CSV von Plattformen wie Microsoft Sharepoint korrekt erkannt werden

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import java.nio.charset.StandardCharsets

def Message processData(Message message) {
    // Adds the three relevant bytes and converts them to UTF8-String
    byte[] bomBytes = [(byte)0xEF, (byte)0xBB, (byte)0xBF]
    String bomString = new String(bomBytes, StandardCharsets.UTF_8)

    // Append the BOM to the payload
    String payloadString = message.getBody(String)
    String bodywithBOM = bomString + payloadString
    message.setBody(bodywithBOM)

    return message
}

```