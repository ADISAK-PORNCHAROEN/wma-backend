import { PartialType } from '@nestjs/swagger';
import { CreateAssetRepairDto } from './create-asset-repair.dto';

export class UpdateAssetRepairDto extends PartialType(CreateAssetRepairDto) {}
