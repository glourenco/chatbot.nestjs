import { Body, Controller, Get, Post } from '@nestjs/common';
import { Message } from './schemas/Message.dto';
import { OpenaiService } from './services/openai.service';

@Controller()
export class AppController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post("message")
  async sendMessage(@Body() message: Message): Promise<Message> {
    let responseMessage = new Message()
    responseMessage.text = await this.openaiService.processMessage(message);
    return responseMessage;

  }
}
