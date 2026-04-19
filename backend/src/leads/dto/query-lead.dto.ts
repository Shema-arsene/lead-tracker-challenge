import { IsOptional, IsEnum, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { LeadStatus } from '../../schemas/lead.schema';

export class QueryLeadDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsEnum(['createdAt', 'updatedAt'])
  sort?: string = 'createdAt';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';
}
