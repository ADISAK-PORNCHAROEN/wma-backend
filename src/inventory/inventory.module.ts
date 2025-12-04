import { Module } from '@nestjs/common';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [
    MaterialModule,
  ],
})
export class InventoryModule {}