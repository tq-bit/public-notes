---
description: Clean code rules on formatting code and general structuring
public: true
published: true
---

# Code Formatting and Code Style
See [[Clean Code rules for myself]]
See [ESLint Airbnb rules](https://www.npmjs.com/package/eslint-config-airbnb)
See [Use ESLint + Prettier](https://www.npmjs.com/package/prettier-eslint)
> [!info] About code style
> Original code changes beyond recognition. Style and discipline survive

## File Size & Structure
Small files are generally easier to understand than large ones. 
The idea is to keep the **length** of a file **between 200 and 500 lines**

Files are also easier to read if you write them like a newspaper article. Keep it vertical, write you headlines and keep the least important code at the end.

> [!tip] Newspapers & the inverted pyramid
> The inverted pyramid puts the most newsworthy information at the top, and then the remaining information follows in order of importance, with the least important at the bottom.

### Points to Keep in Mind
- Do not use a 3-liner comment for each method or function
- Leave a break between single properties, methods and functions
- Declare variables close to their usage
- Declare important functions first
- Keep functions close to one another if one calls the other
- Also, keep functions close to one another if they're similar
- Function call dependencies should point in the downward direction 
- AND: Leave low level functions for the end of the file

### Example: A Transcriber Service Handler
- To translate from a local file, we must read a file stream and call the Deepgram API
- Then, we receive the highest rating transcript back
- We also handle errors, which are not so much relevant

```typescript
export default class Transcriber {
	filePath: PathLike;
	mimeType: string;
	apiKey: string;
	deepgram: Deepgram;
	
	constructor(filePath: PathLike, mimeType: string, apiKey?: string) {
		this.handleInitErrors(filePath, apiKey);
		this.apiKey = process.env.DEEPGRAM_KEY || apiKey || '';
		this.filePath = filePath;
		this.mimeType = mimeType;
		this.deepgram = new Deepgram(this.apiKey);
	}
	
	public translateFromLocalFile = async () => {
		const streamSource = {
			stream: fs.createReadStream(this.filePath),
			mimetype: this.mimeType,
		};
		
		const response = await this.deepgram.transcription
			.preRecorded(streamSource, { punctuate: true });
			
		const transcript = this.getHighestRatedTranscript(response);
		return transcript;
	};

	private getHighestRatedTranscript = (
		response: PrerecordedTranscriptionResponse
	) => {
	const highestConfidenceResponse = 
		response.results?.channels[0].alternatives
			.sort((a, b) => a.confidence - b.confidence)[0];
			
	return highestConfidenceResponse;
};

	private handleInitErrors = (
		filePath: PathLike, apiKey: string | undefined
	): void => {
	
		if (!apiKey && !process.env.DEEPGRAM_KEY) {
			throw new Error('No api key found. Add in .env file or initialize this class with one');
		}
		
		if (!filePath) {
			throw new Error('Must provide the path to a file to read');
		}
	};
}
```

## Line Width
- Should be between 20 and 60
- Till 100 is readable (acceptable)
- Beyond 120 is careless

## Code Density
- Use white spaces wisely-strongly related code belongs together
- The other way around is true, too-weakly related code should be disjoined

## Indention
- Write indentions even if you don't have to
- Do this also for short `if` and `while` statements

```ts
parseForm((error: unknown, form: Form) => {
	// Don't do this
	if(error) throw error; 

	// Instead, write
	if(error) {
		throw error;
	}
	...
})
```

## Team Rules
- Team rules must be agreed upon before the project starts
- You don't want a different part of the newspaper article to sound differently as well

> [!quote] Remember
> A good software system is composed of a set of documents that read nicely

