import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetRepairsService } from './asset-repairs.service';
import { CreateAssetRepairDto } from './dto/create-asset-repair.dto';
import { UpdateAssetRepairDto } from './dto/update-asset-repair.dto';

@Controller('asset-repairs')
export class AssetRepairsController {
  constructor(private readonly assetRepairsService: AssetRepairsService) {}

  @Post()
  create(@Body() createAssetRepairDto: CreateAssetRepairDto) {
    return this.assetRepairsService.create(createAssetRepairDto);
  }

  @Get()
  findAll() {
    return this.assetRepairsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetRepairsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetRepairDto: UpdateAssetRepairDto) {
    return this.assetRepairsService.update(id, updateAssetRepairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetRepairsService.remove(id);
  }
}