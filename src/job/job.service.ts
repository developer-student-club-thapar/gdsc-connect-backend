import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './schemas/job.schema';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private JobModel: Model<JobDocument>) {}

  create(job: Job) {
    const createdJob = new this.JobModel(job);
    createdJob.date_posted = new Date();

    return createdJob.save();
  }

  findByUser(id: string) {
    const jobs = this.JobModel.find({ userId: id });
    return jobs;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(userId: string, jobId: string) {
    return this.JobModel.deleteOne({ userId: userId, _id: jobId });
  }
}
