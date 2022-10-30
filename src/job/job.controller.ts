import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Job } from './schemas/job.schema';

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiOkResponse({ description: 'Created new job.', type: Job })
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @ApiOkResponse({
    description: 'Returned all jobs.',
    type: Job,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @ApiOkResponse({ description: 'Returned job with ID.', type: Job })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Updated job with ID.', type: Job })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @ApiOkResponse({ description: 'Deleted job with ID.', type: Job })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
