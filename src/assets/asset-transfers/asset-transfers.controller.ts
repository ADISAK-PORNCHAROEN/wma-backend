import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetTransfersService } from './asset-transfers.service';
import { CreateAssetTransferDto } from './dto/create-asset-transfer.dto';
import { UpdateAssetTransferDto } from './dto/update-asset-transfer.dto';

@Controller('asset-transfers')
export class AssetTransfersController {
  constructor(private readonly assetTransfersService: AssetTransfersService) {}

  @Post()
  create(@Body() createAssetTransferDto: CreateAssetTransferDto) {
    return this.assetTransfersService.create(createAssetTransferDto);
  }

  @Get()
  findAll() {
    return this.assetTransfersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetTransfersService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAssetTransferDto: UpdateAssetTransferDto) {
  //   return this.assetTransfersService.update(+id, updateAssetTransferDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.assetTransfersService.remove(+id);
  // }
}
