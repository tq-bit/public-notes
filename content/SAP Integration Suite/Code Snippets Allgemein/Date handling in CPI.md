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
This is a Filter XPath that removes all entries which were created before the current timestamp

```txt
//posts[xs:date(createdAt) >= xs:date(current-date())]
```

### Substract or add hours / days
The below SEL expression gets the timestamp from 24 hours ago.

```txt
${date:now-24h:yyyy-MM-dd'T'HH:mm:ss}
```