import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @ApiOkResponse({ description: 'Created new chat.', type: Chat })
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @ApiOkResponse({ description: 'Returned all chats.', type: Chat, isArray: true })
  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @ApiOkResponse({ description: 'Returned chat with ID.', type: Chat })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Updated chat with ID.', type: Chat })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @ApiOkResponse({ description: 'Deleted chat with ID.', type: Chat })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
