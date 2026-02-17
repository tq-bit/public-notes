Mit der Folgenden App-Konfiguration kann eine lokal gebaute Seite per Appwrite-Deploy auf den Server hochgeladen werden. Hiermit umgeht man eventuelle Beschränkungen durch den Javascript Build-Stack

```json
    "sites": [
        {
            "$id": "698a3f9f002fab499eda",
            "name": "project-name",
            "enabled": true,
            "logging": true,
            "framework": "nuxt",
            "timeout": 30,
            "installCommand": "true",
            "buildCommand": "true",
            "outputDirectory": ".",
            "specification": "s-1vcpu-512mb",
            "buildRuntime": "node-22",
            "adapter": "static",
            "fallbackFile": "200.html",
            "path": "sites/project-name"
        }
    ],
```

Vorausgesetzt wird die fertig gebaute Seite, z.B. mit Nuxt, innerhalb des `sites` ordners.
Ein einfaches Deployment-Kommando sieht so aus: 

```sh
npm run generate
cp -r .output/public/* sites/project-name/ 
appwrite push sites
```