import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  rate(
    @Request() req: any,
    @Body() body: { lessonId: string; lessonTitle: string; stars: number; comment?: string },
  ) {
    return this.ratingsService.rate(
      req.user._id,
      req.user.name,
      body.lessonId,
      body.lessonTitle,
      body.stars,
      body.comment || '',
    );
  }

  @Get()
  getAll() {
    return this.ratingsService.getAll();
  }

  @Get('stats')
  getStats() {
    return this.ratingsService.getStats();
  }
}
