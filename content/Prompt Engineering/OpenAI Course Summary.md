---
description: Notes on prompt engineering from a brief OpenAI course
---
Source: https://learn.deeplearning.ai/chatgpt-prompt-eng/lesson/1/introduction

## Type of LLM's this works for
There are two types of LLM: 
- Base LLM
- Instruction Tuned LLM

While Base LLM focus on completing text by predicting the next workds, Instruction Tuned LLMs focus on trying to accompolish a certain task.

The following focuses solely on IT-LLMs.

## Principles of Prompting

### 1. Write clear and specific instructions
- Often, longer inputs with more details are better
- Use delimiters to clearly indicate distinct parts of the input (e.g. '---', ' "some text" ')
	- Using delimiters can also prevent 'Prompt injection', preventing the model to do something else than it was meant to do
### 2. Ask for structured output
- e.g. ask for JSON structured output, such as in [[Email Analysis - German]] or 
### 3. Check whether conditions are satisfied
- Ask the model to check whether some premises of the input prompt are satisfied (like an if-else check)
- E.g. 'You will be provided with a text delimited with triple quotes. [...] If the text does not contain a sequence of instructions, then simply write "No steps provided"'
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
Example: [[Prompt to create high quality images]]

### 7. Instruct the model to work out its own solution before rushing to a conclusion
- Ask the model to figure out its own solution and compare it to an incorrect one
- Don't decide if the provided solution is correct before you figured out the solution yourself.

## Model limitations

### Models hallucinate
Hallucinations can be reduced by asking the model to provide relevant information, then answer the question. Example: 

```text
Your task is to give a clear description of the product I will ask you about next. Please verify whether the product exists or not before giving an answer. If the product does not exist, then simply reply with 'The product you are asking me about does not exist'
```

## Iterative prompt development
There are a few prompt guidelines to follow: 
- Be clear and specific
- Analyze why the result does not give desired output
- Refine the idea and and prompt 
	- add more details like word or sentence limits
	- ask the model to be more precise for specific target groups and emphasizing on their interest (e.g. 'This description is intended for Furniture Retailers')
	- ask the model to give a HTML Table as a result
- Repeat
- Also, use [[Prompt to improve prompts]]