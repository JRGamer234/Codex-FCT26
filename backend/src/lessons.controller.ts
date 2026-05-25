import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';

import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './create-lesson.dto';
import { UpdateLessonStatusDto } from './update-lesson-status.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las lecciones' })
  @ApiResponse({ status: 200, description: 'Lista de lecciones' })
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una lección por ID' })
  @ApiParam({ name: 'id', description: 'ID de la lección' })
  @ApiResponse({ status: 200, description: 'Lección encontrada' })
  @ApiResponse({ status: 404, description: 'Lección no encontrada' })
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva lección' })
  @ApiResponse({ status: 201, description: 'Lección creada' })
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto);
  }

  @Patch(':id/completed')
  @ApiOperation({ summary: 'Actualizar estado de la lección' })
  @ApiParam({ name: 'id', description: 'ID de la lección' })
  @ApiResponse({ status: 200, description: 'Estado actualizado' })
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateLessonStatusDto,
  ) {
    return this.lessonsService.updateLessonStatus(id, dto.completed);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una lección' })
  @ApiParam({ name: 'id', description: 'ID de la lección' })
  @ApiResponse({ status: 200, description: 'Lección eliminada' })
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}