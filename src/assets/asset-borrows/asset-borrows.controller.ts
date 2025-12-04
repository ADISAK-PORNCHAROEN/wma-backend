import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetBorrowsService } from './asset-borrows.service';
import { CreateAssetBorrowDto } from './dto/create-asset-borrow.dto';
import { UpdateAssetBorrowDto } from './dto/update-asset-borrow.dto';
import { ReturnAssetDto } from './dto/return-asset.dto';

@Controller('asset-borrows')
export class AssetBorrowsController {
  constructor(private readonly assetBorrowsService: AssetBorrowsService) {}

  @Post()
  create(@Body() createAssetBorrowDto: CreateAssetBorrowDto) {
    return this.assetBorrowsService.create(createAssetBorrowDto);
  }

  @Get()
  findAll() {
    return this.assetBorrowsService.findAll();
  }

  @Patch(':id/return')
  returnAsset(@Param('id') id: string, @Body() dto: ReturnAssetDto) {
    return this.assetBorrowsService.returnAsset(id, dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetBorrowsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAssetBorrowDto: UpdateAssetBorrowDto) {
  //   return this.assetBorrowsService.update(+id, updateAssetBorrowDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.assetBorrowsService.remove(+id);
  // }
}
