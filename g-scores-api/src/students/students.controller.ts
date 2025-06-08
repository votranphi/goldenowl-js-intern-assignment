import {
  Controller,
  Get,
  Param,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { StudentsService } from './students.service';
import {
  GetStudentParamsDto,
  StudentResponseDto,
  SubjectDistributionResponseDto,
  Top10GroupAResponseDto,
} from './students.dto';

@ApiTags('Students')
@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('students/:sbd')
  @ApiOperation({ 
    summary: 'Get student by registration number',
    description: 'Returns full score details for the given registration number (SBD)'
  })
  @ApiParam({
    name: 'sbd',
    description: 'Student registration number (8 digits)',
    example: '01000001'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Student found successfully',
    type: StudentResponseDto
  })
  @ApiNotFoundResponse({
    description: 'Student not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Student with SBD 01000001 not found',
        error: 'Not Found'
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid SBD format',
    schema: {
      example: {
        statusCode: 400,
        message: ['SBD must be exactly 8 digits'],
        error: 'Bad Request'
      }
    }
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getStudentBySbd(@Param() params: GetStudentParamsDto): Promise<StudentResponseDto> {
    return await this.studentsService.findStudentBySbd(params.sbd);
  }

  @Get('reports/subject-distribution')
  @ApiOperation({
    summary: 'Get subject score distribution',
    description: 'Returns the number of students per subject in 4 score ranges: >=8, 6-8, 4-6, <4'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Subject distribution retrieved successfully',
    type: SubjectDistributionResponseDto
  })
  async getSubjectDistribution(): Promise<SubjectDistributionResponseDto> {
    return await this.studentsService.getSubjectDistribution();
  }

  @Get('reports/top10-groupA')
  @ApiOperation({
    summary: 'Get top 10 students in Group A',
    description: 'Returns top 10 students with highest sum of Math, Physics, and Chemistry scores'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Top 10 Group A students retrieved successfully',
    type: Top10GroupAResponseDto
  })
  async getTop10GroupA(): Promise<Top10GroupAResponseDto> {
    return await this.studentsService.getTop10GroupA();
  }
}