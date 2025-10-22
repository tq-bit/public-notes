---
description: XLST Mapping um leere XML Nodes zu entfernen
public: true
published: true
tags:
  - integrationsuite
  - cpi-code
  - cpi-xsld
---
## Nodes ohne Text und Attribute entfernen
Dieses Snippet entfernt nur Nodes, die weder Attribute noch Text-Content haben. Dies beinhaltet ebenfalls dessen Child-Nodes

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output omit-xml-declaration="yes" indent="yes"/>

    <!-- Identity transform: copy all nodes by default -->
    <xsl:template match="node()|@*">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>

    <!-- Suppress elements that have no attributes and no child nodes, and also are empty of text -->
    <xsl:template match="*[not(@*) and not(node()) and not(normalize-space())]" priority="2"/>
</xsl:stylesheet>
```

## Leere Nodes immer entfernen
Entfernt Nodes, die keinen Text-Content haben, unabhängig davon, ob sie Attribute haben oder nicht

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output omit-xml-declaration="yes" indent="yes" />

    <!-- Identity transform: copy all nodes by default -->
    <xsl:template match="node()|@*">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()" />
        </xsl:copy>
    </xsl:template>

    <!-- Template to suppress empty elements -->
    <xsl:template match="*[not(@*) and not(node()) or not(normalize-space())]" priority="2"/>
</xsl:stylesheet>
```