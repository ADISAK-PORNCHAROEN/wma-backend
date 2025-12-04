import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetDisposalsService } from './asset-disposals.service';
import { CreateAssetDisposalDto } from './dto/create-asset-disposal.dto';
import { UpdateAssetDisposalDto } from './dto/update-asset-disposal.dto';

@Controller('asset-disposals')
export class AssetDisposalsController {
  constructor(private readonly assetDisposalsService: AssetDisposalsService) {}

  @Post()
  create(@Body() createAssetDisposalDto: CreateAssetDisposalDto) {
    return this.assetDisposalsService.create(createAssetDisposalDto);
  }

  @Get()
  findAll() {
    return this.assetDisposalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetDisposalsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDisposalDto: UpdateAssetDisposalDto) {
    return this.assetDisposalsService.update(+id, updateAssetDisposalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetDisposalsService.remove(+id);
  }
}
