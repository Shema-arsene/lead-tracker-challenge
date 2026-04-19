import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';
import { LeadStatus } from '../../schemas/lead.schema';

export class CreateLeadDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  company?: string;

  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @IsNumber()
  @IsOptional()
  @Min(0)
  value?: number;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes?: string;
}
