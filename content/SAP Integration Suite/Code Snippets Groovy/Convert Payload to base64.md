---
description: A groovy script to convert the current message payload to base64
public: true
published: true
tags:
  - integrationsuite
  - cpi-code
  - cpi-groovy
---
This script transforms the current body to base64. Commonly used if target systems expect files to be encoded into base64 rather than a stream or binary format.

```groovy
import com.sap.gateway.ip.core.customdev.util.Message

def Message processData(Message message) {
    // Get the message body as a string
    def body = message.getBody(String.class)

    // Encode the string to base64
    def base64Encoded = body.bytes.encodeBase64().toString()

    // Set the encoded string as the new message body
    message.setBody(base64Encoded)

    return message
}
```


