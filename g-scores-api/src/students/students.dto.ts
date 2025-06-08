import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetStudentParamsDto {
  @ApiProperty({
    description: 'Student registration number',
    example: '01000001'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}$/, { message: 'SBD must be exactly 8 digits' })
  sbd: string;
}

export class StudentResponseDto {
  @ApiProperty({ example: '01000001' })
  sbd: string;

  @ApiProperty({ example: 8.4, nullable: true })
  toan: number | null;

  @ApiProperty({ example: 6.75, nullable: true })
  ngu_van: number | null;

  @ApiProperty({ example: 8.0, nullable: true })
  ngoai_ngu: number | null;

  @ApiProperty({ example: 6.0, nullable: true })
  vat_li: number | null;

  @ApiProperty({ example: 5.25, nullable: true })
  hoa_hoc: number | null;

  @ApiProperty({ example: 5.0, nullable: true })
  sinh_hoc: number | null;

  @ApiProperty({ example: null, nullable: true })
  lich_su: number | null;

  @ApiProperty({ example: null, nullable: true })
  dia_li: number | null;

  @ApiProperty({ example: null, nullable: true })
  gdcd: number | null;

  @ApiProperty({ example: 'N1', nullable: true })
  ma_ngoai_ngu: string | null;
}

export class ScoreDistributionDto {
  @ApiProperty({ example: 120 })
  '>=8': number;

  @ApiProperty({ example: 320 })
  '6-8': number;

  @ApiProperty({ example: 210 })
  '4-6': number;

  @ApiProperty({ example: 50 })
  '<4': number;
}

export class SubjectDistributionResponseDto {
  @ApiProperty({ type: ScoreDistributionDto })
  toan: ScoreDistributionDto;

  @ApiProperty({ type: ScoreDistributionDto })
  ngu_van: ScoreDistributionDto;

  @ApiProperty({ type: ScoreDistributionDto })
  ngoai_ngu: ScoreDistributionDto;

  @ApiProperty({ type: ScoreDistributionDto })
  vat_li: ScoreDistributionDto;

  @ApiProperty({ type: ScoreDistributionDto })
  hoa_hoc: ScoreDistributionDto;

  @ApiProperty({ type: ScoreDistributionDto })
  sinh_hoc: ScoreDistributionDto;

  @ApiProperty({ type: ScoreDistributionDto })
  lich_su: ScoreDistributionDto;

  @ApiProperty({ type: ScoreDistributionDto })
  dia_li: ScoreDistributionDto;

  @ApiProperty({ type: ScoreDistributionDto })
  gdcd: ScoreDistributionDto;
}

export class Top10GroupAStudentDto {
  @ApiProperty({ example: '01000001' })
  sbd: string;

  @ApiProperty({ example: 8.4, nullable: true })
  toan: number | null;

  @ApiProperty({ example: 6.0, nullable: true })
  vat_li: number | null;

  @ApiProperty({ example: 5.25, nullable: true })
  hoa_hoc: number | null;

  @ApiProperty({ example: 19.65 })
  total_score: number;
}

export class Top10GroupAResponseDto {
  @ApiProperty({ type: [Top10GroupAStudentDto] })
  students: Top10GroupAStudentDto[];
}