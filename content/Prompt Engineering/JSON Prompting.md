---
description: Empty template for prompting a Large Language Model using JSON
public: true
tags:
  - automation
  - development
  - ai
---
JSON is slightly better for reusable and automated [[Principles of Prompting|prompting]]. This template includes a simple structure to get started with, which can be expanded further depending on the respective use case. The [[LEGACY - Prompt to assess whether input is considered dangerous]] prompt includes a JSON example with additional properties.

## Empty template

```json
{
  "persona": "",
  "task": "",
  "instructions": [{
	  "step": 1,
	  "description": ""
  }],
  "guidelines": [{
      "rule": "",
      "examples": []
  }],
  "list_reasoning_steps": false,
  "reasoning": []
  "output": {
	  "strict": true,
	  "include_comments": false,
	  "include_annotations": false,
	  "format": "application/json", 
	  "schema_keys": {
		  "key1": "string", 
		  "key2": "number"
	  }
  }
}
```
