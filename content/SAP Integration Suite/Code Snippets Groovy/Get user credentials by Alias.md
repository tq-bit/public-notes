---
description: A groovy script to retrieve user credentials by their ALIAS-name from SAP CPI
public: true
published: true
tags:
  - integrationsuite
  - cpi-code
  - cpi-groovy
---
Dieses Skript ruft ein einzelnes User-Credential, inklusive Username und Passwort, aus dem Secret Store ab. Dieses wird jeweils unter den Message Properties `p_Username` und `p_Password` als Wert hinterlegt.

```groovy
import com.sap.gateway.ip.core.customdev.util.Message
import com.sap.it.api.ITApiFactory
import com.sap.it.api.securestore.SecureStoreService

/**
 * @description Sets CR_Username & CR_Password based on the
 *              value of message property 'CR_AliasName'.
 *              Multiple reads are not supported for security
 *              reasons
 */

def Message processData(Message message) {
    // Get the SecureStoreService instance
    def secureStoreService = ITApiFactory.getApi(SecureStoreService.class, null)
    def secretAlias = message.getProperty("CR_AliasName")

    // Check if alias name is provided
    if (secretAlias == null) {
        throw new IllegalArgumentException("CR_AliasName property is required")
    }

    // Retrieve the user credential using the alias
    def credential = secureStoreService.getUserCredential(secretAlias)

    // Check if credential exists
    if (credential == null) {
        throw new IllegalStateException("No credential found for alias " + secretAlias)
    }

    // Extract username and password
    String username = credential.getUsername()
    String password = new String(credential.getPassword())

    // Store in message properties for later use
    message.setProperty("p_Username", username)
    message.setProperty("p_Password", password)

    return message
}

```


