---
description: A groovy script to retrieve a secret by its name from SAP CPI
public: true
published:
---
This script retrieves a secret named `API_KEY` that has been stored in SAP Integration Suite secure Store `Manage Security->Security Material` and appends it to a header of the exchange message named `X-API-KEY`

```groovy
import com.sap.gateway.ip.core.customdev.util.Message;
import java.util.HashMap;
import com.sap.it.api.ITApi
import com.sap.it.api.ITApiFactory
import com.sap.it.api.securestore.SecureStoreService
import com.sap.it.api.securestore.exception.SecureStoreException

def Message processData(Message message) {
    def apikey_alias = "<API_KEY>"
    def secureStorageService =  ITApiFactory.getService(SecureStoreService.class, null)

    try {
        def secureParameter = secureStorageService.getUserCredential(apikey_alias)
        def apikey = secureParameter.getPassword().toString()
        message.setHeader("<X-API-KEY>", apikey)
    } catch(Exception e){
        throw new SecureStoreException("Secure Parameter " + apikey_alias + " not available")
    }

    return message;
}
```