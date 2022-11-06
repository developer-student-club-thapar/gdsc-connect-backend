import { Controller } from '@nestjs/common';
import { ResourceDecorator } from 'src/resource.decorator';
import { AdminService } from './admin.service';

@ResourceDecorator('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
