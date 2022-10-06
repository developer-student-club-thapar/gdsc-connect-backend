import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResourceDecorator } from 'src/resource.decorator';
import { AdminService } from './admin.service';

@ApiTags('admin')
@ApiBearerAuth()
@ResourceDecorator('admin')  
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }
  
}
