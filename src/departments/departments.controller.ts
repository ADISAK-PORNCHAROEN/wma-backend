import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DEPARTMENT_OPTIONS } from './departments.constants';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  
  @Get('options')
  @ApiOperation({ summary: 'ดึงข้อมูลหน่วยงาน (Grouped Options สำหรับ Dropdown)' })
  getOptions() {
    return DEPARTMENT_OPTIONS;
  }
}