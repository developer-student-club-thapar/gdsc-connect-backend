import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ReqWithUser } from 'src/auth/interfaces/auth-interface.interface';
import { Job } from './schemas/job.schema';
import { DeleteJobDto } from './dto/delete-job.dto';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Request() req: ReqWithUser, @Body() createJobDto: CreateJobDto) {
    const job = new Job();
    job.title = createJobDto.title;
    job.company = createJobDto.company;
    job.description = createJobDto.description;
    job.url = createJobDto.url;
    job.groupId = createJobDto.groupId;
    job.tags = createJobDto.tags;
    job.eligibility = createJobDto.eligibility;
    job.deadline = new Date(createJobDto.deadline);
    job.userId = req.user._id;

    return this.jobService.create(job);
  }

  @Get()
  findByUser(@Request() req: ReqWithUser) {
    return this.jobService.findByUser(req.user._id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete()
  remove(@Request() req: ReqWithUser, @Body() body: DeleteJobDto) {
    return this.jobService.remove(req.user._id, body.id);
  }
}
