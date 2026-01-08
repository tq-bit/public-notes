---
description: A groovy script to retrieve a secret by its name from SAP CPI
public: true
published: true
tags:
  - integrationsuite
  - cpi-code
  - cpi-groovy
---
Dieses Skript ruft alle Secrets aus dem Secret Store ab, wenn eine oder mehrere Message Properties mit dem Präfix `AS_` vorhanden sind.  
Beispiel: `AS_Shopify_Token` erzeugt eine neue Property mit dem Namen `p_Shopify_Token`, die den Wert aus dem Secret Store enthält.

```groovy
import com.sap.gateway.ip.core.customdev.util.Message;
import com.sap.it.api.ITApiFactory
import com.sap.it.api.securestore.SecureStoreService
import com.sap.it.api.securestore.exception.SecureStoreException

/**
 * @description Sets message properties from secure storage if
                there are message properties maintained starting
                with 'AS_'
 */

def Message processData(Message message) {
    def secureStorageService = ITApiFactory.getService(SecureStoreService.class, null)
    def properties = message.getProperties()
    def secretsToSet = [:]

    // First, collect the relevant secret properties, don't modify message yet
    properties.each { key, value ->
        if (key.startsWith("AS_")) {
            def aliasSecret = value.toString()
            try {
                def secureParameter = secureStorageService.getUserCredential(aliasSecret)
                if (secureParameter != null) {
                    def secretValue = secureParameter.getPassword().toString()
                    def newPropertyName = "p_" + key.substring(3)
                    secretsToSet[newPropertyName] = secretValue
                } else {
                    throw new SecureStoreException("Secure Parameter '" + aliasSecret + "' returned null")
                }
            } catch(Exception e) {
                throw new SecureStoreException("Secure Parameter '" + aliasSecret + "' not available: " + e.getMessage())
            }
        }
    }

    // Now, safely add secrets as message properties
    secretsToSet.each { k, v ->
        message.setProperty(k, v)
    }

    return message
}

```


