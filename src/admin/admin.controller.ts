import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResourceDecorator } from 'src/resource.decorator';
import { AdminService } from './admin.service';
import { AdminGuard } from './guards/admin.guard';

@ApiTags('admin')
@ApiBearerAuth()
@ResourceDecorator('admin')
@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
}
