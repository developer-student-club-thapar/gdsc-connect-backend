import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResourceDecorator } from './resource.decorator';

@Controller()
@ResourceDecorator('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return 'API health is ok';
  }
}
