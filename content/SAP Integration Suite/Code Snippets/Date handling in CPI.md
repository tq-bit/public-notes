---
description: Code and expressions to work with dates in SAP CPI
public: true
published: true
tags:
  - integrationsuite
  - cpi-xpath
---
## Get current date in Simple Expression Language

```txt
${date:now:yyyy-MM-dd} // data type: java.lang.String
```

## Get current date in XPath

```xpath
//posts[xs:date(createdAt) >= xs:date(current-date())]
```