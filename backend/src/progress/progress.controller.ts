import { Controller, Get, Post, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  getMyProgress(@Request() req: any) {
    return this.progressService.getUserProgress(req.user._id);
  }

  @Get('stats')
  getStats(@Request() req: any) {
    return this.progressService.getUserStats(req.user._id);
  }

  @Get('all')
  getAllProgress(@Request() req: any) {
    if (req.user.rol !== 'profesor') return [];
    return this.progressService.getAllProgress();
  }

  @Post('complete')
  complete(
    @Request() req: any,
    @Body() body: { lessonId: string; lessonTitle: string; lessonCategory: string; score?: number; total?: number },
  ) {
    return this.progressService.completeLesson(
      req.user._id,
      req.user.name ?? '',
      body.lessonId,
      body.lessonTitle,
      body.lessonCategory,
      body.score ?? 0,
      body.total ?? 0,
    );
  }

  @Delete(':lessonId')
  uncomplete(@Request() req: any, @Param('lessonId') lessonId: string) {
    return this.progressService.uncompleteLesson(req.user._id, lessonId);
  }
}
