## Configuration variables for LLM prompting
For LLM outputs, three important values can be set for nucleus sampling: 
- Top-P value
- Top-K value
- Temperature

> [!important] Extreme values may cancel each other out
> If you set, for example, temperature to 0, Top-K and Top-P become irrelevant as the most probable token to be predicated is always the next one

### Temperature
Temperature controls the degree of randomness in token selection. Higher temperatures lead to more diverse results, while lower ones lead to more deterministic responses. 

Values range from 0 to 1, where 
- 1 stands for basically selecting any random token 
- 0 stands for selecting always the same token

### Top-P
Top-P Sampling selects top tokens whose cumulative probability does not exceed a certain value (the P-Value). 

Values range from 0 to 1, where 
- 1 stands for selecting all known tokens in the LLM's vocabulary 
- 0 stands for not selecting any tokens at all

### Top-K
Top-K sampling selects the top tokens from the models' predicted distribution. Higher Top-K values make the model more creative, while lower ones make it more deterministic. 

Values range start at 1, where 
- 1 always provides only the first-best token
- e.g. 30 selects the 30 best predicted tokens


### Starting points for LLM Prompting

| Case                                  | Temperature | Top-P  | Top-K |
| ------------------------------------- | ----------- | ------ | ----- |
| Creative results (e.g. a blog post)   | 0.9         | 0.99   | 40    |
| Coherent results, medium creativeness | 0.2         | 0.95   | 30    |
| Deterministic results (e.g. coding)   | 0.1         | 0.9    | 20    |
| Always the same result (e.g. math)    | 0           | [*](¹) | *¹    |

[¹] Top-K and Top-P don't matter as Temperature is 0

## Prompting Techniques

### Zero Shot prompting (general prompting)
Give the LLM a description of the task and maybe a starting question. This technique relies on the data the AI model has available for its training and is a good starting point for, say classification tasks. 

> [!example] Zero Shot Prompting config for clasisfication tasks
> Temperature: 0.1
> Top-P: Low / irrelevant
> Top-K: High / irrelevant

Zero Shot prompting works good for deterministic tasks, where the question has multiple set, possible answers, with a low temperature. Top-K and Top-P would be irrelevant in such cases.

**Example for Zero-shot prompting (Perplexity.ai): Email-Type classification**

```
Classify the type of the following email content into one of the following categories: 
- E-Commerce 
- Invoices 
- Spam 
- 
- Only respond with the category. Leave out any type of comments. 

''' 
Antwort zur Anzeige "Terassendachplatten 2 Stück" Du hast eine Antwort zur Anzeige: Terassendachplatten 2 Stück (Anzeigennummer: 3005929953) erhalten. Antwort von <Verkäufer>: Hallo, ja die sind noch da. Wann könnten sie denn kommen? Um auf diese Nachricht zu antworten, gehe bitte in die Konversation mit dem Nutzer. Antworten Schütze dich vor Betrug: Tipps für deine Sicherheit. Zum Schutz unserer Nutzer filtern wir Spam und andere verdächtige Nachrichten. Wir behalten uns vor, bei konkretem Verdacht auf betrügerische Aktivitäten oder Verstößen gegen unsere Nutzungsbedingungen die Übermittlung von Nachrichten zu verzögern oder zu verweigern. Dein Team von Kleinanzeigen Bitte antworte nicht auf diese E-Mail. Wenn du Fragen hast, schaue bitte in unseren Hilfebereich. 
'''
```

### One-Shot and few-shot prompting
Besides the prompt itself, give the AI model examples. With one-shot you provide a single example, while with few-shot you provide several. 

> [!tip] Number of examples
> The number of examples to provide depends on the complexity of the task, as well as the context capability of the model.

For a few-shot prompting, it's recommended to **use at least 3-5 examples**. Examples can be structured text using, say markdown or HTML, as well as JSON, XML or any other data type

**Example for Few-Shot prompting: Extracting keywords from a discussion**

```
Extract keywords from the following chat. 
Here are three examples for the extraction of a single message inside the chat: 

content: 'Yea, I linked my Google and gave it my picture' 
keywords: ['google', 'picture'] 

content: 'Usually, I use image generation for fat cats' 
keywords: ['image generation', 'fat', 'cats'] 

content: 'Sad for the graphics designers doing that for a living though' keywords: ['sad', 'graphic designers'] 

Reply with the full array of all keywords and without any further content Here is the discussion: 

''' ... '''
```

### System prompting
With system prompting, you set the overall context for the language model. It defines the model's fundamental capabilities and overarching purpose. System prompting is great to generate output that meets specific requirements and narrow down tasks the AI is meant to perform. And on the other hand, what tasks not to perform

> System prompting seems to be particular useful for Folders, Groups, Projects or Rooms

### Contextual prompting
By providing relevant background information relevant to the current conversation / task, contextual prompting helps the model to understand what exactly is requested. It provides immediate, task-specific info to guide the response. This type of prompting is highly specific to the current task or input

> Contextual prompting provides a narrow corridor for possible answers

### Role prompting
Assign a specific character or identity to the model and ask it to act like it. This helps the model to generate answers that match the associated knowledge or behavior

> Role prompting determines the style and depth of answers you will receive

## Reasoning functionalities
### Chain of Though prompting
Giving the model time to reason by generating **intermediate reasoning steps**. 
This can be done by explicitly including **list the steps of reasoning** either in the input prompt or ask for it as part of the output.

Example: 

```
assume the following 
- my cousin marries somebody 
- they have a child
- their child marries another cousin's child of 3rd degrees 
 
what would their child be to me? 
please list the steps of reasoning your processed to me
```

### Self-consistency
Invoking a generation more than once and then choosing an appropriate response from the options provided, self-consistency adds a second layer of thought to most LLMs. Take the classification model from above - by calling it a few times, the classifications might differ based on the model, but are likely more consistent when asking the same question multiple times.

### ReAct
Reason and Act is a paradigm to solve complex tasks using NLR combined with external tools. Calling APIs, using search or crawling a website provides the first step towards agentic modeling. In fact, tools like [Composio](https://github.com/ComposioHQ/composio) use this approach as a core paradigm.

## Other types of prompts

### Automatic prompt engineering
Basically have a LLM write prompts for you. An example would be [[Prompt to improve prompts]]

