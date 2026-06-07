import { Controller, Get, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@Request() req: any) {
    const { password, ...user } = req.user;
    return user;
  }

  @Patch('me')
  async updateProfile(@Request() req: any, @Body() body: { name?: string }) {
    return this.usersService.updateProfile(req.user._id, body);
  }

  @Get('alumnos')
  async getAlumnos(@Request() req: any) {
    if (req.user.rol !== 'profesor') return [];
    return this.usersService.getAlumnosWithProgress();
  }

  @Get()
  async findAll(@Request() req: any) {
    if (req.user.rol !== 'profesor') return [];
    return this.usersService.findAll();
  }
}
