---
description: A groovy script to retrieve a secret by its name from SAP CPI
public: true
published: true
tags:
  - integrationsuite
  - cpi-code
  - cpi-groovy
---
This script retrieves all secrets from the secret store if there is one or multiple message properties prefixed with `AS_`. e.g. AS_Shopify_Token generates a new property named `p_Shopify_Token` that includes the value from the secret store.

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


