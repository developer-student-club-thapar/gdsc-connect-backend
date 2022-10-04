import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UtilityService } from './utility.service';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Utility } from './entities/utility.entity';

@ApiTags('utility')
@Controller('utility')
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @ApiOkResponse({ description: 'Created new utility.', type: Utility })
  @Post()
  create(@Body() createUtilityDto: CreateUtilityDto) {
    return this.utilityService.create(createUtilityDto);
  }

  @ApiOkResponse({
    description: 'Returned all utilities.',
    type: Utility,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.utilityService.findAll();
  }

  @ApiOkResponse({ description: 'Returned utility with ID.', type: Utility })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilityService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Updated utility with ID.', type: Utility })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUtilityDto: UpdateUtilityDto) {
    return this.utilityService.update(+id, updateUtilityDto);
  }

  @ApiOkResponse({ description: 'Deleted utility with ID.', type: Utility })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilityService.remove(+id);
  }
}
