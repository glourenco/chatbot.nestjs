import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from "openai";
import { Message } from 'src/schemas/Message.dto';

@Injectable()
export class OpenaiService {
    openai: OpenAIApi
    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    async processMessage(message: Message): Promise<string> {
        console.log(message.text);
        const completion = await this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message.text }],
        });
        return completion.data.choices[0].message.content;
    }
}
