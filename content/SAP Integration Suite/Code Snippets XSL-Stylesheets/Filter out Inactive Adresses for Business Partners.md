---
description: XLST Mapping um alte oder ungültige Adressen von Geschäftspartnern zu entfernen
public: true
published: true
tags:
  - integrationsuite
  - cpi-code
  - cpi-xsld
---
## Content Modifier Expression

```
p_CurrentDate = ${date:now:yyyy-MM-dd}
```

## Filter Expression

```xml
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="xml" indent="yes" encoding="UTF-8"/>
  <!-- p_CurrentDate = ${date:now:yyyy-MM-dd} | Set in Content Modifier -->
  <xsl:param name="p_CurrentDate"/>

  <!-- Copy everything by default -->
  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Remove AddressInformation if top-level validity is not active -->
  <xsl:template match="AddressInformation[string($p_CurrentDate) &lt; string(ValidityPeriod/StartDate) or string($p_CurrentDate) &gt; string(ValidityPeriod/EndDate) ]"/>

  <!-- Remove AddressUsage if validity is not active -->
  <xsl:template match="AddressUsage[string($p_CurrentDate) &lt; string(ValidityPeriod/StartDate) or string($p_CurrentDate) &gt; string(ValidityPeriod/EndDate)]"/>

  <!-- Remove Email if validity is not active -->
  <xsl:template match="Email[string($p_CurrentDate) &lt; string(ValidityPeriod/StartDate) or string($p_CurrentDate) &gt; string(ValidityPeriod/EndDate) ]"/>

  <!-- Remove Telephone if validity is not active -->
  <xsl:template match="Telephone[string($p_CurrentDate) &lt; string(ValidityPeriod/StartDate) or string($p_CurrentDate) &gt; string(ValidityPeriod/EndDate)]"/>

  <!-- Remove Role if validity is not active -->
  <xsl:template match="Role[string($p_CurrentDate) &lt; string(ValidityPeriod/StartDate) or string($p_CurrentDate) &gt; string(ValidityPeriod/EndDate)]"/>

  <!-- Remove EmailUsage if usage validity is not active -->
  <xsl:template match="EmailUsage[string($p_CurrentDate) &lt; string(Usage/ValidityPeriod/StartDate) or string($p_CurrentDate) &gt; string(Usage/ValidityPeriod/EndDate)]"/>

  <!-- Remove TelephoneUsage if usage validity is not active -->
  <xsl:template match="TelephoneUsage[string($p_CurrentDate) &lt; string(Usage/ValidityPeriod/StartDate) or string($p_CurrentDate) &gt; string(Usage/ValidityPeriod/EndDate)]"/>

</xsl:stylesheet>
```