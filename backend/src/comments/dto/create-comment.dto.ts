import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'Comment text', minLength: 1, maxLength: 500 })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  text: string;
}
