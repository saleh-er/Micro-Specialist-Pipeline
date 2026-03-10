import Groq from 'groq-sdk';

export class GroqClient {
    private client: Groq;

    constructor(apiKey: string) {
        this.client = new Groq({ apiKey });
    }

    async *getStreamingCompletion(prompt: string) {
        const stream = await this.client.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.1-8b-instant', // or your custom adapter ID
            stream: true,
        });

        for await (const chunk of stream) {
            yield chunk.choices[0]?.delta?.content || '';
        }
    }
}