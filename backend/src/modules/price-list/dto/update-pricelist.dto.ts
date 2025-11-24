import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceListDto } from './create-pricelist.dto';

export class UpdatePriceListDto extends PartialType(CreatePriceListDto) { }
