import { ApiPropertyOptional } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiPropertyOptional()
  public id: number;
}
