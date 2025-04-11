---
description: Rules to follow when writing prompts using Large Language Models
tags:
  - gen-ai
  - prompt-engineering
---
### 1. Write clear and specific instructions
- Often, longer inputs with more details are better
- Use delimiters to clearly indicate distinct parts of the input (e.g. '---', ' "some text" ')
- Using delimiters can also prevent 'Prompt injection', preventing the model to do something else than it was meant to do  

### 2. Ask for structured output
- e.g. ask for JSON structured output
- or ask for Code output
- ask to leave out any comments or descriptions

### 3. Check whether conditions are satisfied
- Ask the model to check whether some premises of the input prompt are satisfied (like an if-else check)
- E.g. 'You will be provided with a text delimited with triple quotes. [...] If the text does not contain a sequence of instructions, then simply write "No steps provided"

### 4. Use few-shot prompting
- Give successful examples of completing tasks
- Then ask the model to perform the action

### 5. Give the model time to think
- Give the model a series of reasoning and think longer for a task

### 6. Specify the steps to complete a task
- E.g., write 'Perform the following actions':
- 1. Summarise
- 2. Translate into french
- 3. List each name in the french summary
- Create a JSON Object that contains the following keys: original_text, french_text, names

### 7. Instruct the model to work out its own solution before rushing to a conclusion
- Ask the model to figure out its own solution and compare it to an incorrect one
- Don't decide if the provided solution is correct before you figured out the solution yourself.

### 8. Optimize to reduce hallucinations
Hallucinations can be reduced by asking the model to provide relevant information, then answer the question. Example:

```text

Your task is to give a clear description of the product I will ask you about next. Please verify whether the product exists or not before giving an answer. If the product does not exist, then simply reply with 'The product you are asking me about does not exist'

```

  

### 9. Use a prompt to refine your prompts
- Ask the model to refine your prompts for you
- An example can be found under [[Prompt to improve prompts]]