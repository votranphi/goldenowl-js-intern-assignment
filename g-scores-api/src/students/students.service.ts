import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import {
  StudentResponseDto,
  SubjectDistributionResponseDto,
  Top10GroupAResponseDto,
  ScoreDistributionDto,
  Top10GroupAStudentDto
} from './students.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findStudentBySbd(sbd: string): Promise<StudentResponseDto> {
    const student = await this.studentRepository.findOne({
      where: { sbd }
    });

    if (!student) {
      throw new NotFoundException(`Student with SBD ${sbd} not found`);
    }

    return {
      sbd: student.sbd,
      toan: student.toan,
      ngu_van: student.ngu_van,
      ngoai_ngu: student.ngoai_ngu,
      vat_li: student.vat_li,
      hoa_hoc: student.hoa_hoc,
      sinh_hoc: student.sinh_hoc,
      lich_su: student.lich_su,
      dia_li: student.dia_li,
      gdcd: student.gdcd,
      ma_ngoai_ngu: student.ma_ngoai_ngu,
    };
  }

  async getSubjectDistribution(): Promise<SubjectDistributionResponseDto> {
    const subjects = [
      'toan', 'ngu_van', 'ngoai_ngu', 'vat_li', 'hoa_hoc', 
      'sinh_hoc', 'lich_su', 'dia_li', 'gdcd'
    ];

    const result: Partial<SubjectDistributionResponseDto> = {};

    for (const subject of subjects) {
      const distribution = await this.getScoreDistributionForSubject(subject);
      result[subject] = distribution;
    }

    return result as SubjectDistributionResponseDto;
  }

  private async getScoreDistributionForSubject(subject: string): Promise<ScoreDistributionDto> {
    const queryBuilder = this.studentRepository.createQueryBuilder('student');
    
    const results = await queryBuilder
      .select([
        `COUNT(CASE WHEN student.${subject} >= 8 THEN 1 END) as ">=8"`,
        `COUNT(CASE WHEN student.${subject} >= 6 AND student.${subject} < 8 THEN 1 END) as "6-8"`,
        `COUNT(CASE WHEN student.${subject} >= 4 AND student.${subject} < 6 THEN 1 END) as "4-6"`,
        `COUNT(CASE WHEN student.${subject} < 4 AND student.${subject} IS NOT NULL THEN 1 END) as "<4"`
      ])
      .where(`student.${subject} IS NOT NULL`)
      .getRawOne();

    return {
      '>=8': parseInt(results['>=8']) || 0,
      '6-8': parseInt(results['6-8']) || 0,
      '4-6': parseInt(results['4-6']) || 0,
      '<4': parseInt(results['<4']) || 0,
    };
  }

  async getTop10GroupA(): Promise<Top10GroupAResponseDto> {
    const queryBuilder = this.studentRepository.createQueryBuilder('student');
    
    const students = await queryBuilder
      .select([
        'student.sbd',
        'student.toan',
        'student.vat_li',
        'student.hoa_hoc',
        '(COALESCE(student.toan, 0) + COALESCE(student.vat_li, 0) + COALESCE(student.hoa_hoc, 0)) as total_score'
      ])
      .where('student.toan IS NOT NULL')
      .andWhere('student.vat_li IS NOT NULL')
      .andWhere('student.hoa_hoc IS NOT NULL')
      .orderBy('total_score', 'DESC')
      .limit(10)
      .getRawMany();

    const top10Students: Top10GroupAStudentDto[] = students.map(student => ({
      sbd: student.student_sbd,
      toan: parseFloat(student.student_toan),
      vat_li: parseFloat(student.student_vat_li),
      hoa_hoc: parseFloat(student.student_hoa_hoc),
      total_score: parseFloat(student.total_score),
    }));

    return {
      students: top10Students,
    };
  }
}